import React, { useEffect, useState } from "react";
import "../assets/style/GenrateVideo.css";
import { LongHover, Selector } from "../components/CustomComponents";
import { toast } from "sonner";
import { VideoPlayer } from "../components/VideoPlayer";
import { videoDataDemo } from "../services/demo.serveces";
import { Download, Share2 } from "lucide-react";
import Loader from "../components/Loader";
import { IMAGES } from "../utils/constants";
import { useOutletContext } from "react-router";

const styles = [
  {
    name: "Realistic",
    img: IMAGES.RealisticStyle,
  },
  {
    name: "Cartoon",
    img: IMAGES.CartoonStyle,
  },
  {
    name: "Comic",
    img: IMAGES.ComicStyle,
  },
  {
    name: "WaterColor",
    img: IMAGES.WaterColorStyle,
  },
  {
    name: "GTA",
    img: IMAGES.GTAStyle,
  },
];

const GenrateVideo = () => {
  const { setValue } = useOutletContext();
  const [pageType, setPageType] = useState("form");
  const [topicType, setTopicType] = useState("motivational");
  const [topic, setTopic] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("");
  const [duration, setDuration] = useState("");
  const [language, setLanguage] = useState("");
  const [videoData, setVideoData] = useState(videoDataDemo || null);


  useEffect(() => {
    setValue("Create New");
  }, []);

  const validation = () => {
    if (topicType === "" && topic.trim() === "") {
      toast.error("prompt is required.");
      return false;
    }
    if (selectedStyle.trim() === "") {
      toast.error("select style of video.");
      return false;
    }
    if (duration.trim() === "") {
      toast.error("select duration of video.");
      return false;
    }
    if (language.trim() === "") {
      toast.error("select language of video.");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validation()) return;
    setPageType("loading");
    setTimeout(() => {
      setPageType("videoPreview");
    }, 3000);
  };

  const handleShare = () => {};
  const handleDownload = () => {};

  return (
    <div className="short-container">
      {pageType === "loading" ? (
        <LoadingVideo />
      ) : pageType === "videoPreview" ? (
        <>
          <VideoPlayer videoData={videoData} />
          <div className="video-preview-actions">
            <button
              onClick={handleShare}
              className="video-preview-action share"
            >
              <span className="icon">
                <Share2 size={18} />
              </span>
              Share
            </button>{" "}
            <button
              onClick={handleDownload}
              className="video-preview-action download"
            >
              <span className="icon">
                <Download size={18} />
              </span>
              Download
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="section">
            <h2 className="section-title">Content</h2>
            <label className="section-label">
              What is the topic of your video?
            </label>
            <Selector
              filter={topicType}
              setFilter={setTopicType}
              options={[
                { label: "Custom content", filter: "" },
                { label: "Motivational", filter: "motivational" },
                { label: "Education", filter: "education" },
                { label: "Business", filter: "business" },
              ]}
            />
            {topicType === "" && (
              <textarea
                style={{ marginTop: "7px" }}
                value={topic}
                className="textarea"
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Write prompt on which you want to generate video"
              />
            )}
          </div>

          <div className="section">
            <h2 className="section-title">Style</h2>
            <label className="section-label">Select your video style</label>

            <div className="style-grid">
              {styles.map((style, index) => (
                <div
                  key={index}
                  className={`style-card ${
                    selectedStyle === style.name ? "active-style" : ""
                  }`}
                  onClick={() => setSelectedStyle(style.name)}
                >
                  <img src={style.img} alt={style.name} />
                  <div className="style-name">{style.name}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section">
            <h2 className="section-title">Duration</h2>
            <label className="section-label">
              Select the duration of your video
            </label>
            <Selector
              filter={duration}
              setFilter={setDuration}
              options={[
                { label: "Select Duration", filter: "", disabled: true },
                { label: "15 Seconds", filter: "15" },
                { label: "30 Seconds", filter: "30" },
                { label: "60 Seconds", filter: "60" },
              ]}
            />
          </div>

          <div className="section">
            <h2 className="section-title">Language</h2>
            <label className="section-label">
              Select the language of your video
            </label>
            <Selector
              filter={language}
              setFilter={setLanguage}
              options={[
                { label: "Select Language", filter: "", disabled: true },
                { label: "English", filter: "en" },
                { label: "Spanish", filter: "es" },
                { label: "French", filter: "fr" },
                { label: "German", filter: "de" },
                { label: "Italian", filter: "it" },
                { label: "Portuguese", filter: "pt" },
                { label: "Hindi", filter: "hi" },
                { label: "Arabic", filter: "ar" },
                { label: "Japanese", filter: "ja" },
                { label: "Korean", filter: "ko" },
                { label: "Chinese", filter: "zh" },
                { label: "Russian", filter: "ru" },
                { label: "Turkish", filter: "tr" },
                { label: "Dutch", filter: "nl" },
              ]}
            />
          </div>
          <LongHover text={"Submit button"}>
            <button onClick={handleSubmit} className="create-btn">
              Create Short Video
            </button>
          </LongHover>
        </>
      )}
    </div>
  );
};

export default GenrateVideo;

const LoadingVideo = () => {
  return (
    <div className="video-loading-container">
      <div className="video-loading-overlay">
        <Loader />
      </div>
    </div>
  );
};
