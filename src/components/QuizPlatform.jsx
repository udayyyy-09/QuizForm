import React, { useState, useEffect } from "react";
import { questions } from "../data/questions";
import { addQuizResult, getQuizResults } from "../utils/db";
import QuizQuestion from "./QuizQuestion";
import QuizResults from "./QuizResults";
import PreviousAttempts from "./PreviousAttempts";
import QuizTimer from "./QuizTimer";

const QuizPlatform = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fillAnswer, setFillAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [feedback, setFeedback] = useState(null);
  const [attempts, setAttempts] = useState([]);
  const [questionResponses, setQuestionResponses] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      const history = await getQuizResults();
      setAttempts(history);
    };
    fetchHistory();
  }, []);

  useEffect(() => {
    setTimeLeft(30);
    setSelectedOption(null);
    setFillAnswer(null);
    setFeedback(null);
  }, [currentQuestion]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else {
      handleNextQuestion();
    }
  }, [timeLeft]);

  const handleAnswerClick = (index) => {
    if (selectedOption !== null || timeLeft === 0) return;

    setSelectedOption(index);
    const currentQ = questions[currentQuestion];

    if (index === currentQ.correct) {
      setFeedback(
        <div className="animate-fade-in">
          <p className="text-green-600 font-semibold">Correct!</p>
          <p className="text-gray-600 text-sm mt-1">ℹ️ {currentQ.explanation}</p>
        </div>
      );
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback(
        <div className="animate-fade-in">
          <span className="text-red-600 font-semibold">
            Incorrect! The correct answer is:{" "}
            <span className="text-purple-600">{currentQ.options[currentQ.correct]}</span>
          </span>
        </div>
      );
    }

    setQuestionResponses((prevResponses) => [
      ...prevResponses,
      {
        question: currentQuestion,
        selected: index,
        correct: currentQ.correct,
        timeTaken: 30 - timeLeft,
        type: "mcq",
      },
    ]);
  };

  const handleFillAnswerSubmit = (answer, isCorrect) => {
    if (fillAnswer !== null || timeLeft === 0) return;

    setFillAnswer(answer);
    const currentQ = questions[currentQuestion];

    if (isCorrect) {
      setFeedback(
        <div className="animate-fade-in">
          <p className="text-green-600 font-semibold">Correct!</p>
          <p className="text-gray-600 text-sm mt-1">ℹ️ {currentQ.explanation}</p>
        </div>
      );
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback(
        <div className="animate-fade-in">
          <span className="text-red-600 font-semibold">
            Incorrect! The correct answer is:{" "}
            <span className="text-purple-600">{currentQ.answer}</span>
          </span>
        </div>
      );
    }

    setQuestionResponses((prevResponses) => [
      ...prevResponses,
      {
        question: currentQuestion,
        selected: answer,
        correct: currentQ.answer,
        timeTaken: 30 - timeLeft,
        type: currentQ.type,
      },
    ]);
  };

  const handleNextQuestion = async () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      const newAttempt = {
        date: new Date().toISOString(),
        score,
        totalQuestions: questions.length,
        timeTaken: questionResponses.reduce((acc, curr) => acc + curr.timeTaken, 0),
        answers: questionResponses,
      };

      await addQuizResult(newAttempt);
      setAttempts((prevAttempts) => [...prevAttempts, newAttempt]);
      setShowScore(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setFillAnswer(null);
    setTimeLeft(30);
    setFeedback(null);
    setQuestionResponses([]);
    setShowHistory(false);
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-rose-50 via-violet-50 to-teal-50">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-pink-100 opacity-40 blur-3xl animate-float"></div>
        <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-violet-100 opacity-40 blur-3xl animate-float-delay"></div>
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-teal-100 opacity-40 blur-3xl animate-float"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
          {/* History button */}
          {showScore && !showHistory && attempts.length > 0 && (
            <button
              onClick={() => setShowHistory(true)}
              className="cursor-pointer absolute top-4 right-4 bg-violet-100 hover:bg-violet-200 text-violet-700 px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 flex items-center shadow-sm hover:shadow-md"
            >
              <span className="mr-1">📊</span> History
            </button>
          )}

          {/* Show history view when toggled */}
          {showHistory && (
            <PreviousAttempts
              attempts={attempts}
              onClose={() => setShowHistory(false)}
            />
          )}

          {showScore ? (
            <QuizResults
              score={score}
              totalQuestions={questions.length}
              attempts={attempts}
              onRestart={restartQuiz}
            />
          ) : (
            !showHistory && (
              <>
                <QuizTimer
                  currentQuestion={currentQuestion}
                  totalQuestions={questions.length}
                  timeLeft={timeLeft}
                />

                <QuizQuestion
                  question={currentQ.question}
                  type={currentQ.type}
                  options={currentQ.options}
                  answer={currentQ.answer}
                  caseSensitive={currentQ.caseSensitive}
                  selectedOption={selectedOption}
                  correctAnswer={currentQ.correct}
                  timeLeft={timeLeft}
                  feedback={feedback}
                  onAnswerClick={handleAnswerClick}
                  onFillAnswerSubmit={handleFillAnswerSubmit}
                  onNextQuestion={handleNextQuestion}
                  isLastQuestion={currentQuestion === questions.length - 1}
                  userAnswer={fillAnswer}
                />
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizPlatform;







