import { PdfReader } from "pdfreader";
import Analysis from "../models/Analysis.js";

export const analyzeResume = async (req, res) => {
  try {
    const { fileName, userEmail } = req.body;
    const filePath = `./uploads/${fileName}`;

    let resumeText = "";

    new PdfReader().parseFileItems(filePath, async (err, item) => {

      if (err) {
        return res.status(500).json({
          message: err.message
        });
      }

      if (item) {
        if (item.text) {
          resumeText += item.text + " ";
        }
        return;
      }

      const resume = resumeText.toLowerCase();

      // ===============================
      // Skills Database
      // ===============================

      const skillsList = [
        "Java",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Express",
        "Python",
        "HTML",
        "CSS",
        "SQL",
        "Git",
        "Bootstrap"
      ];

      const skillPatterns = {
        Java: ["java"],
        JavaScript: ["javascript", "js"],
        React: ["react", "reactjs", "react.js"],
        "Node.js": ["node", "nodejs", "node.js"],
        MongoDB: ["mongodb", "mongo"],
        Express: ["express", "express.js"],
        Python: ["python"],
        HTML: ["html", "html5"],
        CSS: ["css", "css3"],
        SQL: ["sql", "mysql", "postgresql"],
        Git: ["git", "github"],
        Bootstrap: ["bootstrap"]
      };

      const foundSkills = [];

      Object.keys(skillPatterns).forEach(skill => {
        const matched = skillPatterns[skill].some(keyword =>
          resume.includes(keyword)
        );

        if (matched) {
          foundSkills.push(skill);
        }
      });

      // ===============================
      // Missing Skills
      // ===============================

      const missingSkills = skillsList.filter(
        skill => !foundSkills.includes(skill)
      );

      // ===============================
      // Learning Path
      // ===============================

      const learningMap = {
        React: "Learn React Fundamentals",
        "Node.js": "Learn Node.js Backend",
        MongoDB: "Learn MongoDB Database",
        Express: "Learn Express Framework",
        Git: "Learn Git & GitHub",
        Bootstrap: "Learn Bootstrap",
        Python: "Learn Python Programming",
        SQL: "Learn SQL Queries"
      };

      const learningPath = missingSkills.map(
        skill => learningMap[skill] || `Learn ${skill}`
      );

      // ===============================
      // Resume Sections
      // ===============================

      const hasEmail = /\S+@\S+\.\S+/.test(resumeText);

      const hasPhone = /\d{10}/.test(resumeText);

      const hasEducation =
        resume.includes("b.tech") ||
        resume.includes("btech") ||
        resume.includes("bachelor") ||
        resume.includes("college") ||
        resume.includes("university");

      const hasProjects =
        resume.includes("project");

      const hasExperience =
        resume.includes("experience") ||
        resume.includes("internship");

      const hasCertification =
        resume.includes("certificate") ||
        resume.includes("certification");

      // ===============================
      // ATS Score
      // ===============================

      let atsScore = 0;

      if (hasEmail && hasPhone) atsScore += 10;

      if (hasEducation) atsScore += 15;

      if (hasExperience) atsScore += 20;

      if (hasProjects) atsScore += 15;

      atsScore += Math.round(
        (foundSkills.length / skillsList.length) * 30
      );

      if (hasCertification) atsScore += 10;

      if (atsScore > 100) atsScore = 100;

      // ===============================
      // Role Database
      // ===============================

      const roles = [
        {
          role: "Frontend Developer",
          skills: ["HTML", "CSS", "JavaScript", "React"]
        },
        {
          role: "Backend Developer",
          skills: ["Node.js", "Express", "MongoDB"]
        },
        {
          role: "MERN Stack Developer",
          skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript"]
        },
        {
          role: "Java Developer",
          skills: ["Java", "SQL"]
        },
        {
          role: "Python Developer",
          skills: ["Python"]
        },
        {
          role: "Data Analyst",
          skills: ["Python", "SQL"]
        },
        {
          role: "Web Developer",
          skills: ["HTML", "CSS"]
        },
        {
          role: "Database Developer",
          skills: ["MongoDB", "SQL"]
        },
        {
          role: "JavaScript Developer",
          skills: ["JavaScript"]
        }
      ];

      // ===============================
      // Role Prediction
      // ===============================

      let role = "Unable to Predict";
      let roleMatch = 0;

      roles.forEach(item => {

        const matchedSkills = item.skills.filter(skill =>
          foundSkills.includes(skill)
        );

        const percentage = Math.round(
          (matchedSkills.length / item.skills.length) * 100
        );

        if (percentage > roleMatch) {
          roleMatch = percentage;
          role = item.role;
        }

      });

      // ===============================
      // Save Analysis
      // ===============================

      await Analysis.create({
        userEmail,
        atsScore,
        role,
        roleMatch,
        skills: foundSkills,
        missingSkills,
        learningPath
      });

      // ===============================
      // Response
      // ===============================

      return res.status(200).json({
        message: "Resume analyzed successfully",
        atsScore,
        role,
        roleMatch,
        skills: foundSkills,
        missingSkills,
        learningPath
      });

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};