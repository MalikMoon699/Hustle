import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { DashboardVideos } from "../services/demo.serveces";
import "../assets/style/Dashboard.css";
import { SearchInput, VideoCard } from "../components/CustomComponents";

const Dashboard = () => {
  const { setValue } = useOutletContext();
  const [searchFilter, setSearchFilter] = useState("");
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setValue("Dashboard");
    setVideos(DashboardVideos);
  }, []);

  return (
    <div className="dashboard-page">
      <SearchInput margin="0px 0px 20px 0px" placeholder="Search videos..."  value={searchFilter} setValue={setSearchFilter} />
      {videos?.length > 0 ? (
        <div className="dashboard-videos-grid">
          {videos?.map((video, index) => (
            <VideoCard
              key={index}
              title={video?.title || ""}
              link={video?.link || ""}
            />
          ))}
        </div>
      ) : (
        <p className="empty-data">No videos found.</p>
      )}
    </div>
  );
};

export default Dashboard;
