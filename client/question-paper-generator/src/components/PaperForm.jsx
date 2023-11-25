import React, { useState } from "react";
import "../styles/paper-form.css";
import { jsPDF } from "jspdf";

const PaperForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    totalMarks: "",
    difficultyDistribution: {
      easy: "",
      medium: "",
      hard: "",
    },
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("difficultyDistribution")) {
      // Handle nested state for difficultyDistribution
      const difficultyType = name.split(".")[1];
      setFormData((prevData) => ({
        ...prevData,
        difficultyDistribution: {
          ...prevData.difficultyDistribution,
          [difficultyType]: value,
        },
      }));
    } else {
      // Handle other form fields
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const downloadPDF = (pdf) => {
    const blob = pdf.output("blob");
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "QuestionPaper.pdf";
    link.click();
  };

  const splitText = (text, maxLength) => {
    const words = text.split(' ');
    let lines = [];
    let currentLine = '';

    words.forEach((word) => {
      if (currentLine.length + word.length <= maxLength) {
        currentLine += `${word} `;
      } else {
        lines.push(currentLine.trim());
        currentLine = `${word} `;
      }
    });

    if (currentLine.trim() !== '') {
      lines.push(currentLine.trim());
    }

    return lines.join('\n');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://qpg-ju6x.onrender.com/api/paper/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Paper generated successfully");
        setErrorMessage("");

        // Generate PDF
        const pdf = new jsPDF();
        pdf.text(`Subject: ${data.paper.subject}`, 10, 10);
        pdf.text(`Total Marks: ${data.paper.totalMarks}`, 10, 20);

        data.paper.questions.forEach((question, index) => {
          const yPosition = 30 + index * 15;
          pdf.text(`${index + 1}. ${splitText(question.question, 70)}`, 10, yPosition);
          pdf.text(`                                                                                                              Marks: ${question.marks}`, 10, yPosition + 7);
        });

        // Trigger download
        downloadPDF(pdf);
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error || "Failed to generate paper.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="paper-container">
      <h2>Generate Paper</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label htmlFor="totalMarks">Total Marks:</label>
        <input
          type="number"
          id="totalMarks"
          name="totalMarks"
          value={formData.totalMarks}
          onChange={handleChange}
          required
        />

        <label htmlFor="easy">Easy Difficulty:</label>
        <input
          type="number"
          id="easy"
          name="difficultyDistribution.easy"
          value={formData.difficultyDistribution.easy}
          onChange={handleChange}
          required
        />

        <label htmlFor="medium">Medium Difficulty:</label>
        <input
          type="number"
          id="medium"
          name="difficultyDistribution.medium"
          value={formData.difficultyDistribution.medium}
          onChange={handleChange}
          required
        />

        <label htmlFor="hard">Hard Difficulty:</label>
        <input
          type="number"
          id="hard"
          name="difficultyDistribution.hard"
          value={formData.difficultyDistribution.hard}
          onChange={handleChange}
          required
        />

        <button type="submit">Generate Paper</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default PaperForm;
