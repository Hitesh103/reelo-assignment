class PaperController{
    constructor(){

    }
    create(req, res){
        res.send("create paper");
    }
    update(req, res){
        res.send("update paper");
    }
    delete(req, res){
        res.send("delete paper");
    }
}

export default PaperController;
