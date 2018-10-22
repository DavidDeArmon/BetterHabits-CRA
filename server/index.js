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

app.use(json());
massive(process.env.CONNECTION_STRING).then(dbInstance => {
  app.set("db", dbInstance);
});

//endpoints
app.post("/api/moods", insertMood);
app.delete("/api/moods/:id", deleteTodaysMood);
app.get("/api/moods/:id", getMoods);
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
