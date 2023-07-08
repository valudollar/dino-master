import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const questionNumberOptions = [5, 10, 20, 50];
  //   const [noQns, setnoQns] = useState(0);
  const navigate = useNavigate();

  function chooseQuestions(e) {
    const number = e.target.value;
    navigate("/quiz", { state: number });
  }

  return (
    <>
      <header className="">
        <h1>DINO MASTER</h1>
        <h4>The realest Dino Quiz you can find. </h4>
      </header>
      <section>
        <h3>How many questions do you think you can handle? </h3>
        <div className="answerContainer">
          {questionNumberOptions.map((option, id) => (
            <button
              value={option}
              key={id}
              onClick={chooseQuestions}
              className="answerButton"
            >
              {option}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export default Home;
