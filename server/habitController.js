module.exports={
    getHabits(req,res){
        let db=req.app.get('db');
        db.getHabits().then((response)=>{
            res.status(200).send(response)
        })
    }
}