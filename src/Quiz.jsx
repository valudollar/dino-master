import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dinos } from "./dinos.js";
import { dinodb } from "./dinodb.js";
import { typeops } from "./data/options/types.js";
import { locationops } from "./data/options/locations.js";
import { VscDebugRestart } from "react-icons/vsc";
import { periodops } from "./data/options/periods.js";
import "./App.css";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  let data = dinodb;
  const peds = periodops;
  const types = typeops;
  const locs = locationops;
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [qnoptions, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(location.state.diff);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  // const [correct, setCorrect] = useState(-1);
  const [answerResult, setanswerResult] = useState("");
  const [period, setPeriod] = useState(location.state.time);
  const [totalQns, setTotalQns] = useState(parseInt(location.state.number));
  const [currentQnNumber, setcurrentQnNumber] = useState(1);
  const [dinoset, setDinoSet] = useState([]);

  //process data functions
  function getAllSizes() {
    let sizes = [];
    for (let i = 0; i < data.length; i++) {
      const dinosaur = data[i];
      let values = Object.values(dinosaur);
      const size = values[6];
      // console.log(size, "hello");
      if (sizes.includes(size)) {
      } else sizes.push(size);
    }
    console.log(sizes);
  }

  function processDinoset() {
    processLocation();
    const periodset = processPeriod();
    const finalset = processDifficulty(periodset);
    return finalset;
  }
  function processLocation() {
    let allLocations = [];
    for (let i = 0; i < data.length; i++) {
      const dinosaur = data[i];
      const locations = dinosaur.location.split(",");
      const trimArray = locations.map((element) => {
        return element.trim();
      });

      for (let i = 0; i < trimArray.length; i++) {
        const location = trimArray[i];
        if (allLocations.includes(location)) {
        } else allLocations.push(location);
      }
      dinosaur.location = trimArray;
    }
  }

  function processPeriod() {
    const triassic = [];
    const jurassic = [];
    const cretaceous = [];
    for (let i = 0; i < data.length; i++) {
      const dinosaur = data[i];
      if (dinosaur.period === "Triassic") {
        triassic.push(dinosaur);
      } else if (dinosaur.period === "Early Jurassic" || "Late Jurassic") {
        jurassic.push(dinosaur);
      } else if (dinosaur.period === "Cretaceous") {
        cretaceous.push(dinosaur);
      }
    }
    if (period === "Triassic") {
      return triassic;
    } else if (period === "Jurassic") {
      return jurassic;
    } else if (period === "Cretaceous") {
      return cretaceous;
    } else if (period === "All") {
      return data;
    }
  }

  function processDifficulty(array) {
    let finalset = [];
    for (let i = 0; i < array.length; i++) {
      const dinosaur = array[i];
      if (difficulty === "Easy") {
        if (dinosaur.difficulty === "Easy") {
          finalset.push(dinosaur);
        }
      } else if (difficulty === "Normal") {
        if (
          dinosaur.difficulty === "Easy" ||
          dinosaur.difficulty === "Normal"
        ) {
          finalset.push(dinosaur);
        }
      } else if (difficulty === "Hard") {
        finalset.push(dinosaur);
      }
    }
    console.log(finalset, "check set");
    return finalset;
  }

  function getDino(obj) {
    const random = Math.floor(Math.random() * obj.length);
    const dino = obj[random];
    return dino;
  }

  function getQuestionData(obj) {
    let keys = Object.keys(obj);
    const nameProp = keys.shift();
    let values = Object.values(obj);
    const name = values.shift();
    let random = 0;
    let keyIndexes = 0;
    if (difficulty === "Easy") {
      keyIndexes = 4;
    } else if (difficulty === "Normal") {
      keyIndexes = 5;
    } else if (difficulty === "Hard") {
      keyIndexes = 6;
    }

    if (period !== "All") {
      random = excludePeriod(keyIndexes);
    } else {
      random = Math.floor(Math.random() * keyIndexes);
    }
    const property = keys[random];
    const value = values[random];
    setAnswer(value);
    return { name: name, topic: property, answer: value };
  }

  function excludePeriod(keys) {
    const num = Math.floor(Math.random() * keys);
    return num === 3 || num === 6 ? excludePeriod(keys) : num;
  }

  function writeQuestion(questiondata) {
    const topic = questiondata.topic;
    const name = questiondata.name;
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

  function generateSizeOptions(correctsize) {
    const number = parseFloat(correctsize.slice(0, -1));
    const options = [
      number + "m",
      number * 5 + "m",
      number * 2 + "m",
      number * 10 + "m",
      (number / 2).toFixed(1) + "m",
      (number / 10).toFixed(1) + "m",
    ];
    return options;
  }

  function writeOption(questiondata) {
    const answer = questiondata.answer;
    const topic = questiondata.topic;
    let options = [];
    if (topic === "period") {
      options = [...peds];
    } else if (topic === "type") {
      options = [...types];
    } else if (topic === "diet") {
      options = ["Plants", "Fish", "Insects", "Meat", "Omnivorous"];
    } else if (topic === "size") {
      options = generateSizeOptions(answer);
    } else if (topic === "location") {
      options = locs;
    } else {
      options = data.map((a) => a[topic]);
    }
    if (topic === "location") {
      for (let i = 0; i < options.length; i++) {
        const item = options[i];
        if (answer.includes(item)) {
          options.splice(i, 1);
        } else {
        }
      }

      shuffle(options);
      options = options.slice(0, 3);
      const randInd = Math.floor(Math.random() * answer.length);
      const oneAns = answer[randInd];
      setAnswer(oneAns);
      options.push(oneAns);
      shuffle(options);
      setOptions(options);
    } else {
      const ansIndex = options.indexOf(answer);
      options.splice(ansIndex, 1);
      shuffle(options);
      options = options.slice(0, 3);
      options.push(answer);
      shuffle(options);
      setOptions(options);
    }
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
      setanswerResult("Correct!");

      setScore(score + 1);
    } else {
      setanswerResult("Wrong! The answer is " + answer + "!");
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
    const dino = getDino(dinoset);
    const qnData = getQuestionData(dino);
    writeQuestion(qnData);
    writeOption(qnData);
    setAnswered(false);
    setanswerResult("");
    // setCorrect(false);
  }
  useEffect(() => {
    const set = processDinoset();
    setDinoSet(set);
    const dino = getDino(set);
    const qnData = getQuestionData(dino);
    writeQuestion(qnData);
    writeOption(qnData);
  }, []);

  return (
    <>
      <header className="">
        <h1>DINO MASTER</h1>
      </header>
      <section className="contentSection">
        <div className="settingInfoContainer">
          <p className="period">Period: {period}</p>
          <p className="difficulty">Difficulty: {difficulty}</p>
        </div>
        <div className="settingInfoContainer">
          <p className="score"> Score: {score} </p>{" "}
          <a href="/">
            <button className="restart">
              <VscDebugRestart />
            </button>
          </a>
        </div>
        <p>
          Question {currentQnNumber} out of {totalQns}{" "}
        </p>
        <h3 className="question"> {question}</h3>
        <h3 className="answerResult">{answerResult}</h3>
        <div className="answerContainer">
          {qnoptions.map((option, id) => (
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
