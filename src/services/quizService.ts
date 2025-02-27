import { Question } from '../types';

// Function to fetch the raw markdown content from GitHub
const fetchGitQuizMarkdown = async (): Promise<string> => {
  const url = 'https://raw.githubusercontent.com/Ebazhanov/linkedin-skill-assessments-quizzes/main/git/git-quiz.md';
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Failed to fetch quiz data');
  }
  
  return response.text();
};

// Function to parse the markdown content into question objects
const parseMarkdownToQuestions = (markdown: string): Question[] => {
  // Split the markdown by question sections (starting with #### Q)
  const questionSections = markdown.split(/(?=#### Q\d+)/);
  
  // Filter out the header section and any empty sections
  const filteredSections = questionSections.filter(section => 
    section.trim().startsWith('#### Q') && section.includes('- [ ]')
  );
  
  // Parse each section into a Question object
  const questions = filteredSections.map(section => {
    // Extract the question text
    const questionMatch = section.match(/#### Q\d+\.\s+(.*?)(?=\n- \[)/s);
    let questionText = questionMatch ? questionMatch[1].trim() : 'Unknown question';
    
    // Check if there's a code block in the question
    let codeBlock = '';
    if (questionText.includes('```')) {
      const parts = questionText.split(/```(?:.*?)\n([\s\S]*?)```/);
      if (parts.length >= 2) {
        questionText = parts[0].trim();
        codeBlock = parts[1].trim();
      }
    }
    
    // Extract the options
    const optionsMatches = Array.from(section.matchAll(/- \[[ x]\]\s+(.*?)(?=\n- \[|$)/gs));
    const options = optionsMatches.map(match => {
      // Clean up the option text by removing "Reference:" and everything after it
      let option = match[1].trim();
      if (option.includes('Reference:')) {
        option = option.split('Reference:')[0].trim();
      }
      return option;
    });
    
    // Find the correct answer (marked with [x])
    const correctAnswerMatch = section.match(/- \[x\]\s+(.*?)(?=\n- \[|$)/s);
    let correctAnswer = correctAnswerMatch ? correctAnswerMatch[1].trim() : '';
    
    // Clean up the correct answer by removing "Reference:" and everything after it
    if (correctAnswer.includes('Reference:')) {
      correctAnswer = correctAnswer.split('Reference:')[0].trim();
    }
    
    // Try to extract explanation if available
    let explanation = '';
    const explanationMatch = section.match(/(?:Explanation:|Note:)\s+(.*?)(?=\n\n|$)/s);
    if (explanationMatch) {
      explanation = explanationMatch[1].trim();
    }
    
    return {
      question: questionText,
      codeBlock: codeBlock || undefined,
      options,
      correctAnswer,
      explanation
    };
  });
  
  return questions;
};

// Function to get a random subset of questions
const getRandomQuestions = (questions: Question[], count: number): Question[] => {
  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Main function to fetch and process quiz questions
export const fetchQuizQuestions = async (count: number = 8): Promise<Question[]> => {
  try {
    const markdown = await fetchGitQuizMarkdown();
    const allQuestions = parseMarkdownToQuestions(markdown);
    
    // Filter out questions with less than 2 options or no correct answer
    const validQuestions = allQuestions.filter(q => 
      q.options.length >= 2 && q.correctAnswer !== ''
    );
    
    if (validQuestions.length === 0) {
      throw new Error('No valid questions found');
    }
    
    // Get random subset of questions
    return getRandomQuestions(validQuestions, Math.min(count, validQuestions.length));
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    throw error;
  }
};