import React, { useRef, useState } from "react";

export default function NumberGame() {
  const [userinput, setUserInput] = useState("");
  const [gnums, setGnums] = useState([]);
  const [showresult, setShowResult] = useState();
  const [count,setCount]=useState(1);
  const [ainum,setAinum]=useState(Math.ceil(Math.random() * 50))
  let gamer = useRef("")
  let ocount = useRef(5);
  let isOk = useRef(false);

  function inputNum() {
    setGnums([...gnums, userinput]);
    setUserInput("");
    setCount(count+1)
    console.log(count)
    console.log(gamer)
    console.log(isOk)
    if (parseInt(userinput) > parseInt(ainum)) {
      setShowResult(
        <div>
          <h3>아닙니다. 더 작은값입니다.</h3>
        </div>
      );
      ocount.current=ocount.current-1
      
    } else if (parseInt(userinput) < parseInt(ainum)) {
      setShowResult(
        <div>
          <h3>아닙니다. 더 큰 값입니다.</h3>
        </div>
      );
      ocount.current=ocount.current-1
      
    } else if (parseInt(userinput) === parseInt(ainum)) {
      isOk=true
      setShowResult(
        <div>
          <h3>딩동댕!! 정답입니다.</h3>
          <h3>
            ✔정답:{ainum}, 시도횟수:{count}
          </h3>
          <ul>입력한 숫자 :{gnums.map((gnums,index)=>(
            <li key={index}>{gnums}

          </li>))}</ul>
          <h3>숫자 맞추기 성공!!</h3>
          <hr />
          <h3>정보 확인</h3>
          <h3>gamer:{gamer.current}, 시도횟수:{count}, 성공여부:{isOk.toString()}</h3>
        </div>
        
      );
    }

    if(ocount.current==0){
      setShowResult(
        <div>
          <h3>
            ✔정답:{ainum}, 시도횟수:{count}
          </h3>
          <ul>입력한 숫자 : {gnums.map((gnums,index)=>(
            <li key={index}>{gnums}

          </li>))}</ul>
          <h3>실패!! 주어진 기회를 다 쓰셨습니다. 게임을 다시 시작하세요!!</h3>
          <hr />
          <h3>정보 확인</h3>
          <h3>gamer:{gamer.current}, 시도횟수:{count}, 성공여부:{isOk.current}</h3>
        </div>
      )
    }
  }


  function reStart(){
    setShowResult(false)
    setCount(1)
    ocount.current=5
    setAinum(Math.ceil(Math.random() * 50))
    setGnums([])
  }


  return (
    <div>
      <h3>[[[[[숫자게임을 시작합니다.]]]]]</h3>
      <h3>-AI는 숫자를 결정했습니다.-</h3>
      <h3>-너 휴먼은 맞춰보세요.(숫자는 1부터 50 안에서 정하세요.)-</h3>
      <div>
        <div>
          <h4>참가자 닉네임</h4>
          <input type="text" placeholder="이름을 입력하세요." onChange={(e) => gamer.current=e.target.value} disabled={count>1}></input>

        </div>
        <h2>너 휴먼 생각한 숫자 입력(남은 기회 : {ocount.current})</h2>
       숫자:
        <input
          type="text"
          placeholder="숫자를 입력하세요"
          onChange={(e) => setUserInput(e.target.value)}
          disabled={count==0}
        />
        <button onClick={inputNum} disabled={ocount.current<1}>확인</button>
      </div>
      <div>{showresult}</div>
      {ainum}
      {gnums}
      <div>
        <button disabled={ocount.current>0} onClick={reStart}>재시작</button>
      </div>
    </div>
  );
}
