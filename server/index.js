require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    app = express(),
    port = process.env.PORT||3001,
    massive = require('massive'),
    {insertMood,deleteTodaysMood,getMoods,editMood} = require('./moodController'),
    {getHabits,recordHabit,checkHabit,getHabitDays} = require ('./habitController'),
    {json} = require('body-parser');
    

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance=>{
    app.set("db",dbInstance);
})
// app.use(
//     session({
//         secret,
//         resave:true,
//         saveUninitialized:true
//     })
// )
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done)=>{
    return done(null,user);
})
passport.deserializeUser((user,done)=>{
    return done(null,user);
})

//endpoints
app.post('/api/moods',insertMood)
app.delete('/api/moods/:id',deleteTodaysMood)
app.get('/api/moods',getMoods)
app.put('/api/moods/:id',editMood)

app.get('/api/habits',getHabits)
app.post('/api/habits/days',getHabitDays)
app.post('/api/habits',recordHabit)
app.post('/api/habits/check',checkHabit)



app.listen(port,()=>{
    console.log('server is listening on port:',port)
})