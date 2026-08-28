import type { IwdaDimension } from "../../iwda/questions";

type CareerEnv = { DB: D1Database };
type CareerRow = { canonical_id:string; reference_id:string; canonical_name:string; published_name:string; slug:string; world:string; world_id:number; world_slug:string; cluster:string|null; description:string|null; source:string; provenance:string; catalogue_version:string; catalogue_status:string; production_canonical_status:string; evidence_status:string };
const BLOCKED_REASON="Authoritative production catalogue canonical_careers_v1 is not present. Recommendations remain disabled until the verified 305-record source is migrated.";
const NEXT_ACTION="Your strongest World fits are ready to explore. Personalised career possibilities will be added from the verified career catalogue.";
function json(data:unknown,status=200){return Response.json(data,{status});}
function invalid(reason:string){return json({status:"invalid",code:"CAREER_CATALOGUE_INVALID",reason,careers:[]},422);}
async function tableExists(db:D1Database,name:string){const r=await db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name=? LIMIT 1").bind(name).first<{name:string}>();return Boolean(r?.name);}
async function validateCareerSource(db:D1Database){
  if(!(await tableExists(db,"canonical_careers_v1"))) return {state:"blocked" as const};
  const columns=await db.prepare("PRAGMA table_info(canonical_careers_v1)").all<{name:string}>();
  const names=new Set((columns.results??[]).map(c=>c.name));
  const required=["canonical_id","reference_id","canonical_name","published_name","slug","world","world_id","world_slug","cluster","description","source","provenance","catalogue_version","catalogue_status","production_canonical_status","evidence_status"];
  const missing=required.filter(c=>!names.has(c));
  if(missing.length)return {state:"invalid" as const,reason:`canonical_careers_v1 is missing required columns: ${missing.join(", ")}`};
  const count=await db.prepare("SELECT COUNT(*) AS count FROM canonical_careers_v1").first<{count:number}>();
  if(Number(count?.count)!==305)return {state:"invalid" as const,reason:`canonical_careers_v1 must contain exactly 305 records; found ${Number(count?.count)||0}.`};
  const duplicateIds=await db.prepare("SELECT canonical_id FROM canonical_careers_v1 GROUP BY canonical_id HAVING COUNT(*)>1 LIMIT 1").first<{canonical_id:string}>();
  if(duplicateIds?.canonical_id)return {state:"invalid" as const,reason:"Duplicate canonical_id values detected."};
  const duplicateRefs=await db.prepare("SELECT reference_id FROM canonical_careers_v1 GROUP BY reference_id HAVING COUNT(*)>1 LIMIT 1").first<{reference_id:string}>();
  if(duplicateRefs?.reference_id)return {state:"invalid" as const,reason:"Duplicate reference_id values detected."};
  const worlds=await db.prepare("SELECT world_id,COUNT(*) AS count FROM canonical_careers_v1 GROUP BY world_id ORDER BY world_id").all<{world_id:number;count:number}>();
  const counts=new Map((worlds.results??[]).map(r=>[Number(r.world_id),Number(r.count)]));
  if(counts.get(1)!==25)return {state:"invalid" as const,reason:`World 01 must contain 25 records; found ${counts.get(1)||0}.`};
  for(let i=2;i<=15;i++)if(counts.get(i)!==20)return {state:"invalid" as const,reason:`World ${String(i).padStart(2,"0")} must contain 20 records; found ${counts.get(i)||0}.`};
  const duplicateExperience=await db.prepare("SELECT COUNT(*) AS count FROM canonical_careers_v1 WHERE canonical_name='Experience Designer'").first<{count:number}>();
  if(Number(duplicateExperience?.count)!==2)return {state:"invalid" as const,reason:"Experience Designer must occur exactly twice as two distinct canonical records."};
  const nonVerified=await db.prepare("SELECT COUNT(*) AS count FROM canonical_careers_v1 WHERE production_canonical_status!='VERIFIED'").first<{count:number}>();
  if(Number(nonVerified?.count)!==0)return {state:"invalid" as const,reason:`canonical_careers_v1 contains ${Number(nonVerified?.count)||0} non-VERIFIED records.`};
  return {state:"verified" as const};
}
function dimensionWorldWeights(d:IwdaDimension):number[]{return ({OBS:[2,5,9,10,14],QUE:[1,2,6,7,10],IMA:[1,3,8,12,14],CRE:[1,3,8,12,15],TST:[1,2,3,5,14],IMP:[3,5,6,8,15]} as Record<IwdaDimension,number[]>)[d]??[];}
function worldScores(resultData:unknown){const data=(resultData&&typeof resultData==="object"?resultData:{}) as Record<string,unknown>;const dimensions=Array.isArray(data.dimensions)?data.dimensions:[];const scores=new Map<number,number>();for(const item of dimensions){if(!item||typeof item!=="object")continue;const row=item as Record<string,unknown>;const code=typeof row.code==="string"?row.code as IwdaDimension:null;const score=Number(row.score);if(!code||!Number.isFinite(score))continue;for(const worldId of dimensionWorldWeights(code))scores.set(worldId,(scores.get(worldId)??0)+score);}return [...scores.entries()].map(([world_id,score])=>({world_id,score})).sort((a,b)=>b.score-a.score).slice(0,5);}
export async function handleCareerRecommendations(request:Request,env:CareerEnv):Promise<Response|null>{
  const url=new URL(request.url);if(url.pathname!=="/api/careers/recommend"||request.method!=="GET")return null;
  const attemptId=url.searchParams.get("iwda_attempt_id")?.trim()||"";const limit=Math.min(3,Math.max(1,Number(url.searchParams.get("limit")||3)));if(!attemptId)return json({error:"iwda_attempt_id is required."},400);
  try{
    const source=await validateCareerSource(env.DB);
    if(source.state==="blocked")return json({status:"blocked",code:"CAREER_CATALOGUE_NOT_VERIFIED",dependency_reason:BLOCKED_REASON,library_reference_cover:300,library_reference_body_enumerated:305,current_production_requirement:305,verified_authoritative_production_source:"NOT FOUND",unresolved_difference:5,missing_five:"NOT INVENTED",careers:[],worlds_available:15,next_action:NEXT_ACTION,http_status:200});
    if(source.state==="invalid")return invalid(source.reason);
    const result=await env.DB.prepare("SELECT result_data FROM iwda_results WHERE attempt_id=? LIMIT 1").bind(attemptId).first<{result_data:string|null}>();
    if(!result)return json({error:"IWDA result not found."},404);
    let parsed:unknown;try{parsed=result.result_data?JSON.parse(result.result_data):null;}catch{return invalid("IWDA result_data is malformed.");}
    const worlds=worldScores(parsed);if(!worlds.length)return invalid("IWDA result does not contain usable Innovation DNA dimensions.");
    const ids=worlds.map(w=>w.world_id);const placeholders=ids.map(()=>"?").join(",");
    const rows=await env.DB.prepare(`SELECT canonical_id,reference_id,canonical_name,published_name,slug,world,world_id,world_slug,cluster,description,source,provenance,catalogue_version,catalogue_status,production_canonical_status,evidence_status FROM canonical_careers_v1 WHERE world_id IN (${placeholders}) ORDER BY CASE world_id ${ids.map((_,i)=>`WHEN ? THEN ${i}`).join(" ")} END, canonical_id LIMIT ?`).bind(...ids,...ids,limit).all<CareerRow>();
    const careers=(rows.results??[]).slice(0,limit).map(c=>({...c,trace:{iwda_attempt_id:attemptId,innovation_dna_dimensions:Array.isArray((parsed as any)?.dimensions)?(parsed as any).dimensions:[],world_id:c.world_id,world_score:worlds.find(w=>w.world_id===c.world_id)?.score??null,canonical_id:c.canonical_id,reference_id:c.reference_id}}));
    if(careers.length!==limit)return invalid("Verified canonical catalogue does not contain enough World-linked records for the requested recommendation count.");
    return json({status:"verified",code:"CAREER_RECOMMENDATIONS_VERIFIED",catalogue:{name:"canonical_careers_v1",record_count:305,status:"VERIFIED"},careers,worlds});
  }catch(error){console.error("Career recommendation request failed",error);return json({error:"Unable to evaluate career recommendations."},500);}
}
