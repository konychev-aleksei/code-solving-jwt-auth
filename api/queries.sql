CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(25) UNIQUE,
    password VARCHAR(100),
    role SMALLINT
);

CREATE TABLE refresh_sessions (
    id SERIAL PRIMARY KEY,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE,
    refresh_token VARCHAR(400) NOT NULL,
    finger_print VARCHAR(400) NOT NULL 
);

CREATE TABLE test_cases (
    id SERIAL PRIMARY KEY,
    n INT NOT NULL,
    expected_result INT NOT NULL,
    user_id SERIAL REFERENCES users(id) ON DELETE CASCADE
);

DROP TABLE user CASCADE;
DROP TABLE refresh_session;

SELECT * FROM user;
SELECT * FROM refresh_session;