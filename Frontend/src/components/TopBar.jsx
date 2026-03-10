// components/TopBar.jsx
import React, { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { CirclePoundSterling } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TopBar = ({ value = "" }) => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="topbar-container">
      {value ? (
        <h3 className="topbar-value">{value || "Topbar"}</h3>
      ) : (
        <h3 className="topbar-value">
          Hi, <span style={{color:"var(--primary)"}}>{currentUser?.name || "Topbar"}</span>
        </h3>
      )}
      <h4 onClick={() => navigate("/pricing")} className="topbar-credit">
        <span className="icon">
          <CirclePoundSterling fill="#f8a314" color="#f7d028" />
        </span>
        {currentUser?.creadits || 0} Creadits
      </h4>
    </div>
  );
};

export default TopBar;
