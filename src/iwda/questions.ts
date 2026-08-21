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

export interface IwdaOption extends IwdaOptionScore {
  text: string;
}

export interface IwdaQuestion {
  id: string;
  primary: IwdaDimension;
  secondary: IwdaDimension;
  prompt: string;
  options: Record<"A" | "B" | "C" | "D", IwdaOption>;
}

export const IWDA_QUESTIONS: IwdaQuestion[] = [
  {
    id: "q001",
    primary: "OBS",
    secondary: "IMA",
    prompt: "You notice that someone is using an everyday object in a way you have never seen before. What are you most likely to do first?",
    options: {
      A: { text: "Ignore it and carry on with what you were doing.", primary: 0, secondary: 0 },
      B: { text: "Watch closely to understand exactly what they are doing.", primary: 4, secondary: 1 },
      C: { text: "Notice the unusual detail and try to work out what changed.", primary: 3, secondary: 1 },
      D: { text: "Start imagining what else the object could be used for.", primary: 2, secondary: 4 },
    },
  },
  {
    id: "q002",
    primary: "QUE",
    secondary: "TST",
    prompt: 'Someone says, "This is the only way we can do it." What is your most natural response?',
    options: {
      A: { text: "Accept it because they probably know best.", primary: 0, secondary: 0 },
      B: { text: "Ask what makes this the only possible way.", primary: 4, secondary: 1 },
      C: { text: "Wonder whether another approach might work better.", primary: 1, secondary: 2 },
      D: { text: "Suggest trying a different approach to see what happens.", primary: 3, secondary: 4 },
    },
  },
  {
    id: "q003",
    primary: "IMA",
    secondary: "QUE",
    prompt: "You are given a problem but nobody tells you what the final solution should look like. What do you tend to do?",
    options: {
      A: { text: "Wait until someone gives you clearer instructions.", primary: 1, secondary: 1 },
      B: { text: "Imagine several different ways the problem could be solved.", primary: 4, secondary: 2 },
      C: { text: "Ask questions first to understand what possibilities are open.", primary: 2, secondary: 4 },
      D: { text: "Choose a practical direction and start working on it.", primary: 2, secondary: 0 },
    },
  },
  {
    id: "q004",
    primary: "CRE",
    secondary: "IMA",
    prompt: "You have an idea that might solve a small everyday problem. What are you most likely to do?",
    options: {
      A: { text: "Keep the idea to yourself until you are certain it will work.", primary: 1, secondary: 3 },
      B: { text: "Think about it for a while before deciding whether to act.", primary: 2, secondary: 2 },
      C: { text: "Make a simple version so you can see what happens.", primary: 4, secondary: 3 },
      D: { text: "Move on because it is too small to be worth making.", primary: 1, secondary: 1 },
    },
  },
  {
    id: "q005",
    primary: "TST",
    secondary: "CRE",
    prompt: "You have two ideas for solving the same problem. You are unsure which is better.",
    options: {
      A: { text: "Choose the one that sounds safest without trying either.", primary: 1, secondary: 2 },
      B: { text: "Keep thinking until you feel confident about the choice.", primary: 1, secondary: 1 },
      C: { text: "Try both in a small way and compare what happens.", primary: 4, secondary: 4 },
      D: { text: "Pick one and make a basic version of it.", primary: 2, secondary: 2 },
    },
  },
  {
    id: "q006",
    primary: "IMP",
    secondary: "TST",
    prompt: "You try something and it does not work. What are you most likely to do next?",
    options: {
      A: { text: "Give up because the idea clearly did not work.", primary: 0, secondary: 0 },
      B: { text: "Leave it for now and perhaps return to it later.", primary: 1, secondary: 1 },
      C: { text: "Study what happened, change something and try again.", primary: 4, secondary: 4 },
      D: { text: "Make a small change and see whether the result improves.", primary: 3, secondary: 2 },
    },
  },
  {
    id: "q007",
    primary: "OBS",
    secondary: "QUE",
    prompt: "You enter a familiar place and notice that something is different.",
    options: {
      A: { text: "Notice it briefly but do not think much about it.", primary: 2, secondary: 0 },
      B: { text: "Look carefully to identify exactly what has changed.", primary: 4, secondary: 2 },
      C: { text: "Examine the change and start wondering why it happened.", primary: 3, secondary: 4 },
      D: { text: "Assume there is probably a simple explanation.", primary: 1, secondary: 0 },
    },
  },
  {
    id: "q008",
    primary: "QUE",
    secondary: "OBS",
    prompt: "You are trying to understand why something keeps going wrong. Which approach is most like you?",
    options: {
      A: { text: "Look closely at what happens each time and compare the details.", primary: 2, secondary: 4 },
      B: { text: "Accept that sometimes things simply go wrong.", primary: 0, secondary: 0 },
      C: { text: "Ask what assumptions or causes might be behind the problem.", primary: 4, secondary: 3 },
      D: { text: "Try a quick fix and move on if it works.", primary: 1, secondary: 1 },
    },
  },
  {
    id: "q009",
    primary: "IMA",
    secondary: "QUE",
    prompt: "You are asked to imagine a better version of something you use regularly.",
    options: {
      A: { text: "Make a few small changes to the existing version.", primary: 2, secondary: 1 },
      B: { text: "Imagine what it could become if there were no obvious limitations.", primary: 4, secondary: 3 },
      C: { text: "Ask what users find difficult before imagining improvements.", primary: 2, secondary: 4 },
      D: { text: "Keep it as it is because it already works.", primary: 1, secondary: 0 },
    },
  },
  {
    id: "q010",
    primary: "CRE",
    secondary: "TST",
    prompt: "You have an idea that exists only in your head.",
    options: {
      A: { text: "Keep thinking about it without making anything yet.", primary: 1, secondary: 0 },
      B: { text: "Turn the idea into a simple first version.", primary: 4, secondary: 3 },
      C: { text: "Sketch a rough concept so you can explore it.", primary: 2, secondary: 1 },
      D: { text: "Wait until you have all the information you need.", primary: 1, secondary: 0 },
    },
  },
  {
    id: "q011",
    primary: "TST",
    secondary: "IMP",
    prompt: "You want to know whether an idea will work.",
    options: {
      A: { text: "Think through the idea carefully and trust your judgement.", primary: 1, secondary: 1 },
      B: { text: "Ask someone experienced what they think will happen.", primary: 2, secondary: 2 },
      C: { text: "Run a small experiment that gives you useful evidence.", primary: 4, secondary: 4 },
      D: { text: "Build a rough version and see whether it seems promising.", primary: 2, secondary: 1 },
    },
  },
  {
    id: "q012",
    primary: "IMP",
    secondary: "QUE",
    prompt: "Someone tries what you created and gives you unexpected feedback.",
    options: {
      A: { text: "Listen to the feedback but leave your creation unchanged.", primary: 0, secondary: 1 },
      B: { text: "Ask questions about what they experienced and improve the next version.", primary: 3, secondary: 4 },
      C: { text: "Dismiss the feedback because they used it differently than expected.", primary: 0, secondary: 0 },
      D: { text: "Use the feedback to make a specific improvement.", primary: 4, secondary: 3 },
    },
  },
  {
    id: "q013",
    primary: "OBS",
    secondary: "TST",
    prompt: "You are watching something happen and the result is not what you expected.",
    options: {
      A: { text: "Move on because unexpected results happen sometimes.", primary: 0, secondary: 0 },
      B: { text: "Look carefully at what actually happened before deciding what it means.", primary: 4, secondary: 3 },
      C: { text: "Make a small adjustment and see whether it changes the result.", primary: 1, secondary: 2 },
      D: { text: "Compare the result with what you expected and investigate the difference.", primary: 3, secondary: 4 },
    },
  },
  {
    id: "q014",
    primary: "QUE",
    secondary: "IMA",
    prompt: 'You hear someone say, "People have always done it this way."',
    options: {
      A: { text: "Accept it because the established way is probably best.", primary: 0, secondary: 0 },
      B: { text: "Ask whether there is a reason it has to remain that way.", primary: 4, secondary: 3 },
      C: { text: "Wonder what a completely different approach might look like.", primary: 3, secondary: 4 },
      D: { text: "Leave the established method alone unless there is a problem.", primary: 1, secondary: 0 },
    },
  },
  {
    id: "q015",
    primary: "IMA",
    secondary: "CRE",
    prompt: "Someone asks you to imagine a solution even though you are told it does not need to be practical yet.",
    options: {
      A: { text: "Imagine a useful solution while keeping one foot in reality.", primary: 2, secondary: 2 },
      B: { text: "Explore bold possibilities without worrying about practicality yet.", primary: 4, secondary: 3 },
      C: { text: "Picture a few options and consider how they might eventually be made.", primary: 2, secondary: 2 },
      D: { text: "Focus on what can realistically be built right now.", primary: 0, secondary: 0 },
    },
  },
  {
    id: "q016",
    primary: "CRE",
    secondary: "IMP",
    prompt: "You want to create something but the complete project feels too large.",
    options: {
      A: { text: "Wait until you have enough time and resources to do everything.", primary: 1, secondary: 0 },
      B: { text: "Break it into a small first version and start building.", primary: 4, secondary: 4 },
      C: { text: "Make a rough plan before deciding where to begin.", primary: 2, secondary: 2 },
      D: { text: "Start with one manageable part of the project.", primary: 2, secondary: 1 },
    },
  },
  {
    id: "q017",
    primary: "TST",
    secondary: "IMP",
    prompt: "You test an idea and get a result you did not expect.",
    options: {
      A: { text: "Treat the unexpected result as a sign the idea failed.", primary: 0, secondary: 0 },
      B: { text: "Record the result and think about what it might mean.", primary: 2, secondary: 2 },
      C: { text: "Use the result as evidence, adjust the idea and test again.", primary: 4, secondary: 4 },
      D: { text: "Change one part of the idea and run another test.", primary: 4, secondary: 3 },
    },
  },
  {
    id: "q018",
    primary: "IMP",
    secondary: "CRE",
    prompt: "Your first version works, but not very well.",
    options: {
      A: { text: "Keep it because at least it works.", primary: 1, secondary: 1 },
      B: { text: "Identify what needs improvement and make another version.", primary: 4, secondary: 4 },
      C: { text: "Change the most obvious part and see whether it helps.", primary: 2, secondary: 3 },
      D: { text: "Wait for more feedback before changing anything.", primary: 2, secondary: 1 },
    },
  },
  {
    id: "q019",
    primary: "OBS",
    secondary: "QUE",
    prompt: 'You are told that something is "normal," but you notice a small detail that does not seem to fit.',
    options: {
      A: { text: "Ignore the detail because you have been told it is normal.", primary: 0, secondary: 0 },
      B: { text: "Look more closely at the detail and see whether it matters.", primary: 4, secondary: 2 },
      C: { text: "Investigate the detail and ask what could explain it.", primary: 3, secondary: 4 },
      D: { text: "Notice it but assume there is probably a straightforward reason.", primary: 2, secondary: 2 },
    },
  },
  {
    id: "q020",
    primary: "QUE",
    secondary: "OBS",
    prompt: "Someone gives you an explanation for why a problem happened, but it seems incomplete.",
    options: {
      A: { text: "Accept the explanation and move on.", primary: 0, secondary: 0 },
      B: { text: "Ask what evidence supports the explanation and what might be missing.", primary: 4, secondary: 3 },
      C: { text: "Question the explanation and compare it with what you observed.", primary: 4, secondary: 4 },
      D: { text: "Wait to see whether the problem happens again.", primary: 1, secondary: 1 },
    },
  },
  {
    id: "q021",
    primary: "IMA",
    secondary: "CRE",
    prompt: "Everyone is solving a problem in the same way.",
    options: {
      A: { text: "Follow the same approach because it is already established.", primary: 0, secondary: 1 },
      B: { text: "Imagine a fundamentally different way of approaching the problem.", primary: 4, secondary: 4 },
      C: { text: "Look for a small variation that might work better.", primary: 3, secondary: 1 },
      D: { text: "Think of an alternative and make a rough version of it.", primary: 2, secondary: 3 },
    },
  },
  {
    id: "q022",
    primary: "CRE",
    secondary: "TST",
    prompt: "You have enough information to make a rough prototype, but not enough to make the final version.",
    options: {
      A: { text: "Wait until you have every detail before building anything.", primary: 0, secondary: 0 },
      B: { text: "Build a rough prototype now so you can learn from using it.", primary: 4, secondary: 4 },
      C: { text: "Sketch the prototype and think through how it might work.", primary: 2, secondary: 2 },
      D: { text: "Keep researching until you feel more confident.", primary: 1, secondary: 1 },
    },
  },
  {
    id: "q023",
    primary: "TST",
    secondary: "IMP",
    prompt: "You change something in a working idea and the result becomes worse.",
    options: {
      A: { text: "Restore the previous version and stop experimenting.", primary: 1, secondary: 1 },
      B: { text: "Compare the versions to understand what caused the change.", primary: 2, secondary: 1 },
      C: { text: "Use what you learned, adjust the change and test again.", primary: 4, secondary: 4 },
      D: { text: "Try a smaller modification and see whether the result improves.", primary: 2, secondary: 2 },
    },
  },
  {
    id: "q024",
    primary: "IMP",
    secondary: "IMA",
    prompt: "You have created something that people like. What are you most likely to think about next?",
    options: {
      A: { text: "Leave it alone because it is already working well.", primary: 0, secondary: 0 },
      B: { text: "Think about how it could be improved or used in new situations.", primary: 4, secondary: 2 },
      C: { text: "Imagine what the next version could become and where it could go.", primary: 3, secondary: 4 },
      D: { text: "Make a small practical improvement based on what you learned.", primary: 2, secondary: 1 },
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
