import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import questionLogo from "../images/question-logo.jpg";
import paperLogo from "../images/paper-logo.jpg";

export default function Home() {
    const navigate = useNavigate();
    const handleAddQuestion = () => {
        navigate("/question");
    };
    const handleCreatePaper = () => {
        navigate("/paper");
    };
  return (
    <div className="home-container">
      <div className="gradient-background">
        <div className="main-container">
          <h1>Question Paper Generator</h1>
          <div className="function-container">
            <img
              src={questionLogo}
              alt="Add Question "
              className="questionLogo"
            />
            <img
              src={paperLogo}
              alt="Generate Paper"
              className="paperLogo"
            />
          </div>
          <div className="button-container">
            <button className="action-button" onClick={handleAddQuestion}>Add Question</button>
            <button className="action-button" onClick={handleCreatePaper}>Generate Paper</button>
          </div>
        </div>
      </div>
    </div>
  );
}
