-- CREATE DATABASE timarttestdb;
USE timarttestdb;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL
);


CREATE TABLE Orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    user_id INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Insert sample users
INSERT INTO Users (username, email)
SELECT CONCAT('user', id), CONCAT('user', id, '@example.com')
FROM (
    SELECT 1 AS id
    UNION ALL
    SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
    -- Add more UNION ALL lines as needed to generate 1000 users
) AS numbers;

-- Insert sample orders (randomly associating orders with users)
INSERT INTO Orders (order_date, total_amount, user_id)
SELECT DATE_SUB(CURDATE(), INTERVAL FLOOR(RAND() * 365) DAY),
       ROUND(RAND() * 1000, 2),
       FLOOR(1 + RAND() * 1000)
FROM (
    SELECT 1 AS id
    UNION ALL
    SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5
    -- Add more UNION ALL lines as needed to generate 5000 orders
) AS numbers;

SELECT u.id, u.username, u.email, COUNT(o.id) AS order_count
FROM Users u
JOIN Orders o ON u.id = o.user_id
GROUP BY u.id
ORDER BY order_count DESC
LIMIT 10;


INSERT INTO Users (username, email) VALUES ('njokdan', 'njokdnn@gmail.com');

INSERT INTO Orders (order_date, total_amount, user_id) VALUES ('2023-10-19', 100.00, 1);


