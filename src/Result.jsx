import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

function Result() {
  const location = useLocation();
  const [finalScore, setfinalScore] = useState(parseInt(location.state.score));
  const [totalQns, setTotalQns] = useState(parseInt(location.state.totqn));
  const [percent, setPercent] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");

  function getPercentScore() {
    const dec = (finalScore * 100) / totalQns;
    const result = dec.toFixed();
    setPercent(result);
    giveResult(result);
  }
  function giveResult(number) {
    const result = parseInt(number);
    if (result === 100) {
      setComment("You are worthy...");
      setTitle("Legendary Dino Master");
    } else if (result < 100 && result > 80) {
      setComment("Aw, you almost made it!");
      setTitle("Dino Expert");
    } else if (result <= 80 && result > 50) {
      setComment("Not bad, but how many were guesses?");
      setTitle("Dino Novice");
    } else if (result <= 50 && result > 0) {
      setComment("Did you even try...?");
      setTitle("Dino Noob");
    } else if (result === 0) {
      setComment("Damn...");
      setTitle("Just an idiot");
    }
    console.log(comment);
    console.log(title);
  }

  useEffect(() => {
    getPercentScore();
  }, []);

  return (
    <>
      <header className="">
        <h1>DINO MASTER</h1>
      </header>
      <section>
        <h4>
          Your final score is {finalScore} out of {totalQns}
        </h4>
        <h4>You got {percent}% of the questions correct!</h4>
        <h4>{comment}</h4>
        <h4>Title: {title}</h4>
        <a href="/">
          <button className="button">Try Again</button>
        </a>
      </section>
    </>
  );
}

export default Result;
