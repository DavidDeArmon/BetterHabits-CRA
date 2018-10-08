UPDATE Moods 
SET mood = $2,
activities=$3

WHERE id = $1
RETURNING *;
