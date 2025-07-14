import React, { useState, useEffect, useCallback } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiRotateCcw,
  FiCheck,
  FiX,
} from "react-icons/fi";
import "./Quiz.css";

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

const Quiz = () => {
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
  // 섞인 퀴즈 문제들을 저장할 상태와 그 상태를 변경할 함수를 선언합니다. 초기값은 빈 배열입니다.
  const [userAnswers, setUserAnswers] = useState([]);
  // 사용자의 답변들을 저장할 상태와 그 상태를 변경할 함수를 선언합니다.
  const [currentQuestion, setCurrentQuestion] = useState(0);
  // 현재 보여주고 있는 문제의 인덱스를 저장할 상태와 그 상태를 변경할 함수를 선언합니다.
  const [showScore, setShowScore] = useState(false);
  // 퀴즈 결과 화면을 보여줄지 여부를 결정하는 상태와 그 상태를 변경할 함수를 선언합니다.

  // 2. 퀴즈 시작/재시작 로직을 함수로 분리
  // 퀴즈를 시작하거나 재시작하는 로직을 담은 함수를 정의합니다. useCallback으로 감싸 불필요한 재생성을 방지합니다.
  const startQuiz = useCallback(() => {
    // Fisher–Yates shuffle 알고리즘으로 문제 섞기
    // 원본 퀴즈 데이터(quizData)를 복사한 후, sort와 Math.random()을 이용해 무작위로 섞습니다.
    const shuffled = [...quizData].sort(() => Math.random() - 0.5);
    // 섞인 문제들로 shuffledQuiz 상태를 업데이트합니다.
    setShuffledQuiz(shuffled);
    // 퀴즈 문제 수만큼의 길이를 가진, null로 채워진 배열을 생성하여 사용자 답변 상태를 초기화합니다.
    setUserAnswers(Array(shuffled.length).fill(null));
    // 현재 문제 번호를 0으로 초기화합니다.
    setCurrentQuestion(0);
    // 결과 화면을 숨깁니다.
    setShowScore(false);
  }, []);

  // 컴포넌트 마운트 시 퀴즈 시작
  // 컴포넌트가 렌더링된 후 특정 작업을 수행하기 위한 useEffect 훅을 사용합니다.
  useEffect(() => {
    // 컴포넌트가 처음 마운트되었을 때 startQuiz 함수를 호출하여 퀴즈를 시작합니다.
    startQuiz();
  }, [startQuiz]);
  // 의존성 배열에 startQuiz가 있으므로, startQuiz 함수가 변경될 때만 이 효과가 다시 실행됩니다.

  // 사용자가 선택지를 클릭했을 때 호출될 함수를 정의합니다. 선택된 옵션의 인덱스를 매개변수로 받습니다.
  const handleAnswerOptionClick = (selectedIndex) => {
    // 상태의 불변성을 지키기 위해, 기존 사용자 답변 배열을 복사합니다
    const updatedAnswers = [...userAnswers];
    // 복사된 배열에서 현재 문제에 해당하는 위치에 사용자가 선택한 답의 인덱스를 저장합니다.
    updatedAnswers[currentQuestion] = selectedIndex;
    // 변경된 답변 배열로 상태를 업데이트합니다.
    setUserAnswers(updatedAnswers);
  };

  // '이전' 버튼을 클릭했을 때 호출될 함수를 정의합니다.
  const handlePrevious = () => {
    // 현재 문제가 첫 번째 문제가 아닐 경우에만 현재 문제 인덱스를 1 감소시킵니다.
    if (currentQuestion > 0) setCurrentQuestion(currentQuestion - 1);
  };

  // '다음' 버튼을 클릭했을 때 호출될 함수를 정의합니다.
  const handleNext = () => {
    // 현재 문제가 마지막 문제가 아니라면,
    if (currentQuestion < shuffledQuiz.length - 1) {
      // 다음 문제로 넘어가기 위해 현재 문제 인덱스를 1 증가시킵니다.
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 마지막 문제라면, 결과 화면을 보여주기 위해 showScore 상태를 true로 변경합니다.
      setShowScore(true);
    }
  };

  // '다시 풀기' 버튼을 클릭했을 때 호출될 함수를 정의합니다.
  // 재시작 시 startQuiz 함수 호출
  const handleRestart = () => {
    startQuiz();
  };

  // 퀴즈 데이터가 아직 준비되지 않았다면(배열이 비어있다면) 로딩 화면을 표시하기 위한 조건문입니다.
  // 1. 로딩 상태 처리: 아직 문제가 준비되지 않았다면 로딩 화면 표시
  if (shuffledQuiz.length === 0) {
    // 로딩 중임을 알리는 JSX를 반환하고 컴포넌트 실행을 여기서 종료합니다.
    return <div className="quiz-container">퀴즈를 불러오는 중...</div>;
  }

  // reduce 메서드를 사용해 맞힌 문제의 개수(점수)를 계산합니다.
  const score = userAnswers.reduce(
    // 누적값(total), 현재 답변(answer), 현재 인덱스(index)를 인자로 받는 콜백 함수입니다.
    (total, answer, index) =>
      // 사용자의 답변(answer)과 실제 정답(shuffledQuiz[index]?.answer)이 일치하면 누적값에 1을 더하고, 아니면 그대로 둡니다.
      answer === shuffledQuiz[index]?.answer ? total + 1 : total,
    0 // 누적값의 초기값은 0입니다.
  );
  // 퀴즈 진행률을 퍼센트로 계산합니다.
  const progressPercent = ((currentQuestion + 1) / shuffledQuiz.length) * 100;

  // 화면에 렌더링할 JSX를 반환합니다.
  return (
    // 퀴즈 전체를 감싸는 컨테이너 div입니다.
    <div className="quiz-container">
      {/* showScore 상태 값에 따라 퀴즈 결과 화면 또는 문제 풀이 화면을 조건부로 렌더링합니다. */}
      {showScore ? (
        <div className="score-section">
          <h2>퀴즈 결과 📊</h2>
          {/* 총 문제 수와 맞힌 문제 수를 보여주는 문단입니다. */}
          <p>
            총 {shuffledQuiz.length}문제 중 <strong>{score}</strong>개를
            맞히셨습니다!
          </p>
          {/* 점수를 백분율로 변환하고 소수점 없이 반올림하여 굵게 표시합니다. */}
          <div className="score-details">
            점수:{" "}
            <strong>
              {((score / shuffledQuiz.length) * 100).toFixed(0)}점
            </strong>
          </div>

          {/* 결과 해설 전체 표시 */}
          <div className="results-breakdown">
            {/* map 함수를 사용해 섞인 퀴즈 문제 배열을 순회하며 각 문제에 대한 결과 정보를 화면에 표시합니다. */}
            {shuffledQuiz.map((question, index) => {
              // 사용자가 이 문제를 맞혔는지 여부를 변수에 저장합니다.
              const isCorrect = userAnswers[index] === question.answer;
              // 각 문제의 결과를 감싸는 div입니다. React 리스트 렌더링 시 고유한 key가 필요합니다.
              return (
                <div key={index} className="result-question">
                  <p className="question-text">
                    <strong>
                      {index + 1}. {question.question}
                    </strong>
                  </p>
                  <ul className="result-options">
                    {/* 해당 문제의 선택지들을 map 함수로 순회하며 화면에 표시합니다. */}
                    {question.options.map((option, i) => {
                      // 각 선택지 li 요소에 적용할 CSS 클래스를 저장할 변수를 선언합니다.
                      let className = "option-result";
                      // 만약 현재 선택지가 정답이라면 'correct' 클래스를 추가합니다.
                      if (i === question.answer) className += " correct";
                      // 정답이 아니면서 사용자가 선택한 오답이라면 'incorrect' 클래스를 추가합니다.
                      else if (i === userAnswers[index])
                        className += " incorrect";

                      // 각 선택지를 나타내는 li 요소를 반환합니다.
                      return (
                        <li key={i} className={className}>
                          {option}
                          {/* 현재 선택지가 정답일 경우에만 체크 아이콘을 표시합니다. */}
                          {i === question.answer && <FiCheck />}
                          {/* 사용자가 선택한 오답일 경우에만 X 아이콘을 표시합니다. */}
                          {i === userAnswers[index] &&
                            i !== question.answer && <FiX />}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="explanation">
                    <strong>해설:</strong> {question.explanation}
                  </p>
                </div>
              );
            })}
          </div>

          <button onClick={handleRestart} className="restart-button">
            <FiRotateCcw /> 다시 풀기
          </button>
        </div>
      ) : (
        <div>
          {/* 진행률을 시각적으로 보여주는 프로그레스 바입니다. */}
          <div className="progress-bar">
            <progress value={progressPercent} max="100" />
          </div>

          <div className="question-section">
            <div className="question-count">
              <span>문제 {currentQuestion + 1}</span>/{shuffledQuiz.length}
            </div>
            <div className="question-text">
              {shuffledQuiz[currentQuestion].question}
            </div>
          </div>

          <div className="answer-section">
            {/* 현재 문제의 선택지들을 map 함수로 순회하며 버튼으로 만듭니다. */}
            {shuffledQuiz[currentQuestion].options.map((option, index) => {
               // 현재 옵션이 사용자에 의해 선택되었는지 여부를 변수에 저장합니다.
              const isSelected = userAnswers[currentQuestion] === index;
              // 각 선택지를 나타내는 버튼 요소를 반환합니다.
              return (
                <button
                // React 리스트 렌더링 시 고유한 key가 필요합니다.
                  key={index}
                  // 기본 클래스에, 현재 옵션이 선택되었다면(isSelected) 'selected' 클래스를 추가로 적용합니다.
                  className={`option-button ${isSelected ? "selected" : ""}`}
                   // 버튼 클릭 시 handleAnswerOptionClick 함수를 해당 인덱스와 함께 호출합니다.
                  onClick={() => handleAnswerOptionClick(index)}
                >
                  {option}
                </button>
              );
            })}
          </div>
 {/* 이전/다음 문제로 이동하는 내비게이션 버튼 섹션입니다. */}
          <div className="navigation-buttons">
            <button onClick={handlePrevious} disabled={currentQuestion === 0}>
              {/* 이전 아이콘과 텍스트를 표시합니다. 첫 번째 문제일 경우 비활성화됩니다. */}
              <FiChevronLeft /> 이전
            </button>
            <button
              onClick={handleNext}
               // 사용자가 현재 문제의 답을 아직 선택하지 않았다면(null) 버튼을 비활성화합니다.
              disabled={userAnswers[currentQuestion] === null}
            >
               {/* 마지막 문제인 경우 '결과 보기', 아닐 경우 '다음' 텍스트를 표시합니다. */}
              {currentQuestion === shuffledQuiz.length - 1
                ? "결과 보기"
                : "다음"}
              <FiChevronRight />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;
