SELECT * FROM habits
JOIN user_habits ON(habits.habit_id=user_habits.id) 
WHERE habits.date BETWEEN $1 AND $2;