import React from "react";
import {
  Video,
  Sparkles,
  Zap,
  Wand2,
  Rocket,
  Brain,
  Layers,
  ArrowRight,
  PlayCircle,
  Sun,
  Moon,
} from "lucide-react";
import {  useNavigate } from "react-router-dom";
import "../assets/style/LandingPage.css";
import { useTheme } from "../context/ThemeContext";
import { IMAGES } from "../utils/constants";

const LandingPage = () => {
  const navigate = useNavigate();
  const { toggleTheme, theme } = useTheme();

  return (
    <div className="landing-container">
      <header className="landing-page-header">
        <div className="landing-page-header-inner">
          <div className="landing-page-logo">
            <div className="landing-page-logo-icon icon">
              <img src={IMAGES.SiteLogo} alt="" />
            </div>
            <span className="landing-page-logo-text">Hustle Ai</span>
          </div>

          <div className="landing-page-header-actions">
            <button
              onClick={toggleTheme}
              className="landing-page-icon-btn icon"
            >
              {theme === "dark" ? (
                <Sun className="landing-page-icon" />
              ) : (
                <Moon className="landing-page-icon" />
              )}
            </button>
            <button
              onClick={() => navigate("/sign-in")}
              className="landing-page-btn landing-page-btn-ghost"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/sign-up")}
              className="landing-page-btn landing-page-btn-primary"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-badge">
            <Sparkles size={16} /> AI Video Creation Platform
          </div>

          <h1 className="hero-title">
            Turn Ideas Into <span>Viral AI Videos</span>
          </h1>

          <p className="hero-subtitle">
            Hustle AI Studio helps creators generate scripts, scenes,
            voiceovers, and full videos using powerful AI models in seconds.
          </p>

          <div className="hero-buttons">
            <button
              className="btn-primary"
              onClick={() => navigate("/sign-up")}
            >
              Start Creating
              <span className="icon">
                <ArrowRight size={18} />
              </span>
            </button>

            <button
              className="btn-outline"
              onClick={() => navigate("/watch-demo")}
            >
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="section-header">
          <h2>Everything You Need To Create AI Videos</h2>
          <p>
            From idea to final video — Hustle AI Studio automates the entire
            process.
          </p>
        </div>

        <div className="feature-grid">
          <div className="feature-card">
            <Brain size={28} />
            <h3>AI Script Generator</h3>
            <p>
              Generate viral video scripts automatically from just one prompt.
            </p>
          </div>

          <div className="feature-card">
            <Video size={28} />
            <h3>AI Video Generation</h3>
            <p>Create cinematic video scenes using advanced AI models.</p>
          </div>

          <div className="feature-card">
            <Wand2 size={28} />
            <h3>Auto Scene Creation</h3>
            <p>AI splits your script into scenes with perfect timestamps.</p>
          </div>

          <div className="feature-card">
            <Layers size={28} />
            <h3>Clip Merging</h3>
            <p>Automatically combine AI clips into a complete video.</p>
          </div>

          <div className="feature-card">
            <Zap size={28} />
            <h3>Lightning Fast</h3>
            <p>Generate full videos in minutes instead of hours.</p>
          </div>

          <div className="feature-card">
            <Rocket size={28} />
            <h3>Content For All Platforms</h3>
            <p>Perfect for YouTube Shorts, TikTok, Instagram Reels and more.</p>
          </div>
        </div>
      </section>
      <section className="workflow">
        <div className="section-header">
          <h2>How Hustle AI Studio Works</h2>
          <p>3 simple steps to generate professional videos</p>
        </div>

        <div className="workflow-grid">
          <div className="workflow-step">
            <span>1</span>
            <h3>Enter Your Idea</h3>
            <p>Describe your video idea or business concept.</p>
          </div>

          <div className="workflow-step">
            <span>2</span>
            <h3>AI Generates Scenes</h3>
            <p>Script, timestamps, and video clips are generated.</p>
          </div>

          <div className="workflow-step">
            <span>3</span>
            <h3>Export Final Video</h3>
            <p>Download or publish your complete AI video.</p>
          </div>
        </div>
      </section>
      <section className="cta">
        <h2>Start Creating AI Videos Today</h2>
        <p>
          Join creators and entrepreneurs using Hustle AI Studio to scale their
          content.
        </p>
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <button className="btn-primary" onClick={() => navigate("/sign-up")}>
            Get Started
            <span className="icon">
              <ArrowRight size={18} />
            </span>
          </button>
        </div>
      </section>
      <footer className="landing-page-footer">
        © {new Date().getFullYear()} Hustle. All rights reserved.
      </footer>
    </div>
  );
};

export default LandingPage;
