UPDATE user_habits 
SET habit_name = $2,
habit_desc = $3
WHERE id = $1;