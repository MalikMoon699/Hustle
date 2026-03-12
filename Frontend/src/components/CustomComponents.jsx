import { useEffect, useRef, useState } from "react";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  Eye,
  EyeClosed,
  Search,
  XCircle,
} from "lucide-react";
import "../assets/style/CustomComponents.css";
import Loader from "./Loader";


export const Selector = ({
  disabled = false,
  filter,
  setFilter,
  options,
  position = "right",
  style = {},
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const selectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const selectedOption = options?.find((option) => option.filter === filter);

  return (
    <div
      ref={selectorRef}
      onClick={() => setIsFilterOpen(!isFilterOpen)}
      disabled={disabled}
      style={style}
      className={`custom-filter-container ${disabled ? "disabled" : ""}`}
    >
      <div className="custom-filter-selector">
        <div className="custom-filter-selector-title">
          {selectedOption?.label || filter}
        </div>
        <span className="icon">
          {isFilterOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </span>
      </div>
      {isFilterOpen && (
        <div
          className={`custom-filter-selection-container ${
            position === "left" ? "custom-filter-selection-container-left" : ""
          }`}
        >
          {options &&
            options.map((option, index) => {
              const isActive = option?.filter === filter;
              return (
                <button
                  key={index}
                  disabled={isActive || option?.disabled}
                  onClick={() => {
                    setFilter(option?.filter);
                    setIsFilterOpen(false);
                  }}
                  style={{ opacity: option?.disabled ? "0.6" : "" }}
                  className={`custom-filter-item ${isActive ? "active" : ""}`}
                >
                  {isActive && (
                    <span>
                      <Check size={13} />
                    </span>
                  )}
                  {option?.label}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
};

export const LongHover = ({ text, children, delay = 3000 }) => {
  const [show, setShow] = useState(false);
  const timerRef = useRef(null);

  const handleEnter = () => {
    timerRef.current = setTimeout(() => {
      setShow(true);
    }, delay);
  };

  const handleLeave = () => {
    clearTimeout(timerRef.current);
    setShow(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      {children}

      {show && <div className="custom-longhover-tooltip">{text}</div>}
    </div>
  );
};

export const SearchInput = ({
  disabled = false,
  value,
  setValue,
  placeholder = "Search...",
  margin = "",
}) => {
  return (
    <div className="customs-search-box" style={{ margin }}>
      <Search className="customs-search-icon" />
      <input
        disabled={disabled}
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        placeholder={placeholder}
        className="customs-search-input"
      />
    </div>
  );
};

export const VideoCard = ({ title = "", link = "" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    videoRef.current?.play();
  };

  const handlePause = () => {
    videoRef.current?.pause();
  };

  const handleDownload = async () => {
    const res = await fetch(link);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = title ? title.replace(/\s+/g, "_") + ".mp4" : "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className="custom-video-card"
      onClick={() => setIsOpen(true)}
      onMouseEnter={handlePlay}
      onMouseLeave={handlePause}
    >
      {!isLoading && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleDownload();
          }}
          className="custom-video-download"
        >
          <Download size={18} />
        </button>
      )}
      {isLoading && <div className="video-skeleton"></div>}

      <video
        ref={videoRef}
        src={link}
        muted
        playsInline
        controls={false}
        onLoadedData={() => setIsLoading(false)}
        style={{ display: isLoading ? "none" : "block" }}
      />

      <h2 className="custom-video-title">{title}</h2>

      {isOpen && (
        <VideoCardModel title={title} link={link} setIsOpen={setIsOpen} />
      )}
    </div>
  );
};

export const VideoCardModel = ({ title = "", link = "", setIsOpen }) => {
  const videoRef = useRef(null);

  const handleDownload = async () => {
    const res = await fetch(link);
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title ? title.replace(/\s+/g, "_") + ".mp4" : "video.mp4";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  return (
    <div className="model-overlay">
      <div className="model-content">
        <div className="model-header">
          <h3 className="model-header-title">{title || "Video Details"}</h3>
          <button onClick={handleClose} className="model-header-close-btn">
            ×
          </button>
        </div>
        <video
          ref={videoRef}
          src={link}
          controls
          muted
          playsInline
          controlsList="nodownload"
        />
        <div className="video-preview-actions">
          <button onClick={handleClose} className="video-preview-action share">
            <span className="icon">
              <XCircle size={18} />
            </span>
            Cancel
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
      </div>
    </div>
  );
};

export const ProfileImage = ({
  Image = "",
  bg = "var(--primary-hover)",
  borderC = "var(--primary)",
  className = "",
  style = {},
}) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        style={{ border: `2px solid ${borderC}`, ...style }}
        className={`profile-image-container ${className}`}
      >
        <div
          className="profile-image-inner"
          style={{ background: Image ? "" : bg }}
        >
          {Image && !loaded && <div className="profile-image-loader" />}
          {Image && (
            <img
              src={Image}
              alt=""
              onLoad={() => setLoaded(true)}
              onError={() => setLoaded(true)}
              className={loaded ? "loaded" : ""}
            />
          )}
        </div>
      </div>
    </>
  );
};

export const Input = ({
  label = "",
  value = "",
  readOnly = false,
  setValue = "",
  placeholder = "",
  type = "input",
  InputType = "text",
  margin = "6px 0px 8px 0px",
  style = {},
  Icon = "",
  onClick = () => {},
}) => {
  const [show, setShow] = useState(false);
  const isPassword = InputType === "password";
  return (
    <>
      {label && <label className="custom-input-label">{label}</label>}
      {type === "textArea" ? (
        <textarea
          className="custom-textarea"
          style={{ margin, ...style }}
          type={InputType}
          value={value}
          readOnly={readOnly}
          onClick={onClick}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      ) : type === "inputIcon" ? (
        <div className="custom-input-icon">
          {Icon && <Icon size={16} />}
          <input
            style={{ margin, ...style, paddingRight: isPassword ? "30px" : "" }}
            className="custom-input"
            type={isPassword ? (show ? "text" : "password") : InputType}
            value={value}
            readOnly={readOnly}
            onClick={onClick}
            onChange={(e) => setValue(e.target.value)}
            placeholder={placeholder}
          />
          {isPassword && (
            <button
              onClick={() => setShow(!show)}
              className="icon custom-password-toggel"
            >
              {show ? <Eye size={16} /> : <EyeClosed size={16} />}
            </button>
          )}
        </div>
      ) : (
        <input
          className="custom-input"
          style={{ margin, ...style }}
          type={InputType}
          value={value}
          onClick={onClick}
          readOnly={readOnly}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
        />
      )}
    </>
  );
};

export const LoadMore = ({
  loading = false,
  disabled = false,
  show = false,
  onLoad,
  style = {},
}) => {
  return (
    show && (
      <div style={style} className="custom-loadMore-container">
        {loading ? (
          <Loader stroke="3" size="30" />
        ) : (
          <button
            disabled={disabled}
            onClick={onLoad}
            className="custom-load-more-btn"
          >
            Load More
          </button>
        )}
      </div>
    )
  );
};
