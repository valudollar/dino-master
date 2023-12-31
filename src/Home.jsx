import { useLocation, useNavigate } from "react-router-dom";
import stego from "./assets/stego.gif";
import trike from "./assets/trike.gif";
import pete from "./assets/pete.gif";

function Home() {
  const navigate = useNavigate();
  function play() {
    navigate("/setting");
  }
  return (
    <>
      <header className="">
        <h1 className="">DINO MASTER</h1>
        <h4>The realest Dino Quiz you can find. </h4>
      </header>
      <section className="contentSection">
        <h3 className="homeText">
          You think you know dinosaurs?
          <br /> Well, you don't.
        </h3>
        <div>
          <img className="gifcontainer" src={stego}></img>
        </div>
        <h3 className="homeText">
          Take the quiz now to find out if you are a Noob, Apprentice, Expert or
          a true Dino Master.
        </h3>
        <div className="badgeContainer">
          <div>
            <img className="gifcontainer" src={trike}></img>
            <h3 className="badgeText">NOOB</h3>
          </div>
          <div>
            <img className="gifcontainer" src={trike}></img>
            <h3 className="badgeText">APPRENTICE</h3>
          </div>
          <div>
            <img className="gifcontainer" src={pete}></img>
            <h3 className="badgeText">EXPERT</h3>
          </div>
          <div>
            <img className="gifcontainer" src={trike}></img>
            <h3 className="badgeText">MASTER</h3>
          </div>
        </div>
        <button className="button" onClick={play}>
          Play
        </button>
      </section>
    </>
  );
}

export default Home;
