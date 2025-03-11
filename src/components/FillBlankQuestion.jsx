import React, { useState } from "react";

const FillBlankQuestion = ({ 
  question, 
  type, 
  answer, 
  caseSensitive = false,
  onAnswerSubmit,
  isDisabled,
  userAnswer = null
}) => {
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    
    let correct = false;
    
    if (type === "fill-integer") {
      // For integer questions, convert to number and compare
      const numericInput = parseInt(inputValue, 10);
      correct = !isNaN(numericInput) && numericInput === parseInt(answer, 10);
    } else if (type === "fill-string") {
      // For string questions, compare strings (considering case sensitivity)
      if (caseSensitive) {
        correct = inputValue === answer;
      } else {
        correct = inputValue.toLowerCase() === answer.toLowerCase();
      }
    }
    
    setIsCorrect(correct);
    onAnswerSubmit(inputValue, correct);
  };

  // If the question is already answered (userAnswer is provided), show that state
  const showResult = userAnswer !== null;
  
  return (
    <div className="mb-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <p className="text-lg font-medium mb-4 text-black-700">{question}</p>
          
          <div className="mb-4">
            <input
              type={type === "fill-integer" ? "number" : "text"}
              value={showResult ? userAnswer : inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isDisabled || showResult}
              className={`w-full p-3 border rounded-lg text-black-700 focus:outline-none focus:ring-2 
                ${showResult 
                  ? (isCorrect ? "border-teal-400 bg-teal-50/50" : "border-rose-400 bg-rose-50/50") 
                  : "border-violet-300 focus:ring-violet-500"
                }
              `}
              placeholder={type === "fill-integer" ? "Enter a number..." : "Type your answer..."}
            />
          </div>
          
          {!showResult && (
            <button
              type="submit"
              disabled={isDisabled || inputValue.trim() === ""}
              className={`w-full py-2 rounded-lg transition ${
                inputValue.trim() === ""
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-gradient-to-r from-blue-400 to-violet-400 text-white cursor-pointer hover:from-blue-500 hover:to-violet-500"
              }`}
            >
              Submit Answer
            </button>
          )}
        </div>
      </form>
      
      {showResult && (
        <div className={`p-3 rounded-lg mt-2 ${isCorrect ? "bg-teal-100 text-teal-700" : "bg-rose-100 text-rose-700"}`}>
          <p className="font-medium">
            {isCorrect ? "✓ Correct!" : "✗ Incorrect!"}
          </p>
          <p className="text-sm mt-1">
            {!isCorrect && (
              <>The correct answer is: <span className="font-semibold">{answer}</span></>
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default FillBlankQuestion;