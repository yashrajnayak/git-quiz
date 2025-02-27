import React from 'react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | null;
  showAnswer: boolean;
  onSelectAnswer: (answer: string) => void;
  onNextQuestion: () => void;
  isLastQuestion: boolean;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  selectedAnswer,
  showAnswer,
  onSelectAnswer,
  onNextQuestion,
  isLastQuestion,
}) => {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Question header */}
      <div className="bg-gray-50 p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">{question.question}</h2>
        
        {/* Code block if present */}
        {question.codeBlock && (
          <div className="mt-4 bg-gray-800 text-white p-4 rounded-md overflow-x-auto">
            <pre className="text-sm font-mono whitespace-pre-wrap">{question.codeBlock}</pre>
          </div>
        )}
      </div>

      {/* Answer options */}
      <div className="p-6">
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            const isCorrectAnswer = option === question.correctAnswer;
            
            let optionClass = "border border-gray-300 rounded-md p-4 cursor-pointer transition-all";
            
            if (showAnswer) {
              if (isCorrectAnswer) {
                optionClass = "border-2 border-green-500 bg-green-50 rounded-md p-4";
              } else if (isSelected) {
                optionClass = "border-2 border-red-500 bg-red-50 rounded-md p-4";
              } else {
                optionClass = "border border-gray-300 bg-gray-50 rounded-md p-4 opacity-70";
              }
            } else if (isSelected) {
              optionClass = "border-2 border-blue-500 bg-blue-50 rounded-md p-4";
            } else {
              optionClass = "border border-gray-300 rounded-md p-4 hover:border-blue-400 hover:bg-blue-50 cursor-pointer transition-all";
            }
            
            return (
              <div
                key={index}
                className={optionClass}
                onClick={() => !showAnswer && onSelectAnswer(option)}
              >
                <div className="flex items-start">
                  <div className="flex-1">
                    <p className="text-gray-800">{option}</p>
                  </div>
                  {showAnswer && isCorrectAnswer && (
                    <CheckCircle2 className="h-5 w-5 text-green-600 ml-2 flex-shrink-0" />
                  )}
                  {showAnswer && isSelected && !isCorrectAnswer && (
                    <XCircle className="h-5 w-5 text-red-600 ml-2 flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Explanation when answer is shown */}
        {showAnswer && question.explanation && (
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <h3 className="font-medium text-blue-800 mb-1">Explanation:</h3>
            <p className="text-blue-900">{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {showAnswer && (
          <div className="mt-6 flex justify-end">
            <button
              onClick={onNextQuestion}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center transition-colors"
            >
              {isLastQuestion ? 'See Results' : 'Next Question'}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizQuestion;