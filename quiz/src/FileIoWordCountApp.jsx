import React, { useState, useMemo } from 'react';
import './FileIoWordCountApp.css';

function FileIoWordCountApp() {
  // 파일 이름, 내용, 단어 수를 저장하기 위한 state
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [wordCount, setWordCount] = useState(0);

  /**
   * 사용자가 파일을 선택했을 때 실행되는 함수
   * @param {object} event - 파일 입력 이벤트 객체
   */
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
  
    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      setFileContent(text);

      // 정규표현식을 사용해 영어 단어만 추출하여 개수 계산
      // \b: 단어 경계, [a-zA-Z]+: 하나 이상의 영어 알파벳
      const words = text.match(/\b[a-zA-Z]+\b/g);
      setWordCount(words ? words.length : 0);
    };
    reader.readAsText(file);
  };

  /**
   * 파일 내용에서 영어 단어만 강조 처리하는 컴포넌트
   * fileContent가 변경될 때만 재계산하도록 useMemo 사용
   */
  const highlightedContent = useMemo(() => {
    if (!fileContent) {
      return <p className="placeholder">여기에 파일 내용이 표시됩니다.</p>;
    }

    // 정규표현식을 사용해 "영어단어"와 "그 외 문자"로 분리
    // 괄호()로 묶은 부분은 split 결과에 포함됨
    const parts = fileContent.split(/(\b[a-zA-Z]+\b)/g);

    return parts.map((part, index) =>
      /\b[a-zA-Z]+\b/g.test(part) ? (
        // 영어 단어는 highlight 클래스를 적용한 span 태그로 감싸기
        <span key={index} className="highlight">
          {part}
        </span>
      ) : (
        // 그 외 문자는 그대로 표시
        <React.Fragment key={index}>{part}</React.Fragment>
      )
    );
  }, [fileContent]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 React 텍스트 파일 단어 카운터</h1>
        <p>텍스트 파일을 선택하면 영어 단어 수를 세고 강조 표시합니다.</p>
        
        {/* 파일 입력을 위한 UI */}
        <div className="file-input-container">
          <input
            type="file"
            id="fileInput"
            className="file-input"
            onChange={handleFileChange}
            accept=".txt" // .txt 파일만 선택 가능하도록 제한
          />
          <label htmlFor="fileInput" className="file-label">
            텍스트 파일 선택
          </label>
        </div>

        {/* 분석 결과 표시 */}
        {fileName && (
          <div className="result-container">
            <p><strong>파일명:</strong> {fileName}</p>
            <p>
              <strong>영어 단어 수:</strong> <span className="highlight">{wordCount}</span> 개
            </p>
          </div>
        )}
      </header>

      {/* 파일 내용 표시 */}
      <main className="content-display">
        <pre>{highlightedContent}</pre>
      </main>
    </div>
  );
}

export default FileIoWordCountApp;