require('dotenv').config()
const express = require('express'),
    session = require('express-session'),
    passport = require('passport'),
    app = express(),
    port = process.env.PORT||3001,
    massive = require('massive'),
    {insertMood,deleteTodaysMood,getMoods} = require('./controller'),
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



app.listen(port,()=>{
    console.log('server is listening on port:',port)
})