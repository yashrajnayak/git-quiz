import React, { useState, useEffect } from 'react';
import { Github, CheckCircle2, XCircle, RefreshCw, Trophy, ExternalLink } from 'lucide-react';
import QuizQuestion from './components/QuizQuestion';
import QuizResult from './components/QuizResult';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchQuizQuestions } from './services/quizService';
import { Question } from './types';

function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedQuestions = await fetchQuizQuestions();
      setQuestions(fetchedQuestions);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (showAnswer) return;
    
    setSelectedAnswer(answer);
    setShowAnswer(true);
    
    const currentQuestion = questions[currentQuestionIndex];
    if (answer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowAnswer(false);
    setSelectedAnswer(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowAnswer(false);
    setSelectedAnswer(null);
    setQuizCompleted(false);
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <LoadingSpinner />
        <p className="mt-4 text-gray-600">Loading Git quiz questions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <XCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-center text-red-600 mb-4">Error</h2>
          <p className="text-gray-700 text-center mb-6">{error}</p>
          <button
            onClick={loadQuestions}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" /> Try Again
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h2 className="text-xl font-bold text-center mb-4">No Questions Available</h2>
          <p className="text-gray-700 text-center mb-6">
            We couldn't find any quiz questions. Please try again later.
          </p>
          <button
            onClick={loadQuestions}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition-colors"
          >
            <RefreshCw className="h-5 w-5 mr-2" /> Reload
          </button>
        </div>
      </div>
    );
  }

  if (quizCompleted) {
    return (
      <QuizResult 
        score={score} 
        totalQuestions={questions.length} 
        onRestart={restartQuiz} 
      />
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Github className="h-6 w-6 text-gray-800 mr-2" />
            <h1 className="text-xl font-bold text-gray-800">Git Quiz</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Question {currentQuestionIndex + 1}/{questions.length}
            </div>
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              Score: {score}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-3xl w-full">
          <QuizQuestion
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            showAnswer={showAnswer}
            onSelectAnswer={handleAnswerSelect}
            onNextQuestion={handleNextQuestion}
            isLastQuestion={currentQuestionIndex === questions.length - 1}
          />
        </div>
      </main>

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
            {" | "}
            <a 
              href="https://github.com/yashrajnayak/git-quiz" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline flex items-center inline-flex"
            >
              <ExternalLink className="h-3 w-3 mr-1" /> View on GitHub
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

export default App;