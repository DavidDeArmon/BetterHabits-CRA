module.exports={

    insertMood(req,res){
        let db = req.app.get('db');
        const {user_id,date,mood,activities} = req.body;
        db.insertMood(user_id,date,mood,activities).then((response)=>{ 
            console.log('server response:', response)           
            return res.status(200).send(response[0])
        }).catch(err=>console.log(err))

    },
    deleteTodaysMood(req,res){
        let db=req.app.get('db');
        const{id} = req.params;
        console.log(req.params)
        db.deleteTodaysMood(id).then(()=>{
            res.sendStatus(200)
        })
    },
    getMoods(req,res){
        let db=req.app.get('db');
        db.getMoods().then((response)=>{
            res.status(200).send(response)
        })
    }

}