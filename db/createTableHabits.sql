CREATE TABLE Habits(
id SERIAL PRIMARY KEY,
user_id INTEGER,
date VARCHAR(50),
habit_name VARCHAR(100)
);

CREATE TABLE user_habits(
id SERIAL PRIMARY KEY,
user_id INTEGER,
habit_name VARCHAR(100),
habit_desc TEXT
)
