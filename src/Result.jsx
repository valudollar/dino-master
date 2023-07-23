import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import stego from "./assets/stego.gif";
import trike from "./assets/trike.gif";
import pete from "./assets/pete.gif";

function Result() {
  const location = useLocation();
  const [finalScore, setfinalScore] = useState(parseInt(location.state.score));
  const [totalQns, setTotalQns] = useState(parseInt(location.state.totqn));
  const [percent, setPercent] = useState(0);
  const [comment, setComment] = useState("");
  const [title, setTitle] = useState("");
  const [src, setSrc] = useState("");

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
      setSrc(trike);
    } else if (result < 100 && result > 80) {
      setComment("Aw, you almost made it!");
      setTitle("Dino Expert");
      setSrc(trike);
    } else if (result <= 80 && result > 50) {
      setComment("Not bad, but how many were guesses?");
      setTitle("Dino Apprentice");
      setSrc(trike);
    } else if (result <= 50 && result > 0) {
      setComment("Did you even try...?");
      setTitle("Dino Noob");
      setSrc(trike);
    } else if (result === 0) {
      setComment("Damn...");
      setTitle("Just an idiot");
      setSrc(stego);
    }
    console.log(comment);
    console.log(title);
  }

  useEffect(() => {
    getPercentScore();
  }, []);

  return (
    <>
      <body>
        <header className="">
          <h1>DINO MASTER</h1>
        </header>
        <section className="resultSection">
          <h2>
            Your final score is {finalScore} out of {totalQns}
          </h2>
          <h3>You got {percent}% of the questions correct!</h3>
          <h2>{comment}</h2>
          <h3>Title: {title}</h3>
          <img className="titlecontainer" src={src}></img>
          <a href="/">
            <button className="button">Try Again</button>
          </a>
        </section>
      </body>
    </>
  );
}

export default Result;
