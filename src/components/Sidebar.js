import React from "react";
import "../styles/Sidebar.css";
import Sidebardata from "./Sidebardata";

const Sidebar = () => {
  return (
    <div className="side-bar">
      <ul className="sidebar-list">
        {Sidebardata.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              id={window.location.pathname == val.link ? "active" : ""}
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              <div Id="icon">{val.icon}</div>
              <div Id="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
