CREATE TABLE Habits(
id SERIAL PRIMARY KEY,
user_id INTEGER,
date DATE,
habit_id INTEGER REFERENCES user_habits(id)
);

CREATE TABLE user_habits(
id SERIAL PRIMARY KEY,
user_id INTEGER,
habit_name VARCHAR(100),
habit_desc TEXT
)
