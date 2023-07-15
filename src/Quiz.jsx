import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { dinos } from "./dinos.js";
import { dinodb } from "./dinodb.js";
import { VscDebugRestart } from "react-icons/vsc";
import "./App.css";

function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = dinodb;
  const [question, setQuestion] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const [difficulty, setDifficulty] = useState(location.state.diff);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [correct, setCorrect] = useState(-1);
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
        console.log("already included");
      } else sizes.push(size);
    }
    console.log(sizes);
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
          console.log("already included");
        } else allLocations.push(location);
      }
      dinosaur.location = trimArray;
    }
  }

  function getDinoSet() {
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
    console.log("values", value);
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
    } else if (topic === "size") {
      //optimise by using a fn to generate similar answers
      options = [
        "1.5m",
        "3m",
        "1m",
        "15m",
        "4m",
        "60cm",
        "30cm",
        "5m",
        "2m",
        "8m",
        "5.5m",
        "1.2m",
        "2.7m",
        "2.4m",
        "6.5m",
        "9-12m",
        "9m",
        "11m",
        "10m",
        "6m",
        "7m",
        "3.5m",
        "1.4m",
        "1.75m",
        "2.5m",
        "9.8m",
        "18m",
        "4.3m",
        "21m",
        "14m",
        "13m",
      ];
    } else if (topic === "location") {
      options = [
        "Italy",
        "Germany",
        "China",
        "Timor",
        "Indonesia",
        "Canada",
        "USA",
        "Norway",
        "Japan",
        "Europe",
        "North Africa",
        "Russia",
        "Romania",
        "Switzerland",
        "Spain",
        "France",
        "Kyrgyzstan",
        "Argentina",
        "Brazil",
        "South Africa",
        "England",
        "Wales",
        "Lesotho",
        "Zimbabwe",
        "Thailand",
        "North America",
        "India",
        "Antartica",
        "Namibia",
        "Portugal",
        "Australia",
        "Mongolia",
        "Morocco",
      ];
    } else {
      options = data.map((a) => a[topic]);
    }
    if (topic === "location") {
      console.log(answer, "list of locs");
      console.log(options, "see all");
      for (let i = 0; i < options.length; i++) {
        const item = options[i];
        if (answer.includes(item)) {
          console.log("one of the answers");
          options.splice(i, 1);
        } else {
          console.log("not an answer");
        }
      }
      console.log(options, "see leftover options");
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
    const dino = getDino(dinoset);
    const qnData = getQuestionData(dino);
    writeQuestion(qnData);
    writeOption(qnData);
    setAnswered(false);
    // setCorrect(false);
  }
  useEffect(() => {
    // processLocation();
    console.log(data, "hello");
    const set = getDinoSet();
    console.log(set, "hello");
    setDinoSet(set);
    const dino = getDino(set);
    console.log(dino, "hello");
    const qnData = getQuestionData(dino);

    writeQuestion(qnData);
    writeOption(qnData);
  }, []);

  return (
    <body>
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
  );
}

export default Quiz;
