import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar";
import SideBar from "../components/SideBar";

const AppLayout = () => {
  const [isTopbar, setIsTopbar] = useState(true);
  const [value, setValue] = useState("");


  return (
    <div className="app-layout-container">
      <SideBar />
      <div className="main-content">
        {isTopbar && <TopBar value={value} />}
        <Outlet context={{ setValue, setIsTopbar }} />
      </div>
    </div>
  );
};

export default AppLayout;
