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
      let easyCount = Math.ceil(totalMarks * difficultyDistribution.easy);
      let mediumCount = Math.ceil(totalMarks * difficultyDistribution.medium);
      let hardCount = Math.ceil(totalMarks * difficultyDistribution.hard);

      // Get questions from database
      const easyQue = await Question.find({
        subject: subject,
        difficulty: "Easy",
      });

      const mediumQue = await Question.find({
        subject: subject,
        difficulty: "Medium",
      });

      const hardQue = await Question.find({
        subject: subject,
        difficulty: "Hard",
      });

      easyQue.sort((a, b) => b.marks - a.marks);
      mediumQue.sort((a, b) => b.marks - a.marks);
      hardQue.sort((a, b) => b.marks - a.marks);

      var ind = 0;
      while ((easyCount)-(easyQue[0].marks) > 0) {
        easyCount -= easyQue[0].marks;
        paper.questions.push(easyQue[0]);
        ind++;
      }

       ind = 0;
      while ((mediumCount)-(mediumQue[0].marks) > 0) {
        mediumCount -= mediumQue[0].marks;
        paper.questions.push(mediumQue[0]);
        ind++;
      }

       ind = 0;
      while ((hardCount)-(hardQue[0].marks) > 0) {
        hardCount -= hardQue[0].marks;
        paper.questions.push(hardQue[0]);
        ind++;
      }

      res.status(200).json({ paper });
    } catch (error) {
      console.error("Error generating paper:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  update(req, res) {
    res.send("update paper");
  }

  delete(req, res) {
    res.send("delete paper");
  }
}

export default PaperController;
