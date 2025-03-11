import React from "react";
import FillBlankQuestion from "./FillBlankQuestion";

const QuizQuestion = ({ 
  question,
  type,
  options,
  answer,
  caseSensitive,
  selectedOption,
  correctAnswer,
  timeLeft,
  feedback,
  onAnswerClick,
  onFillAnswerSubmit,
  onNextQuestion,
  isLastQuestion,
  userAnswer
}) => {
  // Handle different question types
  const renderQuestionContent = () => {
    if (type === "mcq") {
      // Render multiple choice question
      return (
        <>
          <h2 className="text-lg font-medium mb-4 text-black-700">{question}</h2>
          <div className="space-y-2">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => onAnswerClick(index)}
                disabled={selectedOption !== null || timeLeft === 0}
                className={`w-full p-3 text-left rounded-lg border transition-all duration-300 ${
                  selectedOption !== null
                    ? index === correctAnswer
                      ? "border-teal-400 bg-teal-50/50 text-teal-700"
                      : selectedOption === index
                      ? "border-rose-400 bg-rose-50/50 text-rose-700"
                      : "border-violet-200 text-black-600"
                    : "border-violet-200 text-black-600 hover:border-violet-400 hover:bg-white/50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>

          {feedback && <div className="text-lg mt-3 font-semibold">{feedback}</div>}
        </>
      );
    } else if (type === "fill-integer" || type === "fill-string") {
      // Render fill-in-the-blank question
      return (
        <FillBlankQuestion
          question={question}
          type={type}
          answer={answer}
          caseSensitive={caseSensitive}
          onAnswerSubmit={onFillAnswerSubmit}
          isDisabled={selectedOption !== null || timeLeft === 0}
          userAnswer={userAnswer}
        />
      );
    }
    
    // Default case
    return <p>Question type not supported</p>;
  };

  return (
    <>
      {renderQuestionContent()}

      {/* Next button - should appear when any question type is answered */}
      {(selectedOption !== null || userAnswer !== null || timeLeft === 0) && (
        <button
          onClick={onNextQuestion}
          className="cursor-pointer w-full mt-4 py-2 bg-gradient-to-r from-blue-400 to-violet-400 text-white rounded-lg hover:from-rose-500 hover:to-violet-500 transition shadow-lg shadow-violet-200 hover:shadow-violet-300"
        >
          {isLastQuestion ? "Finish Quiz" : "Next Question"}
        </button>
      )}
    </>
  );
};

export default QuizQuestion;