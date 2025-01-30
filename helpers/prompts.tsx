import { Productivity } from "../components/images/Productivity";
import { QuestionMark } from "../components/images/QuestionMark";
import { Pen } from "../components/images/Pen";
import { Prompt } from "../types/Prompt";

export const prompts: Prompt[] = [
  {
    title: "Ask me anything!",
    description: "Versatile, intelligent AI Assistant",
    gradient: ["#FA8661", "#F7D96D"],
    icon: <Pen />,
    question: "Ask me anything!",
  },
  {
    title: "Homework Helper",
    description: "Help with ANY HW",
    gradient: ["#806CF6", "#70D8F9"],
    icon: <QuestionMark />,
    question: "Homework Helper",
  },
  {
    title: "Productivity Boost",
    description: "Optimize your workflow",
    gradient: ["#85F5B1", "#8CE7FB"],
    icon: <Productivity />,
    question: "Productivity Boost",
  },
];
