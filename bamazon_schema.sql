DROP DATABASE IF EXISTS bamazon;

--  create bamazon database
--  ******************************
CREATE DATABASE bamazon;


USE bamazon;


-- create products table
-- *************************
CREATE TABLE products(
		item_id					INTEGER				NOT NULL		AUTO_INCREMENT,
		product_name			VARCHAR(300)		NOT NULL,
		department_name			VARCHAR(300)		NOT NULL,
		price					DECIMAL(10,	2)		NOT NULL,
		stock_quantity 			INTEGER 			NOT NULL,
		product_sales 			DECIMAL(10,2) 		NOT NULL 		DEFAULT 0,
								PRIMARY KEY (item_id)
);


-- create departments table 
-- *****************************
CREATE TABLE departments(
		department_id 		INTEGER				NOT NULL		AUTO_INCREMENT,
		department_name		VARCHAR(300)		NOT NULL		UNIQUE,
		over_head_costs		DECIMAL(10,	2)		 NOT NULL,
							PRIMARY KEY (department_id)
);

