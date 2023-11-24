import Question from "../models/question.js";

class QuestionController {
  constructor() {}

  async add(req, res) {
    try {
      const questionData = req.body;

      // Check if questionData is an array
      if (Array.isArray(questionData)) {
        // If it's an array, loop through each question and save it
        const newQuestions = await Promise.all(
          questionData.map(async (data) => {
            const newQuestion = new Question(data);
            await newQuestion.save();
            return newQuestion;
          })
        );

        res.status(201).json({
          message: "Questions added successfully",
          questions: newQuestions,
        });
      } else {
        // If it's a single question, save it as before
        const { question, subject, topic, difficulty, marks } = questionData;

        const newQuestion = new Question({
          question,
          subject,
          topic,
          difficulty,
          marks,
        });

        await newQuestion.save();

        res.status(201).json({
          message: "Question added successfully",
          question: newQuestion,
        });
      }
    } catch (error) {
      console.error("Error adding question(s):", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async questions(req, res) {
    try {
      const { difficulty, subject, topic } = req.query;

      console.log("Params:", req.query);

      let query = {};

      // Build the query based on provided parameters
      if (difficulty) {
        query.difficulty = difficulty;
      }
      if (subject) {
        query.subject = subject;
      }
      if (topic) {
        query.topic = topic;
      }

      console.log("Query:", query);

      // Retrieve questions based on the query
      const questions = await Question.find(query);

      console.log("Questions:", questions);

      res.status(200).json({ questions });
    } catch (error) {
      console.error("Error getting questions:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

export default QuestionController;
