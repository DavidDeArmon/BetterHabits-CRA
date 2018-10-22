INSERT INTO user_habits(user_id,habit_name,habit_desc)
VALUES($1,$2,$3);
SELECT * FROM user_habits;