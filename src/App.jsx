import React, { useRef, useEffect, useState } from "react";
import emailjs from "emailjs-com";
import "./App.css";
import SkillBar from "./components/SkillBar";
import ProjectCard from "./components/ProjectCard";

function Typewriter({ text, className = "", speed = 22, ...props }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return (
    <span className={"typewriter-text " + className} {...props}>
      {displayed}
    </span>
  );
}

const skillsToShow = [
  "Flutter",
  "ReactJS",
  "Java",
  "Python",
  "Flask",
  "Firebase",
  "AI/ML",
  "UI/UX Design",
  "Backend APIs",
  "MySQL",
  "Docker",
  "Azure",
];

function SkillSwitcher() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % skillsToShow.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="skill-switcher-box">
      <span className="skill-switcher-icon">✅</span>
      <span className="skill-switcher-skill" key={skillsToShow[idx]}>
        {skillsToShow[idx]}
      </span>
    </div>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "projects", "contact"];
    const handleScroll = () => {
      let found = "home";
      for (let id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120 && rect.bottom > 120) {
            found = id;
            break;
          }
        }
      }
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendEmail = async () => {
    setSending(true);
    setFeedback("");
    try {
      await emailjs.send(
        "service_zuxiias",
        "template_rfach0l",
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "S5ebgmtxS4A7LAtG0"
      );
      setFeedback("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setFeedback("Failed to send message. Please try again later.");
    }
    setSending(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setFeedback("Please fill in all fields.");
      return;
    }
    sendEmail();
  };

  return (
    <div className="portfolio-container">
      <nav className="navbar">
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className={activeSection === "home" ? "active" : ""}
        >
          Home
        </a>
        <a
          href="#about"
          onClick={(e) => handleNavClick(e, "about")}
          className={activeSection === "about" ? "active" : ""}
        >
          About
        </a>
        <a
          href="#skills"
          onClick={(e) => handleNavClick(e, "skills")}
          className={activeSection === "skills" ? "active" : ""}
        >
          Skills
        </a>
        <a
          href="#projects"
          onClick={(e) => handleNavClick(e, "projects")}
          className={activeSection === "projects" ? "active" : ""}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "contact")}
          className={activeSection === "contact" ? "active" : ""}
        >
          Contact
        </a>
      </nav>

      <section id="home" className="section home">
        <div className="circuit-bg"></div>
        <div className="radar-bg"></div>
        <div className="home-pills-row">
          <span className="about-pill home-pill">B.Tech CSE</span>
          <span className="about-pill home-pill">Current GPA 8.3</span>
        </div>
        <div className="home-flex creative-home">
          <div className="profile-pic-wrapper">
            <img
              src="/assets/profile.jpeg"
              alt="Rupayan Pujari"
              className="profile-pic"
            />
          </div>
          <div className="home-info creative-info">
            <h1 className="bouncy-name gradient-text">
              <Typewriter text="Rupayan Pujari" speed={80} />
            </h1>
            <div className="home-tags">
              <span className="tag gold" align="center">
                Full-Stack Developer | Generative AI specialist | Azure
                Certified
              </span>
            </div>
            <div className="home-buttons creative-btns">
              <a
                className="cv-btn"
                href="/assets/Rupayan Pujari's Resume pdf.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
              >
                My Resume
              </a>
              <a
                className="linkedin-btn"
                href="https://www.linkedin.com/in/rupayan-pujari-9334b7344/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedIn profile
              </a>
            </div>

            <div className="home-skill-switcher-center">
              <SkillSwitcher />
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section about">
        <div className="circuit-bg"></div>
        <div className="radar-bg"></div>
        <h2>About Me</h2>
        <div className="about-flex">
          <div className="about-text">
            <p className="about-quote">
              A Microsoft Certified Azure professional with areas of expertise
              in Java, Python, React JS, React Native and Flutter. Developer
              with in-depth expertise in designing, development, troubleshooting
              and debugging dynamic web and mobile applications. Exceptional
              communication, collaboration and team-leading skills with
              proficiency at grasping new technical concepts quickly and
              utilizing them in a productive manner.
            </p>
            <div className="about-pill-row">
              <button className="about-pill">Professional</button>
              <button className="about-pill">Punctual</button>
              <button className="about-pill">Passionate</button>
              <button className="about-pill">Perfectionist</button>
            </div>
          </div>
          <div className="education-card">
            <h3>Education</h3>
            <ul>
              <li>
                <strong>B.Tech in Computer Science & Engineering</strong> <br />
                B.P Poddar Institue of Management and Technology, 2023 - 2027
              </li>
              <li>
                <strong>Higher Secondary</strong> <br />
                Salt Lake School, 2023
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="skills" className="section skills">
        <div className="circuit-bg"></div>
        <div className="radar-bg"></div>
        <h2>Skills & Technologies</h2>
        <p className="about-quote">
          A dynamic, highly skilled and motivated Java, Python, Flutter and
          ReactJS Developer with hands-on experience in designing, developing,
          and maintaining dynamic web/mobile applications.
        </p>
        <div className="skills-list">
          <SkillBar name="ReactJS" percent={85} />
          <SkillBar name="Flask" percent={90} />
          <SkillBar name="Java" percent={95} />
          <SkillBar name="Python" percent={80} />
          <SkillBar name="Flutter" percent={85} />
          <SkillBar name="MySQL" percent={90} />
        </div>
      </section>

      <section id="projects" className="section projects">
        <div className="circuit-bg"></div>
        <div className="radar-bg"></div>
        <h2>Projects</h2>
        <p className="about-quote">
          A complete showcase of my work, demonstrating my skills in full-stack
          development, generative AI, and cloud technologies. Feel free to
          explore my projects below, each reflecting my dedication to quality
          and innovation.
        </p>
        <div className="project-list">
          <ProjectCard
            title="BHAV"
            desc="BHAV is an AI chatbot built with Flutter and Flask, designed to understand both Bengali and English while replying in flawless Bengali. You can interact via text or speech, and it will generate responses and speak them back to you."
            link="https://bhav-ai.carrd.co/"
            color="#ffb347"
          />
          <ProjectCard
            title="Geo-Track"
            desc="Geo-Track is a geolocation-based attendance system, a smart solution designed to accurately track employee attendance using real-time location data."
            link="https://attendance-admin-dashboard.onrender.com/"
            color="#90ee90"
          />
          <ProjectCard
            title="PickyMania"
            desc="PickyMania, an E-commerce website made using ReactJS and Cloud Firestore. Designed for ease and efficiency, PickyMania offers a wide selection of the latest smartphones, tailored to your preferences. "
            link="https://pickymania.onrender.com/"
            color="#87ceeb"
          />
        </div>
      </section>

      <section id="contact" className="section contact">
        <div className="circuit-bg"></div>
        <div className="radar-bg"></div>
        <h2>Contact Me</h2>
        <p className="about-quote">
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your vision. Feel free to reach out via
          email or connect with me on LinkedIn or GitHub.
        </p>
        <div className="contact-flex">
          <div className="contact-info">
            <p>
              <strong>Email:</strong>{" "}
              <a href="mailto:rupayanpujari308@gmail.com">
                rupayanpujari308@gmail.com
              </a>
            </p>
            <p>
              <strong>LinkedIn:</strong>{" "}
              <a
                href="https://www.linkedin.com/in/rupayan-pujari-9334b7344/"
                target="_blank"
                rel="noopener noreferrer"
              >
                linkedin.com/in/rupayan-pujari
              </a>
            </p>
            <p>
              <strong>GitHub:</strong>{" "}
              <a
                href="https://github.com/RUPAYAN-PUJARI"
                target="_blank"
                rel="noopener noreferrer"
              >
                github.com/RUPAYAN-PUJARI
              </a>
            </p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleInputChange}
              required
              disabled={sending}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleInputChange}
              required
              disabled={sending}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              rows={4}
              value={form.message}
              onChange={handleInputChange}
              required
              disabled={sending}
            />
            <button type="submit" disabled={sending}>
              {sending ? "Sending..." : "Send"}
            </button>
            {feedback && (
              <div
                style={{
                  color: feedback.includes("success") ? "#36d1c4" : "#ff4d4f",
                  marginTop: 8,
                  fontWeight: 600,
                }}
              >
                {feedback}
              </div>
            )}
          </form>
        </div>
      </section>

      <div className="skills-strip-wrapper">
        <div className="skills-strip">
          {[
            "ReactJS",
            "Generative AI",
            "Backend APIs",
            "UI/UX Design",
            "Flutter Apps",
            "Android Development",
            "Java",
            "Python",
            "MySQL",
            "Flask",
            "Frontend",
            "Microsoft Azure",
            "Git",
            "Docker",
          ].map((skill, idx) => (
            <span className="strip-skill" key={idx}>
              {skill} <span className="strip-icon">✦</span>
            </span>
          ))}

          {[
            "ReactJS",
            "Generative AI",
            "Backend APIs",
            "UI/UX Design",
            "Android Development",
            "Java",
            "Python",
            "MySQL",
            "Flask",
            "Frontend",
            "Microsoft Azure",
            "Git",
            "Docker",
          ].map((skill, idx) => (
            <span className="strip-skill" key={"repeat-" + idx}>
              {skill} <span className="strip-icon">✦</span>
            </span>
          ))}
        </div>
      </div>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Rupayan Pujari. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
