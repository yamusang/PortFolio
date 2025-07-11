import React, { useState } from "react";

const quizData = [
  {
    question:
      "useState를 사용하여 상태를 초기화할 때 올바른 코드 형태는 무엇인가요?",
    options: [
      "const [state, setState] = useState();",
      "const state = useState();",
      "const [state, setState] = useState(initialValue);",
      "const setState = useState(initialValue);",
    ],
    answer: 2,
    explanation:
      "useState는 상태와 상태를 업데이트하는 함수를 반환합니다. 초기값을 설정하려면 useState(initialValue)를 사용해야 하며, [state, setState] 형태로 구조분해 할당합니다.",
  },
  {
    question: "useEffect는 어떤 상황에서 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때만 실행된다.",
      "컴포넌트가 렌더링될 때마다 실행된다.",
      "의존성 배열에 명시된 값이 변경될 때 실행된다.",
      "컴포넌트가 언마운트될 때만 실행된다.",
    ],
    answer: 2,
    explanation:
      "useEffect는 의존성 배열을 기반으로 실행됩니다. 특정 값이 포함되어 있으면 해당 값이 변경될 때 실행됩니다.",
  },
  {
    question: "useEffect에서 반환된 함수는 언제 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때",
      "컴포넌트가 언마운트될 때",
      "의존성 배열의 값이 변경될 때",
      "컴포넌트가 업데이트될 때",
    ],
    answer: 1,
    explanation:
      "useEffect에서 반환된 함수는 컴포넌트가 언마운트될 때 실행되며, 의존성 배열 값이 변경될 때도 이전 효과를 정리하기 위해 실행됩니다.",
  },
  {
    question: "useState 상태 업데이트 함수의 특징은?",
    options: [
      "현재 상태를 직접 수정한다.",
      "비동기적으로 상태를 업데이트한다.",
      "상태를 즉시 업데이트한다.",
      "상태를 초기화한다.",
    ],
    answer: 1,
    explanation:
      "useState의 상태 업데이트 함수는 비동기적으로 작동하며, 상태를 직접 수정하지 않고 새로운 값을 설정합니다.",
  },
  {
    question: "useEffect의 의존성 배열을 빈 배열로 설정하면?",
    options: [
      "useEffect가 실행되지 않는다.",
      "처음 렌더링될 때만 실행된다.",
      "렌더링될 때마다 실행된다.",
      "언마운트될 때만 실행된다.",
    ],
    answer: 1,
    explanation:
      "빈 배열로 설정하면 useEffect는 컴포넌트가 처음 렌더링될 때 한 번만 실행됩니다.",
  },
];

export default function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState(
    Array(quizData.length).fill(null)
  );
  const [showResults, setShowResults] = useState(false);

  const handleOptionClick = (index) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestion] = index;
    setUserAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleRestart = () => {
    setUserAnswers(Array(quizData.length).fill(null));
    setCurrentQuestion(0);
    setShowResults(false);
  };

  const score = userAnswers.reduce((acc, answer, idx) => {
    return answer === quizData[idx].answer ? acc + 1 : acc;
  }, 0);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">React Quiz</h1>
      {showResults ? (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">
            결과: {score} / {quizData.length}
          </h2>
          {quizData.map((q, idx) => (
            <div key={idx} className="border p-4 rounded-xl bg-gray-50">
              <p className="font-medium">
                {idx + 1}. {q.question}
              </p>
              <p
                className={
                  userAnswers[idx] === q.answer
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                {userAnswers[idx] === q.answer ? "정답입니다!" : `오답입니다.`}
              </p>
              <p className="text-sm">해설: {q.explanation}</p>
            </div>
          ))}
          <button
            onClick={handleRestart}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-xl"
          >
            다시 풀기
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg font-medium">
            문제 {currentQuestion + 1} / {quizData.length}
          </p>
          <h2 className="text-xl font-semibold">
            {quizData[currentQuestion].question}
          </h2>
          <div className="grid gap-2">
            {quizData[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                className={`px-4 py-2 border rounded-xl text-left ${
                  userAnswers[currentQuestion] === index
                    ? "bg-blue-100 border-blue-500"
                    : "hover:bg-gray-100"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-4 py-2 bg-gray-300 rounded-xl disabled:opacity-50"
            >
              이전
            </button>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-green-500 text-white rounded-xl"
              disabled={userAnswers[currentQuestion] === null}
            >
              {currentQuestion === quizData.length - 1 ? "제출" : "다음"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
