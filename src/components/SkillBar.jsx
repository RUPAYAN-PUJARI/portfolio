import React from "react";
import "../App.css";

function SkillBar({ name, percent }) {
  return (
    <div className="skill-bar">
      <span className="skill-name">{name}</span>
      <div className="battery">
        <div
          className="battery-level"
          style={{
            height: `${percent}%`,
            background: `linear-gradient(to top, #ff4e50 0%, #f9d423 50%, #4caf50 100%)`,
            transition: "height 1.2s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <span className="battery-percent">{percent}%</span>
        </div>
      </div>
    </div>
  );
}

export default SkillBar;
