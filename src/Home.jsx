import { useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const [noQns, setnoQns] = useState(0);
  const [period, setPeriod] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [ready, setReady] = useState(false);
  const questionNumberOptions = ["5", "10", "20", "50"];
  const periodOptions = ["Triassic", "Jurassic", "Cretaceous", "All"];
  const difficultyOptions = ["Easy", "Normal", "Hard"];
  const [numberSelected, setnumberSelected] = useState(false);
  const [periodSelected, setperiodSelected] = useState(false);
  const [difficultySelected, setdifficultySelected] = useState(false);
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();

  function chooseQuestions(e) {
    const number = e.target.value;
    setnoQns(number);
    setnumberSelected(true);
  }

  function choosePeriod(e) {
    const choice = e.target.value;
    setPeriod(choice);
    setperiodSelected(true);
  }

  function chooseDifficulty(e) {
    const choice = e.target.value;
    setDifficulty(choice);
    setdifficultySelected(true);
  }
  function getReady() {
    if (
      periodSelected === true &&
      numberSelected === true &&
      difficultySelected === true
    ) {
      setReady(true);
    } else setAlert("Please complete quiz settings. ");
  }
  function startQuiz() {
    navigate("/quiz", { state: { number: noQns, time: period } });
  }

  useEffect(() => {
    if (ready === true) {
      startQuiz();
    }
  }, [ready]);

  return (
    // <>
    <body>
      <header className="">
        <h1 className="">DINO MASTER</h1>
        <h4>The realest Dino Quiz you can find. </h4>
      </header>
      <section className="contentSection">
        <h2 className="alert">{alert}</h2>
        <h3>Choose Time Period </h3>
        <div className="choiceContainer">
          {periodOptions.map((option, id) => (
            <button
              value={option}
              key={id}
              onClick={choosePeriod}
              className={`choiceButton ${option === period ? "blue" : "black"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <h3>Choose Number of Questions </h3>
        <div className="choiceContainer">
          {questionNumberOptions.map((option, id) => (
            <button
              value={option}
              key={id}
              onClick={chooseQuestions}
              className={`choiceButton ${option === noQns ? "blue" : "black"}`}
            >
              {option}
            </button>
          ))}
        </div>
        <h3>Choose Difficulty </h3>
        <div className="choiceContainer">
          {difficultyOptions.map((option, id) => (
            <button
              value={option}
              key={id}
              onClick={chooseDifficulty}
              className={`choiceButton ${
                option === difficulty ? "blue" : "black"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        <button onClick={getReady} className="button">
          Start
        </button>
      </section>
    </body>
    // </>
  );
}

export default Home;
