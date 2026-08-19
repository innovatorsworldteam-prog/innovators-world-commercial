export type IwdaDimension =
  | "OBS"
  | "QUE"
  | "IMA"
  | "CRE"
  | "TST"
  | "IMP";

export interface IwdaOptionScore {
  primary: number;
  secondary: number;
}

export interface IwdaQuestion {
  id: string;
  primary: IwdaDimension;
  secondary: IwdaDimension;
  prompt: string;
  options: Record<"A" | "B" | "C" | "D", IwdaOptionScore>;
}

export const IWDA_QUESTIONS: IwdaQuestion[] = [
  {
    id: "q001",
    primary: "OBS",
    secondary: "IMA",
    prompt:
      "You notice that someone is using an everyday object in a way you have never seen before. What are you most likely to do first?",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 1 },
      C: { primary: 3, secondary: 1 },
      D: { primary: 2, secondary: 4 },
    },
  },
  {
    id: "q002",
    primary: "QUE",
    secondary: "TST",
    prompt:
      'Someone says, "This is the only way we can do it." What is your most natural response?',
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 1 },
      C: { primary: 1, secondary: 2 },
      D: { primary: 3, secondary: 4 },
    },
  },
  {
    id: "q003",
    primary: "IMA",
    secondary: "QUE",
    prompt:
      "You are given a problem but nobody tells you what the final solution should look like. What do you tend to do?",
    options: {
      A: { primary: 1, secondary: 1 },
      B: { primary: 4, secondary: 2 },
      C: { primary: 2, secondary: 4 },
      D: { primary: 2, secondary: 0 },
    },
  },
  {
    id: "q004",
    primary: "CRE",
    secondary: "IMA",
    prompt:
      "You have an idea that might solve a small everyday problem. What are you most likely to do?",
    options: {
      A: { primary: 1, secondary: 3 },
      B: { primary: 2, secondary: 2 },
      C: { primary: 4, secondary: 3 },
      D: { primary: 1, secondary: 1 },
    },
  },
  {
    id: "q005",
    primary: "TST",
    secondary: "CRE",
    prompt:
      "You have two ideas for solving the same problem. You are unsure which is better.",
    options: {
      A: { primary: 1, secondary: 2 },
      B: { primary: 1, secondary: 1 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 2, secondary: 2 },
    },
  },
  {
    id: "q006",
    primary: "IMP",
    secondary: "TST",
    prompt:
      "You try something and it does not work. What are you most likely to do next?",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 1, secondary: 1 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 3, secondary: 2 },
    },
  },
  {
    id: "q007",
    primary: "OBS",
    secondary: "QUE",
    prompt:
      "You enter a familiar place and notice that something is different.",
    options: {
      A: { primary: 2, secondary: 0 },
      B: { primary: 4, secondary: 2 },
      C: { primary: 3, secondary: 4 },
      D: { primary: 1, secondary: 0 },
    },
  },
  {
    id: "q008",
    primary: "QUE",
    secondary: "OBS",
    prompt:
      "You are trying to understand why something keeps going wrong. Which approach is most like you?",
    options: {
      A: { primary: 2, secondary: 4 },
      B: { primary: 0, secondary: 0 },
      C: { primary: 4, secondary: 3 },
      D: { primary: 1, secondary: 1 },
    },
  },
  {
    id: "q009",
    primary: "IMA",
    secondary: "QUE",
    prompt:
      "You are asked to imagine a better version of something you use regularly.",
    options: {
      A: { primary: 2, secondary: 1 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 2, secondary: 4 },
      D: { primary: 1, secondary: 0 },
    },
  },
  {
    id: "q010",
    primary: "CRE",
    secondary: "TST",
    prompt:
      "You have an idea that exists only in your head.",
    options: {
      A: { primary: 1, secondary: 0 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 2, secondary: 1 },
      D: { primary: 1, secondary: 0 },
    },
  },
  {
    id: "q011",
    primary: "TST",
    secondary: "IMP",
    prompt:
      "You want to know whether an idea will work.",
    options: {
      A: { primary: 1, secondary: 1 },
      B: { primary: 2, secondary: 2 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 2, secondary: 1 },
    },
  },
  {
    id: "q012",
    primary: "IMP",
    secondary: "QUE",
    prompt:
      "Someone tries what you created and gives you unexpected feedback.",
    options: {
      A: { primary: 0, secondary: 1 },
      B: { primary: 3, secondary: 4 },
      C: { primary: 0, secondary: 0 },
      D: { primary: 4, secondary: 3 },
    },
  },
  {
    id: "q013",
    primary: "OBS",
    secondary: "TST",
    prompt:
      "You are watching something happen and the result is not what you expected.",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 1, secondary: 2 },
      D: { primary: 3, secondary: 4 },
    },
  },
  {
    id: "q014",
    primary: "QUE",
    secondary: "IMA",
    prompt:
      'You hear someone say, "People have always done it this way."',
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 3, secondary: 4 },
      D: { primary: 1, secondary: 0 },
    },
  },
  {
    id: "q015",
    primary: "IMA",
    secondary: "CRE",
    prompt:
      "Someone asks you to imagine a solution even though you are told it does not need to be practical yet.",
    options: {
      A: { primary: 2, secondary: 2 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 2, secondary: 2 },
      D: { primary: 0, secondary: 0 },
    },
  },
  {
    id: "q016",
    primary: "CRE",
    secondary: "IMP",
    prompt:
      "You want to create something but the complete project feels too large.",
    options: {
      A: { primary: 1, secondary: 0 },
      B: { primary: 4, secondary: 4 },
      C: { primary: 2, secondary: 2 },
      D: { primary: 2, secondary: 1 },
    },
  },
  {
    id: "q017",
    primary: "TST",
    secondary: "IMP",
    prompt:
      "You test an idea and get a result you did not expect.",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 2, secondary: 2 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 4, secondary: 3 },
    },
  },
  {
    id: "q018",
    primary: "IMP",
    secondary: "CRE",
    prompt:
      "Your first version works, but not very well.",
    options: {
      A: { primary: 1, secondary: 1 },
      B: { primary: 4, secondary: 4 },
      C: { primary: 2, secondary: 3 },
      D: { primary: 2, secondary: 1 },
    },
  },
  {
    id: "q019",
    primary: "OBS",
    secondary: "QUE",
    prompt:
      'You are told that something is "normal," but you notice a small detail that does not seem to fit.',
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 2 },
      C: { primary: 3, secondary: 4 },
      D: { primary: 2, secondary: 2 },
    },
  },
  {
    id: "q020",
    primary: "QUE",
    secondary: "OBS",
    prompt:
      "Someone gives you an explanation for why a problem happened, but it seems incomplete.",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 3 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 1, secondary: 1 },
    },
  },
  {
    id: "q021",
    primary: "IMA",
    secondary: "CRE",
    prompt:
      "Everyone is solving a problem in the same way.",
    options: {
      A: { primary: 0, secondary: 1 },
      B: { primary: 4, secondary: 4 },
      C: { primary: 3, secondary: 1 },
      D: { primary: 2, secondary: 3 },
    },
  },
  {
    id: "q022",
    primary: "CRE",
    secondary: "TST",
    prompt:
      "You have enough information to make a rough prototype, but not enough to make the final version.",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 4 },
      C: { primary: 2, secondary: 2 },
      D: { primary: 1, secondary: 1 },
    },
  },
  {
    id: "q023",
    primary: "TST",
    secondary: "IMP",
    prompt:
      "You change something in a working idea and the result becomes worse.",
    options: {
      A: { primary: 1, secondary: 1 },
      B: { primary: 2, secondary: 1 },
      C: { primary: 4, secondary: 4 },
      D: { primary: 2, secondary: 2 },
    },
  },
  {
    id: "q024",
    primary: "IMP",
    secondary: "IMA",
    prompt:
      "You have created something that people like. What are you most likely to think about next?",
    options: {
      A: { primary: 0, secondary: 0 },
      B: { primary: 4, secondary: 2 },
      C: { primary: 3, secondary: 4 },
      D: { primary: 2, secondary: 1 },
    },
  },
];

export const IWDA_DIMENSIONS: IwdaDimension[] = [
  "OBS",
  "QUE",
  "IMA",
  "CRE",
  "TST",
  "IMP",
];