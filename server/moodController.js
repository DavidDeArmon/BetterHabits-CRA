module.exports={

    insertMood(req,res){
        let db = req.app.get('db');
        const {user_id,date,mood,activities} = req.body;
        let tempActivities=activities.join(',')
        db.insertMood(user_id,date,mood,tempActivities).then((response)=>{ 
            console.log('server response:', response)           
            return res.status(200).send(response[0])
        }).catch(err=>console.log(err))
    },
    deleteTodaysMood(req,res){
        let db=req.app.get('db');
        const{id} = req.params;
        db.deleteTodaysMood(id).then(()=>{
            res.sendStatus(200)
        }).catch(err=>console.log(err))
    },
    getMoods(req,res){
        let db=req.app.get('db');
        const {id} = req.params
        if(db){
            db.getMoods(id).then((response)=>{
                res.status(200).send(response)
            }).catch(err=>console.log(err))
        }
    },
    editMood(req,res){
        let db=req.app.get('db');
        const {id} = req.params;
        const {mood, activities} = req.body
        let tempActivities=activities.join(',')
        db.editMood(id,mood,tempActivities).then((response)=>{
            return res.status(200).send(response[0])
        }).catch(err=>console.log(err))
    }

}