import React, { useState } from "react";
import { questions } from "../data/questions";

const PreviousAttempts = ({ attempts, onClose }) => {
  const [selectedAttempt, setSelectedAttempt] = useState(null);

  //dd/mm/yyyy pattern
  const formatDate = (dateString)=>{
    const date = new Date(dateString)
    // const day = String(date.getDate()).padStart(2,'0');   //two-digit day
    // const month = String(date.getMonth()+1);
    // const year = date.getFullYear();
    // const time = fate.toLocaleTimeString();
    // return `${day}/${month}/${year}    ${time}`;
    return date.toLocaleDateString('en-GB') + "   " + date.toLocaleTimeString();
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  };

  // Function to get question text by index
  const getQuestionText = (questionIndex) => {
    return questions[questionIndex]?.question || "Question not found";
  };

  // Function to get correct answer text
  const getCorrectAnswerText = (questionIndex, answerData) => {
    const question = questions[questionIndex];
    if (!question) return "Unknown";
    
    if (question.type === "mcq") {
      return question.options[question.correct];
    } else {
      return question.answer.toString();
    }
  };

  // Function to get user answer text
  const getUserAnswerText = (questionIndex, answerData) => {
    const question = questions[questionIndex];
    if (!question) return "Unknown";
    
    if (question.type === "mcq") {
      return question.options[answerData.selected];
    } else {
      return answerData.selected.toString();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold  text-violet-800  ">Quiz History</h2>
        <button
          onClick={onClose}
          className="text-violet-600 hover:text-blue-400 cursor-pointer"
        >
          ← Back to Results
        </button>
      </div>

      {attempts.length === 0 ? (
        <p className="text-center text-gray-500">No previous attempts found.</p>
      ) : (
        <div className="space-y-4">
          {!selectedAttempt ? (
            // Show list of attempts
            <div className="space-y-3">
              {attempts.map((attempt, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedAttempt(attempt)}
                  className="bg-white/70 p-4 rounded-lg shadow cursor-pointer hover:bg-gray-200 transition"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium">
                      {formatDate(attempt.date)}
                    </p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        attempt.score / attempt.totalQuestions >= 0.7
                          ? "bg-teal-100 text-teal-700"
                          : attempt.score / attempt.totalQuestions >= 0.4
                          ? "bg-amber-100 text-amber-700"
                          : "bg-rose-100 text-rose-700"
                      }`}
                    >
                      {attempt.score} / {attempt.totalQuestions}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">
                    Time: {formatTime(attempt.timeTaken)}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            // Show detailed view of selected attempt
            <div className="space-y-6">
              <div className="bg-white/70 p-5 rounded-lg shadow">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold">
                    Attempt Details
                  </h3>
                  <button
                    onClick={() => setSelectedAttempt(null)}
                    className="text-violet-600 hover:text-blue-400 text-sm cursor-pointer"
                  >
                    ← Back to List
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-10 mb-8 text-sm p-1">
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-medium">{formatDate(selectedAttempt.date)}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Score</p>
                    <p className="font-medium">
                      {selectedAttempt.score} / {selectedAttempt.totalQuestions}
                      <span className="text-gray-500 ml-2">
                        ({Math.round((selectedAttempt.score / selectedAttempt.totalQuestions) * 100)}%)
                      </span>
                    </p>
                  </div>
                  {/* <div>
                    <p className="text-gray-600">Time Taken</p>
                    <p className="font-medium">{formatTime(selectedAttempt.timeTaken)}</p>
                  </div> */}
                </div>

                <h4 className="font-semibold text-violet-700 mt-6 mb-3">
                  Question Review
                </h4>
                <div className="space-y-7">
                  {selectedAttempt.answers.map((answer, index) => {
                    const isCorrect = answer.type === "mcq" 
                      ? answer.selected === answer.correct
                      : answer.selected.toString().toLowerCase() === answer.correct.toString().toLowerCase();
                    
                    return (
                      <div 
                        key={index}
                        className={`p-4 rounded-lg border ${
                          isCorrect 
                            ? "border-teal-300 bg-teal-50/70" 
                            : "border-rose-300 bg-rose-50/70"
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          <span className={`font-bold text-lg ${
                            isCorrect ? "text-teal-600" : "text-rose-600"
                          }`}>
                            {isCorrect ? "✓" : "✗"}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium">
                              {getQuestionText(answer.question)}
                            </p>
                            <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                              <div>
                                <p className="text-gray-800">Your answer:</p>
                                <p className={`font-medium ${isCorrect ? "text-teal-700" : "text-rose-700"}`}>
                                  {getUserAnswerText(answer.question, answer)}
                                </p>
                              </div>
                              {!isCorrect && (
                                <div>
                                  <p className="text-gray-600">Correct answer:</p>
                                  <p className="font-medium text-teal-700">
                                    {getCorrectAnswerText(answer.question, answer)}
                                  </p>
                                </div>
                              )}
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                              Time spent: {formatTime(answer.timeTaken)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PreviousAttempts;