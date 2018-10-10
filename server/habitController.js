module.exports={
    getHabits(req,res){
        let db=req.app.get('db');
        db.getHabits().then((response)=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
    },
    getHabitDays(req,res){
        let db=req.app.get('db');
        const{startDate,endDate} = req.body;
        db.getHabitDays([startDate,endDate]).then(response=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
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
        db.checkHabit([user_id,date]).then((response)=>{
            res.status(200).send(response)
        }).catch(err=>console.log(err))
    }
}