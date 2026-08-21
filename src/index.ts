import {
  calculateIWDAResult,
  type IWDAScoredAnswer,
} from "./iwda/scoring";
import { IWDA_QUESTIONS } from "./iwda/questions";
import {
  createVerificationToken,
  hashToken,
  isValidEmail,
  normalizeEmail,
  verificationEmailHtml,
  verificationEmailText,
  verificationExpiry,
  verificationUrl,
  MAX_ATTEMPTS,
  type EmailSender,
} from "./identity";

type JsonBody = Record<string, unknown>;
type IWDAResultRow = { id:string; attempt_id:string; user_id:string|null; innovation_readiness_index:number; traits:string|null; result_data:string|null; created_at:string };
type ParticipantRow = { id:string; participant_type:"adult"|"minor"; full_name:string; email:string; phone:string; status:string; email_verified_at:string|null; phone_verified_at:string|null; guardian_authorized_at:string|null };
type EnvWithEmail = Env & { EMAIL?: EmailSender };

async function readJsonBody(request: Request): Promise<JsonBody> {
  try { const body: unknown = await request.json(); if (!body || typeof body !== "object" || Array.isArray(body)) throw new Error(); return body as JsonBody; }
  catch { throw new Error("Invalid JSON request body"); }
}
function jsonError(error:string,status:number,extra:Record<string,unknown>={}) { return Response.json({error,...extra},{status}); }
function publicResult(result:IWDAResultRow) {
  let resultData:unknown=null; if(typeof result.result_data==="string"){try{resultData=JSON.parse(result.result_data)}catch{}}
  return {id:result.id,attempt_id:result.attempt_id,user_id:result.user_id,innovation_readiness_index:result.innovation_readiness_index,traits:result.traits?JSON.parse(result.traits):[],result_data:resultData,created_at:result.created_at};
}
function publicParticipant(p:ParticipantRow){return{id:p.id,participant_type:p.participant_type,full_name:p.full_name,email:p.email,status:p.status,email_verified:Boolean(p.email_verified_at),guardian_authorized:Boolean(p.guardian_authorized_at)}}

export default {
  async fetch(request, env:EnvWithEmail):Promise<Response>{
    const url=new URL(request.url);
    if(url.pathname==="/api/health"){
      if(request.method!=="GET")return jsonError("Method not allowed",405);
      try{const result=await env.DB.prepare("SELECT 1 AS ok").first();return Response.json({status:"ok",database:result?.ok===1,service:"innovators-world-commercial"})}catch(error){console.error(error);return jsonError("Database unavailable",503)}
    }
    if(url.pathname==="/api/events"){
      if(request.method!=="POST")return jsonError("Method not allowed",405);
      try{const body=await readJsonBody(request);const eventType=typeof body.event_type==="string"?body.event_type.trim():"";if(!eventType)return jsonError("event_type is required",400);const page=typeof body.page==="string"?body.page.trim():null;const userId=typeof body.user_id==="string"?body.user_id.trim():null;const anonymousSessionId=typeof body.anonymous_session_id==="string"?body.anonymous_session_id.trim():null;const metadata=body.metadata&&typeof body.metadata==="object"?JSON.stringify(body.metadata):null;await env.DB.prepare(`INSERT INTO events (id,user_id,anonymous_session_id,event_type,page,metadata,created_at) VALUES (?,?,?,?,?,?,datetime('now'))`).bind(crypto.randomUUID(),userId,anonymousSessionId,eventType,page,metadata).run();return Response.json({status:"ok",recorded:true})}catch(error){console.error(error);return jsonError("Unable to record event",500)}
    }
    if(url.pathname==="/api/iwda/questions"){
      if(request.method!=="GET")return jsonError("Method not allowed",405);return Response.json({status:"ok",assessment:"IWDA",version:"1.0",question_count:IWDA_QUESTIONS.length,questions:IWDA_QUESTIONS.map(({id,prompt})=>({id,prompt,options:["A","B","C","D"]}))});
    }
    if(url.pathname==="/api/participants"&&request.method==="POST"){
      try{
        const body=await readJsonBody(request);const participantType=body.participant_type==="minor"?"minor":body.participant_type==="adult"?"adult":"";const fullName=typeof body.full_name==="string"?body.full_name.trim():"";const email=normalizeEmail(body.email);const guardianEmail=normalizeEmail(body.parent_guardian_email);const contactEmail=participantType==="minor"?guardianEmail:email;const consentVersion=typeof body.consent_version==="string"?body.consent_version.trim():"";const guardianName=typeof body.parent_guardian_name==="string"?body.parent_guardian_name.trim():"";
        if(!participantType||!fullName||!contactEmail||!consentVersion)return jsonError("participant_type, full_name, email and consent_version are required",400);
        if(!isValidEmail(contactEmail))return jsonError("A valid email address is required",400);
        if(participantType==="minor"&&!guardianName)return jsonError("Parent or guardian name is required for minors",400);
        const existing=await env.DB.prepare("SELECT id,participant_type,full_name,email,phone,status,email_verified_at,phone_verified_at,guardian_authorized_at FROM participants WHERE lower(email)=?").bind(contactEmail).first<ParticipantRow>();
        if(existing&&existing.status!=="deleted")return Response.json({status:"ok",participant:publicParticipant(existing),existing:true});
        const participantId=crypto.randomUUID(),now=new Date().toISOString();
        await env.DB.prepare(`INSERT INTO participants (id,participant_type,full_name,email,phone,date_of_birth,age_band,parent_guardian_name,parent_guardian_email,parent_guardian_phone,consent_version,consent_at,status,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(participantId,participantType,fullName,contactEmail,"",typeof body.date_of_birth==="string"?body.date_of_birth.trim():null,typeof body.age_band==="string"?body.age_band.trim():null,participantType==="minor"?guardianName:null,participantType==="minor"?contactEmail:null,"",consentVersion,now,"pending_verification",now,now).run();
        await env.DB.prepare(`INSERT INTO participant_consents (id,participant_id,consent_type,version,granted_at) VALUES (?,?,?,?,?)`).bind(crypto.randomUUID(),participantId,participantType==="minor"?"guardian_authorization":"assessment",consentVersion,now).run();
        if(!env.EMAIL)return jsonError("Email verification is not configured yet",503);
        const token=createVerificationToken(),challengeId=crypto.randomUUID(),expires=verificationExpiry();await env.DB.prepare(`INSERT INTO identity_verification_challenges (id,participant_id,channel,destination,code_hash,expires_at,created_at) VALUES (?,?,?,?,?,?,?)`).bind(challengeId,participantId,participantType==="minor"?"guardian_email":"email",contactEmail,await hashToken(token),expires,now).run();
        try{await env.EMAIL.send({to:contactEmail,from:"verify@innovatorsworld.org",subject:"Verify your Innovators World email",html:verificationEmailHtml(fullName,verificationUrl(request,token)),text:verificationEmailText(fullName,verificationUrl(request,token))})}catch(error){console.error("Email verification delivery error",error);return jsonError("Unable to send verification email",503)}
        return Response.json({status:"ok",participant_id:participantId,verification_required:true,expires_at:expires},{status:201});
      }catch(error){console.error("Participant registration error",error);return jsonError("Unable to register participant",500)}
    }
    if(url.pathname==="/verify-email"&&request.method==="GET"){
      const token=url.searchParams.get("token")?.trim()||"";if(!token)return new Response("Invalid verification link",{status:400,headers:{"content-type":"text/plain;charset=UTF-8"}});
      try{
        const hash=await hashToken(token);const challenge=await env.DB.prepare(`SELECT id,participant_id,channel,expires_at,verified_at,attempts FROM identity_verification_challenges WHERE code_hash=? ORDER BY created_at DESC LIMIT 1`).bind(hash).first<{id:string;participant_id:string;channel:string;expires_at:string;verified_at:string|null;attempts:number}>();
        if(!challenge)return new Response("This verification link is invalid.",{status:400});if(challenge.verified_at)return new Response("This verification link has already been used.",{status:409});if(new Date(challenge.expires_at).getTime()<Date.now())return new Response("This verification link has expired. Please request a new one.",{status:410});if(challenge.attempts>=MAX_ATTEMPTS)return new Response("Verification is temporarily locked.",{status:429});
        const now=new Date().toISOString();await env.DB.prepare("UPDATE identity_verification_challenges SET verified_at=?,attempts=attempts+1 WHERE id=?").bind(now,challenge.id).run();
        if(challenge.channel==="guardian_email")await env.DB.prepare("UPDATE participants SET email_verified_at=?,guardian_authorized_at=?,status='active',updated_at=? WHERE id=?").bind(now,now,now,challenge.participant_id).run();else await env.DB.prepare("UPDATE participants SET email_verified_at=?,status='active',updated_at=? WHERE id=?").bind(now,now,challenge.participant_id).run();
        return new Response("Email verified. You may now return to Innovators World and start IWDA.",{status:200,headers:{"content-type":"text/plain;charset=UTF-8"}});
      }catch(error){console.error(error);return new Response("Unable to verify this email right now.",{status:500})}
    }
    if(url.pathname==="/api/participants/status"){
      if(request.method!=="GET")return jsonError("Method not allowed",405);try{const id=url.searchParams.get("participant_id")?.trim();if(!id)return jsonError("participant_id is required",400);const p=await env.DB.prepare("SELECT id,participant_type,full_name,email,phone,status,email_verified_at,phone_verified_at,guardian_authorized_at FROM participants WHERE id=?").bind(id).first<ParticipantRow>();if(!p)return jsonError("Participant not found",404);return Response.json({status:"ok",participant:publicParticipant(p)})}catch(error){console.error(error);return jsonError("Unable to retrieve participant status",500)}
    }
    if(url.pathname==="/api/iwda/start"){
      if(request.method!=="POST")return jsonError("Method not allowed",405);try{const body=await readJsonBody(request);const participantId=typeof body.participant_id==="string"?body.participant_id.trim():"";if(!participantId)return jsonError("A verified participant_id is required to start IWDA",401);const p=await env.DB.prepare("SELECT id,status,email_verified_at,participant_type,guardian_authorized_at FROM participants WHERE id=?").bind(participantId).first<{id:string;status:string;email_verified_at:string|null;participant_type:string;guardian_authorized_at:string|null}>();if(!p)return jsonError("Participant not found",404);const verified=Boolean(p.email_verified_at&&(p.participant_type!=="minor"||p.guardian_authorized_at));if(!verified||p.status!=="active")return jsonError("Participant email verification is incomplete",403,{participant_id:participantId});const existing=await env.DB.prepare("SELECT id FROM iwda_attempts WHERE participant_id=? AND status='started' ORDER BY started_at DESC LIMIT 1").bind(participantId).first<{id:string}>();if(existing)return Response.json({status:"ok",attempt_id:existing.id,assessment:"IWDA",resumed:true});const attemptId=crypto.randomUUID();await env.DB.prepare(`INSERT INTO iwda_attempts (id,user_id,anonymous_session_id,participant_id,status,started_at) VALUES (?,?,NULL,?,'started',datetime('now'))`).bind(attemptId,null,participantId).run();return Response.json({status:"ok",attempt_id:attemptId,assessment:"IWDA",resumed:false})}catch(error){console.error(error);return jsonError("Unable to start IWDA",500)}
    }
    if(url.pathname==="/api/iwda/answer"){
      if(request.method!=="POST")return jsonError("Method not allowed",405);try{const body=await readJsonBody(request);const attemptId=typeof body.attempt_id==="string"?body.attempt_id.trim():"";const questionId=typeof body.question_id==="string"?body.question_id.trim():"";const answer=typeof body.answer==="string"?body.answer.trim().toUpperCase():"";if(!attemptId||!questionId||!answer)return jsonError("attempt_id, question_id and answer are required",400);if(!IWDA_QUESTIONS.some(q=>q.id===questionId))return jsonError("Invalid question_id",400);if(!["A","B","C","D"].includes(answer))return jsonError("answer must be A, B, C or D",400);const attempt=await env.DB.prepare("SELECT id,status FROM iwda_attempts WHERE id=?").bind(attemptId).first<{id:string;status:string}>();if(!attempt)return jsonError("IWDA attempt not found",404);if(attempt.status!=="started")return jsonError("IWDA attempt is not active",409);await env.DB.prepare("DELETE FROM iwda_answers WHERE attempt_id=? AND question_id=?").bind(attemptId,questionId).run();const answerId=crypto.randomUUID();await env.DB.prepare(`INSERT INTO iwda_answers (id,attempt_id,question_id,answer,created_at) VALUES (?,?,?,?,datetime('now'))`).bind(answerId,attemptId,questionId,answer).run();return Response.json({status:"ok",recorded:true,answer_id:answerId,attempt_id:attemptId,question_id:questionId})}catch(error){console.error(error);return jsonError("Unable to record answer",500)}
    }
    if(url.pathname==="/api/iwda/complete"){
      if(request.method!=="POST")return jsonError("Method not allowed",405);try{const body=await readJsonBody(request);const attemptId=typeof body.attempt_id==="string"?body.attempt_id.trim():"";if(!attemptId)return jsonError("attempt_id is required",400);const existing=await env.DB.prepare("SELECT id,attempt_id,user_id,innovation_readiness_index,traits,result_data,created_at FROM iwda_results WHERE attempt_id=?").bind(attemptId).first<IWDAResultRow>();if(existing)return Response.json({status:"ok",completed:true,scoring_status:"complete",result:publicResult(existing)});const attempt=await env.DB.prepare("SELECT id,user_id,participant_id,status FROM iwda_attempts WHERE id=?").bind(attemptId).first<{id:string;user_id:string|null;participant_id:string|null;status:string}>();if(!attempt)return jsonError("IWDA attempt not found",404);if(attempt.status!=="started")return jsonError("IWDA attempt is not active",409);if(!attempt.participant_id)return jsonError("IWDA attempt is not linked to a verified participant",403);const answers=await env.DB.prepare("SELECT question_id,answer FROM iwda_answers WHERE attempt_id=? ORDER BY created_at ASC").bind(attemptId).all<{question_id:string;answer:string}>();const rows=answers.results??[];const ids=new Set(rows.map(r=>r.question_id));if(rows.length!==24||ids.size!==24)return jsonError("All 24 IWDA questions must be answered exactly once",400,{answer_count:ids.size,required_count:24});const scoredAnswers:IWDAScoredAnswer[]=rows.map(r=>({question_id:String(r.question_id),answer:String(r.answer)}));const scoredResult=calculateIWDAResult(scoredAnswers);const resultId=crypto.randomUUID();const traitsJson=JSON.stringify(scoredResult.traits);const resultData=JSON.stringify({assessment:"IWDA",version:"1.0",attempt_id:attemptId,participant_id:attempt.participant_id,answer_count:scoredAnswers.length,scoring_status:"complete",innovation_readiness_index:scoredResult.innovation_readiness_index,level:scoredResult.level,traits:scoredResult.traits,primary_strength:scoredResult.primary_strength,secondary_strength:scoredResult.secondary_strength,growth_dimension:scoredResult.growth_dimension,dimension_scores:scoredResult.dimension_scores,answers:rows});await env.DB.prepare(`INSERT INTO iwda_results (id,attempt_id,user_id,innovation_readiness_index,traits,result_data,created_at) VALUES (?,?,?,?,?,?,datetime('now'))`).bind(resultId,attemptId,attempt.user_id??null,scoredResult.innovation_readiness_index,traitsJson,resultData).run();await env.DB.prepare("UPDATE iwda_attempts SET status='completed',completed_at=? WHERE id=? AND status='started'").bind(new Date().toISOString(),attemptId).run();const result=await env.DB.prepare("SELECT id,attempt_id,user_id,innovation_readiness_index,traits,result_data,created_at FROM iwda_results WHERE id=?").bind(resultId).first<IWDAResultRow>();return Response.json({status:"ok",completed:true,scoring_status:"complete",result:result?publicResult(result):null})}catch(error){console.error(error);return jsonError("Unable to complete IWDA attempt",500)}
    }
    if(url.pathname==="/api/iwda/result"){
      if(request.method!=="GET")return jsonError("Method not allowed",405);try{const attemptId=url.searchParams.get("attempt_id")?.trim();if(!attemptId)return jsonError("attempt_id is required",400);const result=await env.DB.prepare("SELECT id,attempt_id,user_id,innovation_readiness_index,traits,result_data,created_at FROM iwda_results WHERE attempt_id=?").bind(attemptId).first<IWDAResultRow>();if(!result)return jsonError("IWDA result not found",404);return Response.json({status:"ok",result:publicResult(result)})}catch(error){console.error(error);return jsonError("Unable to retrieve IWDA result",500)}
    }
    return (env as EnvWithEmail & {ASSETS:{fetch:typeof fetch}}).ASSETS.fetch(request);
  },
} satisfies ExportedHandler<EnvWithEmail>;