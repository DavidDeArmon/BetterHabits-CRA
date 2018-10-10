INSERT INTO habits(user_id,date,habit_id)
VALUES($1,$2,$3)
RETURNING *;
