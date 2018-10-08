INSERT INTO Activities(user_id,submission_id,work,relax,friends,party,study)
VALUES($1,$2,$3,$4,$5,$6,$7)
RETURNING *;