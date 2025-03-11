import React from "react";

const QuizTimer = ({ currentQuestion, totalQuestions, timeLeft }) => {
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-black-600">
          Question {currentQuestion + 1} of {totalQuestions}
        </span>
        <span className="text-black-600">⏳ Time Left: {timeLeft}s</span>
      </div>
      <div className="w-full bg-white-600 h-1 rounded-full">
        <div 
          className="bg-gradient-to-r from-blue-800 to-red-400 h-1 rounded-b-sm transition-all duration-300" 
          style={{ width: `${(timeLeft / 30) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuizTimer;