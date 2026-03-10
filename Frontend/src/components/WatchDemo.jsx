import React from "react";
import { IMAGES } from "../utils/constants";

const WatchDemo = () => {
  return (
    <section className="watch-demo-section">
      <div className="watch-demo-container">
        <div className="watch-demo-card">
          <div className="watch-demo-video-wrapper">
            <video
              className="watch-demo-video"
              src={IMAGES.WatchDemo}
              controls
              poster="/video-preview.jpg"
            />
          </div>

          <div className="watch-demo-content">
            <h2 className="watch-demo-title">Watch How It Works</h2>
            <p className="watch-demo-description">
              See how our platform helps you create stunning content in seconds.
              Watch this quick demo to understand the workflow and features.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchDemo;
