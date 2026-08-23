import {
  IWDA_DIMENSIONS,
  IWDA_QUESTIONS,
  type IwdaDimension,
} from "./questions";

export type IWDAScoredAnswer = {
  question_id: string;
  answer: string;
};

export type IWDADimensionScore = {
  dimension: IwdaDimension;
  score: number;
  raw_score: number;
  max_score: number;
};

export type IWDAResult = {
  innovation_readiness_index: number;
  level: string;
  dimension_scores: IWDADimensionScore[];
  traits: string[];
  primary_strength: IwdaDimension;
  secondary_strength: IwdaDimension;
  growth_dimension: IwdaDimension;
  result_data: Record<string, unknown>;
};

const DIMENSION_NAMES: Record<IwdaDimension, string> = {
  OBS: "Observe",
  QUE: "Question",
  IMA: "Imagine",
  CRE: "Create",
  TST: "Test",
  IMP: "Improve",
};

const DIMENSION_TRAITS: Record<IwdaDimension, string> = {
  OBS: "Pattern Spotter",
  QUE: "Curious Challenger",
  IMA: "Possibility Thinker",
  CRE: "Idea Maker",
  TST: "Experimenter",
  IMP: "Iterative Builder",
};

function round(value: number): number {
  return Math.round(value * 100) / 100;
}

function getLevel(score: number): string {
  if (score < 40) return "Emerging";
  if (score < 60) return "Developing";
  if (score < 75) return "Capable";
  if (score < 90) return "Strong";
  return "Advanced";
}

function calculateDimensionMaximums(): Record<IwdaDimension, number> {
  const maximums: Record<IwdaDimension, number> = {
    OBS: 0,
    QUE: 0,
    IMA: 0,
    CRE: 0,
    TST: 0,
    IMP: 0,
  };

  for (const question of IWDA_QUESTIONS) {
    const options = Object.values(question.options);
    const primaryMaximum = Math.max(...options.map((option) => option.primary));
    const secondaryMaximum = Math.max(...options.map((option) => option.secondary));
    maximums[question.primary] += primaryMaximum;
    maximums[question.secondary] += secondaryMaximum;
  }

  return maximums;
}

export function calculateIWDAResult(
  answers: IWDAScoredAnswer[]
): IWDAResult {
  const totals: Record<IwdaDimension, number> = {
    OBS: 0,
    QUE: 0,
    IMA: 0,
    CRE: 0,
    TST: 0,
    IMP: 0,
  };

  const validAnswers = new Map<string, string>();

  for (const answer of answers) {
    if (typeof answer.question_id !== "string" || typeof answer.answer !== "string") continue;

    const questionId = answer.question_id.trim();
    const selectedAnswer = answer.answer.trim().toUpperCase();

    if (!questionId || !["A", "B", "C", "D"].includes(selectedAnswer)) continue;
    validAnswers.set(questionId, selectedAnswer);
  }

  for (const question of IWDA_QUESTIONS) {
    const selectedAnswer = validAnswers.get(question.id);
    if (!selectedAnswer) continue;

    const option = question.options[selectedAnswer as "A" | "B" | "C" | "D"];
    if (!option) continue;

    totals[question.primary] += option.primary;
    totals[question.secondary] += option.secondary;
  }

  const dimensionMaximums = calculateDimensionMaximums();

  const dimensionScores: IWDADimensionScore[] = IWDA_DIMENSIONS.map((dimension) => {
    const rawScore = totals[dimension];
    const maxScore = dimensionMaximums[dimension];
    const score = maxScore > 0 ? round((rawScore / maxScore) * 100) : 0;

    return {
      dimension,
      raw_score: rawScore,
      max_score: maxScore,
      score,
    };
  });

  const innovationReadinessIndex = round(
    dimensionScores.reduce((sum, dimension) => sum + dimension.score, 0) /
      dimensionScores.length
  );

  const ranked = [...dimensionScores].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return IWDA_DIMENSIONS.indexOf(a.dimension) - IWDA_DIMENSIONS.indexOf(b.dimension);
  });

  const primaryStrength = ranked[0]?.dimension ?? IWDA_DIMENSIONS[0];
  const secondaryStrength = ranked[1]?.dimension ?? primaryStrength;
  const growthDimension = ranked[ranked.length - 1]?.dimension ?? IWDA_DIMENSIONS[IWDA_DIMENSIONS.length - 1];

  const traits = [
    DIMENSION_TRAITS[primaryStrength],
    DIMENSION_TRAITS[secondaryStrength],
  ];

  const level = getLevel(innovationReadinessIndex);

  const dimensions = dimensionScores.map((item) => ({
    code: item.dimension,
    name: DIMENSION_NAMES[item.dimension],
    score: item.score,
    raw_score: item.raw_score,
    max_score: item.max_score,
  }));

  /*
   * Keep result_data display fields as strings. The public IWDA client is also
   * intentionally tolerant of structured values, but returning strings here
   * preserves a simple API contract and prevents legacy clients from rendering
   * JavaScript objects as "[object Object]".
   */
  return {
    innovation_readiness_index: innovationReadinessIndex,
    level,
    dimension_scores: dimensionScores,
    traits,
    primary_strength: primaryStrength,
    secondary_strength: secondaryStrength,
    growth_dimension: growthDimension,
    result_data: {
      assessment: "IWDA",
      version: "1.0",
      level,
      innovation_readiness_index: innovationReadinessIndex,
      dimensions,
      primary_strength: DIMENSION_NAMES[primaryStrength],
      secondary_strength: DIMENSION_NAMES[secondaryStrength],
      growth_dimension: DIMENSION_NAMES[growthDimension],
      traits,
      answer_count: validAnswers.size,
    },
  };
}
