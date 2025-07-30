import React from "react";
import "../App.css";

function ProjectCard({ title, desc, link, color }) {
  return (
    <div
      className="project-card"
      style={{ borderColor: color, boxShadow: `0 0 16px ${color}55` }}
    >
      <h3 style={{ color }}>{title}</h3>
      <p>{desc}</p>
      <a href={link} target="_blank" rel="noopener noreferrer">
        View Project
      </a>
    </div>
  );
}

export default ProjectCard;
