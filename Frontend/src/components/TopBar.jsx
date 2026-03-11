// components/TopBar.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CirclePoundSterling } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ value = "" }) => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="topbar-container">
      {value ? (
        <h3 className="topbar-value">{value || "Topbar"}</h3>
      ) : (
        <h3 className="topbar-value">
          Hi,{" "}
          <span style={{ color: "var(--primary)" }}>
            {loading ? "loading..." : currentUser?.name || "Topbar"}
          </span>
        </h3>
      )}
      <h4 onClick={() => navigate("/pricing")} className="topbar-credit">
        <span className="icon">
          <CirclePoundSterling fill="#f8a314" color="#f7d028" />
        </span>
        {currentUser?.credits || 0} credits
      </h4>
    </div>
  );
};

export default TopBar;
