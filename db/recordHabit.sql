INSERT INTO habits(user_id,date,habit_id)
VALUES($1,$2,$3);
SELECT * FROM habits WHERE user_id=$1 AND date=$2;
