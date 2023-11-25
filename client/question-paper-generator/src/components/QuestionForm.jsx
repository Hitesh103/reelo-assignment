import React, { useState } from "react";
import "../styles/question-form.css";

const AddQuestionForm = () => {
  const [formData, setFormData] = useState({
    question: "",
    subject: "",
    topic: "",
    difficulty: "",
    marks: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://qpg-ju6x.onrender.com/api/add/question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Question added successfully");
        setErrorMessage("");
      } else {
        setSuccessMessage("");
        setErrorMessage(data.error || "Failed to add question.");
      }
    } catch (error) {
      console.error("Error:", error);
      setSuccessMessage("");
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="question-container">
      <h2>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="question">Question:</label>
        <textarea
          id="question"
          name="question"
          value={formData.question}
          onChange={handleChange}
          required
        />

        <label htmlFor="subject">Subject:</label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          required
        />

        <label htmlFor="topic">Topic:</label>
        <input
          type="text"
          id="topic"
          name="topic"
          value={formData.topic}
          onChange={handleChange}
          required
        />

        <label htmlFor="difficulty">Difficulty:</label>
        <select
          id="difficulty"
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          required
        >
          <option value="">Select difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>

        <label htmlFor="marks">Marks:</label>
        <input
          type="number"
          id="marks"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Question</button>
      </form>

      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default AddQuestionForm;
