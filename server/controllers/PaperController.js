import Question from "../models/question.js";

class PaperController {
  constructor() {}

  async create(req, res) {
    try {
      const { totalMarks, difficultyDistribution, subject } = req.body;

      const paper = {
        subject,
        totalMarks,
        questions: [],
      };

      // Calculate the number of questions for each difficulty based on distribution
      let easyMarks = Math.floor(totalMarks * difficultyDistribution.easy);
      let mediumMarks = Math.floor(totalMarks * difficultyDistribution.medium);
      let hardMarks = Math.floor(totalMarks * difficultyDistribution.hard);

      let easyCount = Math.floor(easyMarks / 2);
      let mediumCount = Math.floor(mediumMarks / 3);
      let hardCount = Math.floor(hardMarks / 5);

      let easyReminder = easyMarks % 2;
      let mediumReminder = mediumMarks % 3;
      let hardReminder = hardMarks % 5;

      if (easyReminder > 0) {
        const easyQueRemaining = await Question.aggregate([
          { $match: { subject: subject, difficulty: "Easy", marks: easyReminder } },
          { $sample: { size: 1 } },
        ]);

        paper.questions.push(...easyQueRemaining);
      }

      if (mediumReminder > 0) {
        const mediumQueRemaining = await Question.aggregate([
          { $match: { subject: subject, difficulty: "Medium", marks: mediumReminder } },
          { $sample: { size: 1 } },
        ]);

        paper.questions.push(...mediumQueRemaining);
      }

      if (hardReminder > 0) {
        const hardQueRemaining = await Question.aggregate([
          { $match: { subject: subject, difficulty: "Hard", marks: hardReminder } },
          { $sample: { size: 1 } },
        ]);

        paper.questions.push(...hardQueRemaining);
      }

      // Get questions from database
      const easyQue = await Question.aggregate([
        { $match: { subject: subject, difficulty: "Easy", marks: 2 } },
        { $sample: { size: easyCount } },
      ]);

      const mediumQue = await Question.aggregate([
        { $match: { subject: subject, difficulty: "Medium", marks: 3 } },
        { $sample: { size: mediumCount } },
      ]);

      const hardQue = await Question.aggregate([
        { $match: { subject: subject, difficulty: "Hard", marks: 5 } },
        { $sample: { size: hardCount } },
      ]);

      paper.questions.push(...easyQue);
      paper.questions.push(...mediumQue);
      paper.questions.push(...hardQue);

      // console.log(paper);

      // Initialize variables to store total marks for each difficulty level
      let easyTotalMarks = 0;
      let mediumTotalMarks = 0;
      let hardTotalMarks = 0;
      let combinedTotalMarks = 0;

      // Iterate through each question in the paper
      for (const question of paper.questions) {
        const marks = question.marks;

        // Check the difficulty level and add marks to the respective total
        if (question.difficulty === "Easy") {
          easyTotalMarks += marks;
        } else if (question.difficulty === "Medium") {
          mediumTotalMarks += marks;
        } else if (question.difficulty === "Hard") {
          hardTotalMarks += marks;
        }

        // Add marks to the combined total
        combinedTotalMarks += marks;
      }

      let remainingQueMarks = totalMarks - combinedTotalMarks;

      if (remainingQueMarks > 0) {
        const remainingQue = await Question.aggregate([
          { $match: { subject: subject, marks: 1 , difficulty : "Easy" } },
          { $sample: { size: remainingQueMarks } },
        ]);

        paper.questions.push(...remainingQue);
      }

      // Display the results
      // console.log("Easy Total Marks:", easyTotalMarks);
      // console.log("Medium Total Marks:", mediumTotalMarks);
      // console.log("Hard Total Marks:", hardTotalMarks);
      // console.log("Combined Total Marks:", combinedTotalMarks);

      res.status(200).json({ paper });
    } catch (error) {
      console.error("Error generating paper:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

}

export default PaperController;
