import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dinos } from "./dinos.js";
import "./App.css";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();

  const data = dinos;
  console.log(data, "hello");

  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [correct, setCorrect] = useState(-1);
  const [totalQns, setTotalQns] = useState(parseInt(location.state));
  const [currentQnNumber, setcurrentQnNumber] = useState(1);

  function getDino() {
    const random = Math.floor(Math.random() * data.length);
    const dino = data[random];
    return dino;
  }

  function getQuestionData(obj) {
    let keys = Object.keys(obj);
    const nameProp = keys.shift();
    let values = Object.values(obj);
    const name = values.shift();
    const random = Math.floor(Math.random() * keys.length);
    const property = keys[random];
    const value = values[random];
    setAnswer(value);
    return { name: name, topic: property, answer: value };
  }

  function writeQuestion(questiondata) {
    const topic = questiondata.topic;
    const name = questiondata.name;

    // const answer = questiondata.answer
    if (topic === "period") {
      setQuestion("What " + topic + " does the " + name + " belong to?");
    } else if (topic === "meaning") {
      setQuestion("What does " + name + " mean?");
    } else if (topic === "group") {
      setQuestion("What " + topic + " does the " + name + " belong to?");
    } else if (topic === "scientific_name") {
      setQuestion("What is the scientific name of the " + name + " ?");
    }
  }

  function writeOption(questiondata) {
    const answer = questiondata.answer;
    const topic = questiondata.topic;
    let options = [];
    if (topic === "period") {
      options = [
        "Late Jurassic",
        "Early Jurassic",
        "Late Cretaceous",
        "Early Cretaceous",
        "Late Triassic",
        "Early Triassic",
      ];
    } else if (topic === "group") {
      options = ["Therapod", "Ankylosaurid", "Sauropod", "Stegosaurid"];
    } else {
      options = data.map((a) => a[topic]);
    }

    const ansIndex = options.indexOf(answer);
    options.splice(ansIndex, 1);
    shuffle(options);
    options = options.slice(0, 3);
    options.push(answer);
    shuffle(options);
    setOptions(options);
  }

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function checkCorrect(e) {
    const value = e.target.value;
    setSelectedOption(value);
    setAnswered(true);
    if (value === answer) {
      console.log("correct!");
      //   setCorrect(true);

      setScore(score + 1);
    } else {
      console.log("wrong!");
      //   setCorrect(false);
    }
  }

  function proceed() {
    if (currentQnNumber === totalQns) {
      setCompleted(true);
    } else {
      nextQuestion();
    }
  }
  useEffect(() => {
    if (completed === true) {
      endQuiz();
    }
  }, [completed]);

  function endQuiz() {
    console.log("last question");
    navigate("/result", { state: { score: score, totqn: totalQns } });
  }

  function nextQuestion() {
    setcurrentQnNumber(currentQnNumber + 1);
    const dino = getDino();
    const qnData = getQuestionData(dino);
    writeQuestion(qnData);
    writeOption(qnData);
    setAnswered(false);
    // setCorrect(false);
  }
  useEffect(() => {
    const dino = getDino();
    const qnData = getQuestionData(dino);
    writeQuestion(qnData);
    writeOption(qnData);
  }, []);

  return (
    <>
      <header className="">
        <h1>DINO MASTER</h1>
      </header>
      <section>
        <p>
          Question {currentQnNumber} out of {totalQns}{" "}
        </p>
        <p> Score: {score} </p>
        <p> {question}</p>
        <div className="answerContainer">
          {options.map((option, id) => (
            <button
              onClick={checkCorrect}
              //   className={`answerButton ${
              //     correct !== -1 && option === answer && answered === true
              //       ? correct
              //         ? "green"
              //         : "red"
              //       : ""
              //   }`}
              className={`answerButton ${
                answered && option === selectedOption
                  ? option === answer
                    ? "green"
                    : "red"
                  : ""
              }`}
              value={option}
              key={id}
              disabled={answered}
            >
              {option}
            </button>
          ))}
        </div>
        <button className="button" onClick={proceed}>
          Next
        </button>
      </section>
    </>
  );
}

export default Quiz;
