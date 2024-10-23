import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../navigation/Header";
import Sidebar from "../otherComponents/Sidebar/Sidebar";

const Outlets = () => {
  return (
    <div className="outlet-container fixed-top">
      <Header />
      <div className="d-flex">
        <Sidebar />
        <div className="flex-grow-1" style={{ marginLeft: "100px" }}>
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Outlets;
