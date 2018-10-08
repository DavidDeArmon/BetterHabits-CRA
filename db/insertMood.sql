-- INSERT INTO Moods(user_id,date,mood,activities)
-- VALUES(1,'10/5/2018','Great','Work,Relaxing,')

INSERT INTO Moods(user_id,date,mood,activities)
VALUES($1,$2,$3,$4)
RETURNING *;