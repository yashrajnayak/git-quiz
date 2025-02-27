export interface Question {
  question: string;
  codeBlock?: string;
  options: string[];
  correctAnswer: string;
  explanation?: string;
}