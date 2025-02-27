import React, { useEffect } from 'react';
import { Trophy, RefreshCw, Github, ExternalLink } from 'lucide-react';
import confetti from 'canvas-confetti';

interface QuizResultProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

const QuizResult: React.FC<QuizResultProps> = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = '';
  let messageColor = '';
  
  if (percentage >= 90) {
    message = 'Outstanding! You\'re a Git expert!';
    messageColor = 'text-green-600';
  } else if (percentage >= 70) {
    message = 'Great job! You know Git very well!';
    messageColor = 'text-green-600';
  } else if (percentage >= 50) {
    message = 'Good effort! You have a solid understanding of Git.';
    messageColor = 'text-blue-600';
  } else {
    message = 'Keep learning! Git takes practice.';
    messageColor = 'text-yellow-600';
  }

  useEffect(() => {
    // Show confetti for perfect score
    if (score === totalQuestions) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      function randomInRange(min: number, max: number) {
        return Math.random() * (max - min) + min;
      }

      const interval: NodeJS.Timeout = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // since particles fall down, start a bit higher than random
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
      }, 250);

      return () => clearInterval(interval);
    }
  }, [score, totalQuestions]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full">
          <div className="bg-blue-600 p-6 text-white text-center">
            <Trophy className="h-16 w-16 mx-auto mb-2" />
            <h2 className="text-2xl font-bold">Quiz Completed!</h2>
          </div>
          
          <div className="p-6">
            <div className="mb-6 text-center">
              <div className="text-5xl font-bold mb-2">
                {score}/{totalQuestions}
              </div>
              <div className="text-xl font-medium mb-1">
                {percentage}%
              </div>
              <p className={`${messageColor} font-medium`}>{message}</p>
            </div>
            
            <div className="space-y-4">
              <button
                onClick={onRestart}
                className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
              >
                <RefreshCw className="h-5 w-5 mr-2" /> Try Again
              </button>
              
              <a
                href="https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes/blob/main/git/git-quiz.md"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md flex items-center justify-center transition-colors"
              >
                <Github className="h-5 w-5 mr-2" /> View All Questions
              </a>
              
              <a
                href="https://github.com/yashrajnayak/git-quiz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium rounded-md flex items-center justify-center transition-colors"
              >
                <ExternalLink className="h-5 w-5 mr-2" /> View Project on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-4 border-t border-gray-200">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-600 text-sm">
          <p className="mb-1">
            Created by{" "}
            <a 
              href="https://github.com/yashrajnayak" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Yashraj Nayak
            </a>
          </p>
          <p>
            Questions sourced from{" "}
            <a 
              href="https://github.com/Ebazhanov/linkedin-skill-assessments-quizzes" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              LinkedIn Skill Assessments Quizzes
            </a>
            {" "}built by{" "}
            <a 
              href="https://github.com/Ebazhanov" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Evgenii Bazhanov
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default QuizResult;