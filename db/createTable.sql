CREATE TABLE Moods(
id SERIAL PRIMARY KEY,
user_id INTEGER,
date VARCHAR(50),
mood VARCHAR(100),
activities VARCHAR(5000));
-- make date a date
-- make activities a seperate table