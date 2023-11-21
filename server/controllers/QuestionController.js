class QuestionController{
    constructor(){
        
    }

    add(req, res){
        res.send("add question");
    }

    questions(req, res){
        res.send("get questions");
    }
}

export default QuestionController;