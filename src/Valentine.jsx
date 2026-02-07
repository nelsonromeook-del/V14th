import { useState } from "react";
import "./Valentine.css";

export default function Valentine() {
  const [opened, setOpened] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dark, setDark] = useState(false);

  const handleOpen = () => {
    setOpened(true);
    setShowQuestion(true);

    const music = document.getElementById("bgMusic");
    music && music.play();
  };

  const handleYes = () => {
    setShowQuestion(false);
    setShowPopup(true);
    startHearts();

    if (navigator.vibrate) {
      navigator.vibrate([200, 100, 200]);
    }
  };

  const moveNo = (e) => {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 80 - 40;
    e.target.style.transform = `translate(${x}px, ${y}px)`;
  };

  const startHearts = () => {
    setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      heart.style.animationDuration = 3 + Math.random() * 3 + "s";
      document.body.appendChild(heart);

      setTimeout(() => heart.remove(), 6000);
    }, 300);
  };

  return (
    <div className={`valentine ${dark ? "dark" : ""}`}>
      <div className="container">
        <h1>Tap the Envelope 💌</h1>

        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          🌙 Dark Mode
        </button>

        <div className="envelope" onClick={handleOpen}>
          {opened && (
            <div className="letter">
              Hey <strong>My Love 💕</strong>
              <br /><br />
              I’ve been meaning to ask you something special…
            </div>
          )}
        </div>

        {showQuestion && (
          <div className="question">
            <p>Will you be my Valentine? 💖</p>
            <div className="buttons">
              <button className="yes" onClick={handleYes}>
                Yes ❤️
              </button>
              <button className="no" onClick={moveNo}>
                No 💔
              </button>
            </div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="overlay">
          <div className="popup">
            <h2>It’s a YES 💖</h2>
            <p>You just made someone very happy 🥹💞</p>
          </div>
        </div>
      )}

      <audio id="bgMusic" loop>
        <source
          src="https://cdn.pixabay.com/download/audio/2022/03/15/audio_2c8c3b0c7c.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
