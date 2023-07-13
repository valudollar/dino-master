import { useLocation, useNavigate } from "react-router-dom";
import stego from "./assets/stego.gif";

function Home() {
  const navigate = useNavigate();
  function play() {
    navigate("/setting");
  }
  return (
    <body>
      <header className="">
        <h1 className="">DINO MASTER</h1>
        <h4>The realest Dino Quiz you can find. </h4>
      </header>
      <section className="contentSection">
        <h3>
          You think you know dinosaurs?
          <br /> Well, you don't.
        </h3>
        <div>
          <img className="gifcontainer" src={stego}></img>
        </div>
        <h3>
          Take the quiz now to find out if you are a Noob, Apprentice, Expert or
          a true Dino Master.
        </h3>
        <div className="badgeContainer">
          <div className="dummyBadge"></div>
          <div className="dummyBadge"></div>
          <div className="dummyBadge"></div>
          <div className="dummyBadge"></div>
        </div>
        <button className="button" onClick={play}>
          Play
        </button>
      </section>
    </body>
  );
}

export default Home;
