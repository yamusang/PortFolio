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
    answer: 2, // 'const [state, setState] = useState(initialValue);'
    explanation:
      "useState는 [상태 값, 상태 설정 함수]를 배열로 반환합니다. 초기값을 설정하려면 useState(initialValue)와 같이 인자를 전달하고, 보통 구조 분해 할당을 사용해 변수를 선언합니다.",
  },
  {
    question: "useEffect는 어떤 상황에서 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때만 실행된다.",
      "컴포넌트가 렌더링될 때마다 실행된다.",
      "의존성 배열에 명시된 값이 변경될 때 실행된다.",
      "컴포넌트가 언마운트될 때만 실행된다.",
    ],
    answer: 2, // '의존성 배열에 명시된 값이 변경될 때 실행된다.'
    explanation:
      "useEffect의 실행 시점은 두 번째 인자인 의존성 배열(dependency array)에 따라 결정됩니다. 배열 안의 값이 변경될 때마다 첫 번째 인자인 콜백 함수가 실행됩니다.",
  },
  {
    question: "useEffect에서 반환된 함수(cleanup function)는 언제 실행되나요?",
    options: [
      "컴포넌트가 처음 렌더링될 때",
      "컴포넌트가 언마운트될 때 또는 의존성이 변경되기 직전",
      "의존성 배열의 값이 변경된 후",
      "컴포넌트가 업데이트될 때마다",
    ],
    answer: 1, // '컴포넌트가 언마운트될 때 또는 의존성이 변경되기 직전'
    explanation:
      "useEffect에서 반환된 함수(cleanup function)는 컴포넌트가 사라지기 전(unmount) 또는 다음 effect가 실행되기 직전에 이전 effect를 정리하기 위해 실행됩니다. 메모리 누수 방지 등에 사용됩니다.",
  },
  {
    question: "useState 상태 업데이트 함수의 특징은?",
    options: [
      "현재 상태를 직접 수정한다.",
      "비동기적으로 상태를 업데이트한다.",
      "상태를 즉시 업데이트한다.",
      "상태를 초기화한다.",
    ],
    answer: 1, // '비동기적으로 상태를 업데이트한다.'
    explanation:
      "React의 상태 업데이트는 성능 최적화를 위해 여러 업데이트를 하나로 묶어 처리(batching)하는 비동기 방식으로 동작합니다. 따라서 setState 호출 직후에 상태가 바로 바뀌지 않을 수 있습니다.",
  },
  {
    question: "useEffect의 의존성 배열을 빈 배열(`[]`)로 설정하면?",
    options: [
      "useEffect가 실행되지 않는다.",
      "처음 렌더링될 때만 실행된다.",
      "렌더링될 때마다 실행된다.",
      "언마운트될 때만 실행된다.",
    ],
    answer: 1, // '처음 렌더링될 때만 실행된다.'
    explanation:
      "의존성 배열을 빈 배열(`[]`)로 전달하면, useEffect는 컴포넌트가 마운트될 때(처음 렌더링될 때) 단 한 번만 실행됩니다. API 호출 등 최초에 한 번만 필요한 작업을 할 때 유용합니다.",
  },
];
export default function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 문제 번호
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); // 사용자가 선택한 답
  const [isAnswered, setIsAnswered] = useState(false); // 답변 완료 여부
  const [score, setScore] = useState(0); // 점수
  const [showResult, setShowResult] = useState(false); // 결과 화면 표시 여부

  const currentQuestion = quizData[currentQuestionIndex];

  // 옵션 선택 시 실행되는 함수
  const handleOptionClick = (index) => {
    if (isAnswered) return; // 이미 답변했다면 아무것도 하지 않음

    setSelectedOptionIndex(index);
    setIsAnswered(true);

    if (index === currentQuestion.answer) {
      setScore(score + 1); // 정답이면 점수 증가
    }
  };

  // 다음 문제로 넘어가는 함수
  const handleNextQuestion = () => {
    // 다음 문제가 있는지 확인
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // 상태 초기화
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    } else {
      // 마지막 문제였다면 결과 화면 표시
      setShowResult(true);
    }
  };

  // 퀴즈를 다시 시작하는 함수
  const handleRestartQuiz = () => {
    // 모든 상태를 초기값으로 리셋
    setCurrentQuestionIndex(0);
    setSelectedOptionIndex(null);
    setIsAnswered(false);
    setScore(0);
    setShowResult(false);
  };

  // 동적으로 버튼 클래스를 결정하는 함수
  const getButtonClass = (index) => {
    if (!isAnswered) {
      return "option-btn";
    }
    // 답변이 끝난 후
    if (index === currentQuestion.answer) {
      return "option-btn correct"; // 정답 버튼
    }
    if (index === selectedOptionIndex) {
      return "option-btn incorrect"; // 선택한 오답 버튼
    }
    return "option-btn";
  };
  return (
    <div className="quiz-container">
      {showResult ? (
        // 결과 화면
        <div className="result-screen">
          <h2>🎉 퀴즈 완료! 🎉</h2>
          <p>
            총 <strong>{quizData.length}문제</strong> 중{" "}
            <strong>{score}문제</strong>를 맞혔습니다.
          </p>
          <button onClick={handleRestartQuiz} className="next-btn">
            다시 풀기
          </button>
        </div>
      ) : (
        // 퀴즈 진행 화면
        <>
          <div className="question-header">
            <h2>
              문제 {currentQuestionIndex + 1} / {quizData.length}
            </h2>
          </div>
          <div className="question-body">
            <h3>{currentQuestion.question}</h3>
            <div className="options-container">
              {currentQuestion.options.map((option, index) => (
                <button
                  key={index}
                  className={getButtonClass(index)}
                  onClick={() => handleOptionClick(index)}
                  disabled={isAnswered} // 답변 후 비활성화
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
          {isAnswered && (
            <div className="feedback-container">
              <div className="explanation">
                <strong>
                  {selectedOptionIndex === currentQuestion.answer
                    ? "✅ 정답입니다!"
                    : "❌ 오답입니다."}
                </strong>
                <p>{currentQuestion.explanation}</p>
              </div>
              <button onClick={handleNextQuestion} className="next-btn">
                {currentQuestionIndex < quizData.length - 1
                  ? "다음 문제"
                  : "결과 보기"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
