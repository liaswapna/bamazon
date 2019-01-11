
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


-- provide initial data into the table product
-- ***********************************************
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES
			('Smart speaker with Alexa','electronics',29.99,100),
			('apple ipad-space gray','electronics',280.50,155),
			('Samsung 7 Series','electronics',565.78,50),
			('LOreal Paris Satin Lipstick','beauty & personal care',8.98,79),
			('Michael Kors Parfum Spray','beauty & personal care',72.35,105),
			('Canon Mini Photo Printer','office products',99.99,55),
			('Wire Mesh Desk Organizer','office products',20.87,71),
			('Harry Potter Collection','movies & TV',69.99,30),
			('Mission Impossible','movies & TV',15.66,63),
			('The Very Hungry Caterpillar','books',14.99,60),
			('The Food Lab Home Cooking ','books',33.02,78),
			('First 100 Words','books',14.99,25),
			('Sweaters v neck','clothing',80.65,32),
			('jackets & vests','clothing',75.43,94),
			('active hoodies','clothing',54.70,14);


-- provide initial data into the table departments
-- ****************************************************
INSERT INTO departments(department_name,over_head_costs)
VALUES
			('electronics',900.60),
            ('beauty & personal care',689.90),
            ('movies & TV',550.43),
            ('clothing',723.65),
            ('books',438.00),
            ('office products',885.21);
            
            
                