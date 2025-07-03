CREATE DATABASE IF NOT EXISTS ecommerce;
USE ecommerce;

CREATE TABLE users (
id INT AUTO_INCREMENT PRIMARY KEY,
username VARCHAR(50) UNIQUE,
password VARCHAR(255)
);

CREATE TABLE products (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
price DECIMAL(10, 2),
category ENUM('men', 'women', 'kids')
);

CREATE TABLE cart (
id INT AUTO_INCREMENT PRIMARY KEY,
user_id INT,
product_id INT,
FOREIGN KEY (user_id) REFERENCES users(id),
FOREIGN KEY (product_id) REFERENCES products(id)
);

-- Sample products
INSERT INTO products (name, price, category) VALUES
('Men Shirt', 30.00, 'men'),
('Men Jeans', 50.00, 'men'),
('Men Jacket', 70.00, 'men'),
('Women Dress', 40.00, 'women'),
('Women Bag', 60.00, 'women'),
('Women Shoes', 80.00, 'women'),
('Kids Toy', 15.00, 'kids'),
('Kids Shirt', 20.00, 'kids'),
('Kids Book', 10.00, 'kids');