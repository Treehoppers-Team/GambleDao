import React from "react";

const BgVideo = () => {
  return (
    <video autoPlay loop muted>
      <source src="/Background.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};

export default BgVideo;
