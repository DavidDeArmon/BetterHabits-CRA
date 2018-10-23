module.exports={
    getHabits(req,res){
        let db=req.app.get('db');
        const {id} = req.params;
        if(db){
            db.getHabits(id).then((response)=>{
                res.status(200).send(response)
            }).catch(err=>console.log(err))
        }
    },
    getHabitDays(req,res){
        let db=req.app.get('db');
        const{startDate,endDate} = req.body;
        const {id} = req.params;
        if(db){
        db.getHabitDays([id,startDate,endDate]).then(response=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))}
    },
    recordHabit(req,res){
        let db=req.app.get('db');
        const {user_id,date,habit_id}=req.body
        db.recordHabit([user_id,date,habit_id]).then((response)=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
    },
    checkHabit(req,res){
        let db=req.app.get('db');
        const {user_id,date} = req.body;
        if(db){
            db.checkHabit([user_id,date]).then((response)=>{
                res.status(200).send(response)
            }).catch(err=>console.log(err))
        }
    },
    createHabit(req,res){
        let db=req.app.get('db');
        const {user_id,habit_name,habit_desc} = req.body;
        db.createHabit([user_id,habit_name,habit_desc]).then((response)=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
    },
    updateHabit(req,res){
        let db=req.app.get('db');
        const {habit_name,habit_desc} = req.body;
        const {id} = req.params;
        db.updateHabit([id,habit_name,habit_desc]).then((response)=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
    }
}