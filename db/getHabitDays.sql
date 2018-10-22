SELECT * FROM habits
JOIN user_habits ON(habits.habit_id=user_habits.id) 
WHERE habits.user_id = $1 AND habits.date BETWEEN $2 AND $3
ORDER BY habits.date DESC;