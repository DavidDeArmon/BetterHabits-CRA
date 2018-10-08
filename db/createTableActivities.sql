CREATE TABLE Activities(
id SERIAL PRIMARY KEY,
submission_id INTEGER REFERENCES Moods(id),
activities VARCHAR(5000)
)