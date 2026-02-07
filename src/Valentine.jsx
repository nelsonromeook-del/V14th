import { useState, useRef, useEffect } from "react";
import "./Valentine.css";

export default function Valentine() {
  const [opened, setOpened] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [dark, setDark] = useState(false);

  const audioRef = useRef(null);
  const heartInterval = useRef(null);
  const petalInterval = useRef(null);

  const handleOpen = () => {
    if (opened) return;

    setOpened(true);
    setShowQuestion(true);

    if (audioRef.current) {
      audioRef.current.volume = 0.6;
      audioRef.current.play().catch(() => {});
    }

    startHearts();
    startPetals();
  };

  const handleYes = () => {
    setShowQuestion(false);
    setShowPopup(true);
    if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
  };

  const moveNo = (e) => {
    const x = Math.random() * 150 - 75;
    const y = Math.random() * 80 - 40;
    e.target.style.transform = `translate(${x}px, ${y}px)`;
  };

  const startHearts = () => {
    if (heartInterval.current) return;

    heartInterval.current = setInterval(() => {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.innerText = "❤️";
      heart.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 6000);
    }, 300);
  };

  const startPetals = () => {
    if (petalInterval.current) return;

    petalInterval.current = setInterval(() => {
      const petal = document.createElement("div");
      petal.className = "petal";
      petal.innerText = "🌹";
      petal.style.left = Math.random() * 100 + "vw";
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 7000);
    }, 400);
  };

  useEffect(() => {
    return () => {
      clearInterval(heartInterval.current);
      clearInterval(petalInterval.current);
    };
  }, []);

  return (
    <div className={`valentine ${dark ? "dark" : ""}`}>
      <div className="container">
        <h1>Tap the Envelope 💌</h1>

        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          🌙 Dark Mode
        </button>

        <button
          className="dark-toggle"
          onClick={() =>
            audioRef.current?.paused
              ? audioRef.current.play()
              : audioRef.current.pause()
          }
        >
          🎶 Music
        </button>

        <div className="envelope-container" onClick={handleOpen}>
          <div className={`envelope ${opened ? "open" : ""}`}>
            <div className="envelope-front"></div>
            <div className="envelope-back"></div>

            {opened && (
              <div className="letter">
                <div className="letter-content fade-in">
                  <p>Hey My Love 💕</p>
                  <p>I’ve been meaning to ask you something special…</p>
                  <p>Will you be my Valentine?</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {showQuestion && (
          <div className="question">
            <p>Will you be my Valentine? 💖</p>
            <div className="buttons">
              <button className="yes" onClick={handleYes}>
                Yes ❤️
              </button>
              <button className="no" onMouseEnter={moveNo}>
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

      <audio ref={audioRef} loop>
        <source
          src="https://cdn.pixabay.com/download/audio/2023/02/28/audio_7d4c95c5e0.mp3"
          type="audio/mpeg"
        />
      </audio>
    </div>
  );
}
