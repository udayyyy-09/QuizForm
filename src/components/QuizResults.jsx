import React from "react";
import { formatDate } from "../utils/helpers"; // You'll need to create this helper

const QuizResults = ({ score, totalQuestions, attempts, onRestart }) => {
  return (
    <div className="text-center">
      <h2 className="text-black-700 text-3xl font-sans mb-2"> Quiz Completed! 🎉</h2>
      <p className="text-lg mb-6 text-black-600">
        Your score: <span className="font-bold text-rose-500">{score}</span> out of{" "}
        <span className="font-bold text-rose-500">{totalQuestions}</span>
      </p>

      {attempts.length > 0 && (
        <div className="bg-white/50 backdrop-blur-sm p-4 rounded-lg text-left">
          <h3 className="font-semibold mb-3 text-grey-600">Previous Attempts</h3>
          <div className="space-y-2">
            {attempts.slice(-3).reverse().map((attempt, index) => (
              <div key={index} className="flex justify-between items-center p-2 border-b border-violet-200">
                <div className="flex-1">
                  <span className="text-violet-600">{formatDate(attempt.date)}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-green-500 font-semibold">
                    {attempt.score} / {attempt.totalQuestions}
                  </span>
                  <span className="font-semibold text-violet-600">
                    {((attempt.score / attempt.totalQuestions) * 100).toFixed(1)}%
                  </span>
                  <span className="text-violet-500">{attempt.timeTaken.toFixed(1)}s avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="cursor-pointer w-full py-3 bg-gradient-to-r from-rose-400 to-violet-400 text-white rounded-lg hover:from-rose-500 hover:to-violet-500 transition mt-4 transform hover:scale-105 shadow-lg shadow-violet-200 font-bold"
      >
        Try Again
      </button>
    </div>
  );
};

export default QuizResults;