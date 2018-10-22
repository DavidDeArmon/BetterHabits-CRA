require("dotenv").config();
const express = require("express"),
  session = require("express-session"),
  passport = require("passport"),
  app = express(),
  port = process.env.PORT || 3001,
  massive = require("massive"),
  {
    insertMood,
    deleteTodaysMood,
    getMoods,
    editMood
  } = require("./moodController"),
  {
    getHabits,
    recordHabit,
    checkHabit,
    getHabitDays,
    createHabit,
    updateHabit
  } = require("./habitController"),
  { json } = require("body-parser");

// const firebase = require('firebase')
// const config = {
//     apiKey: "AIzaSyCpP5kS7cQa68MpKONbBOevQv-3MDb04L4",
//     authDomain: "assistedinawe.firebaseapp.com",
//     databaseURL: "https://assistedinawe.firebaseio.com",
//     projectId: "assistedinawe",
//     storageBucket: "assistedinawe.appspot.com",
//     messagingSenderId: "418417628831"
//   };
//   firebase.initializeApp(config);

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

//endpoints
app.post("/api/moods", insertMood);
app.delete("/api/moods/:id", deleteTodaysMood);
app.get("/api/moods", getMoods);
app.put("/api/moods/:id", editMood);

app.get("/api/habits/:id", getHabits);
app.post("/api/habits/days/:id", getHabitDays);
app.post("/api/habits", recordHabit);
app.post("/api/habits/check", checkHabit);
app.post("/api/habits/newHabit", createHabit);
app.put("/api/habits/:id", updateHabit);

app.listen(port, () => {
  console.log("server is listening on port:", port);
});
