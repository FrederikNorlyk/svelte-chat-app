CREATE TABLE users(
   id INT GENERATED ALWAYS AS IDENTITY,
   name VARCHAR(255) NOT NULL,
   PRIMARY KEY(id)
);

CREATE TABLE messages(
   id INT GENERATED ALWAYS AS IDENTITY,
   date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   from_user_id INT NOT NULL,
   to_user_id INT NOT NULL,
   text TEXT NOT NULL,
   
   PRIMARY KEY(id),
    CONSTRAINT fk_from_user
        FOREIGN KEY(from_user_id) 
            REFERENCES users(id),
    CONSTRAINT fk_to_user
        FOREIGN KEY(to_user_id) 
            REFERENCES users(id)
);