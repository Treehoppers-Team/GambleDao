import React from "react";

const Play = () => {
  const handlePlayNowClick = () => {
    window.open("https://weather-quest.vercel.app/", "_blank");
  };

  return (
    <div>
      <div className="title">
        Play featured games to&nbsp;
        <span className="greenTinge">earn</span>
        &nbsp;GTK
      </div>
      <div className="container">
        <img
          src="/WeatherQuest.png"
          alt="WeatherQuest"
          style={{ maxHeight: "70vh", width: "auto", objectFit: "contain" }}
        />
        <button className="normalButton" onClick={handlePlayNowClick}>Play Now</button>
      </div>
    </div>
  );
};

export default Play;
