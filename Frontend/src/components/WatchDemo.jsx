import React from "react";
import { IMAGES } from "../utils/constants";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

const WatchDemo = () => {
const navigate = useNavigate();

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
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginTop:"8px"
              }}
            >
              <button
                className="btn-primary"
                onClick={() => navigate("/sign-up")}
              >
                Get Started
                <span className="icon">
                  <ArrowRight size={18} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WatchDemo;
