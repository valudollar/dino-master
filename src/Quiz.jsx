import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dinos } from "./dinos.js";
import { dinodb } from "./dinodb.js";
import "./App.css";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const data = dinodb;

  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [correct, setCorrect] = useState(-1);
  const [period, setPeriod] = useState(location.state.time);
  const [totalQns, setTotalQns] = useState(parseInt(location.state.number));
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
      setQuestion("What period does the " + name + " belong to?");
    } else if (topic === "meaning") {
      setQuestion("What does " + name + " mean?");
    } else if (topic === "type") {
      setQuestion("What group does the " + name + " belong to?");
    } else if (topic === "size") {
      setQuestion("How big was the " + name + "?");
    } else if (topic === "location") {
      setQuestion("Where could the " + name + " be found?");
    } else if (topic === "diet") {
      setQuestion("What type of diet did the " + name + " have?");
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
        "Triassic",
      ];
    } else if (topic === "type") {
      options = [
        "Therapods",
        "Ankylosaurids",
        "Sauropods",
        "Stegosaurids",
        "Placodonts",
        "Prosauropods",
        "Sauropodomorphs",
        "Plesiosaurs",
        "Ichthyosaurs",
        "Pterosaurs",
        "Ornithopods",
        "Nothosaurs",
        "Thyreophora",
      ];
    } else if (topic === "diet") {
      options = ["Plants", "Fish", "Insects", "Meat", "Omnivorous"];
    }
    // else if (topic === "size") {
    //   //change to function to manipulate number
    // } else if (topic === "location") {
    //   //change to locations properly
    // }
    else {
      options = data.map((a) => a[topic]);
    }

    const ansIndex = options.indexOf(answer);
    console.log(options, "check 1");
    options.splice(ansIndex, 1);
    console.log(options, "check 2");
    shuffle(options);
    options = options.slice(0, 3);
    console.log(options, "check 3");
    options.push(answer);
    console.log(options, "check 3");
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
    // <>
    <body>
      <header className="">
        <h1>DINO MASTER</h1>
      </header>
      <section className="contentSection">
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
    </body>
    // </>
  );
}

export default Quiz;
