CREATE TABLE Moods(
id SERIAL PRIMARY KEY,
user_id INTEGER,
date DATE,
mood VARCHAR(100),
activities VARCHAR(5000)
);
CREATE TABLE Activities(
id SERIAL PRIMARY KEY,
submission_id INTEGER REFERENCES Moods(id),
activities VARCHAR(5000)
)