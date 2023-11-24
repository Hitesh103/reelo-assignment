import { Router } from "express";
import { PaperController, QuestionController } from "../controllers/index.js";

const router = Router();

const paperController = new PaperController();
const questionController = new QuestionController();

// paper Routes
router.post('/paper/create', paperController.create);

// question Routes
router.post("/add/question", questionController.add);
router.get("/question", questionController.questions);


export default router;