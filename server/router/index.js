import { Router } from "express";
import { PaperController, QuestionController } from "../controllers/index.js";

const router = Router();

const paperController = new PaperController();
const questionController = new QuestionController();

// paper Routes
router.post('/paper/create', paperController.create);
router.put('/paper/update/:id',paperController.update);
router.delete('/paper/delete',paperController.delete);

// question Routes
router.post("/add/question", questionController.add);
router.get("/question/:difficulty", questionController.questions);


export default router;