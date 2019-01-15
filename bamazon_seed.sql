
-- provide initial data into the table product
-- ***********************************************
INSERT INTO products(product_name,department_name,price,stock_quantity)
VALUES
			('Smart speaker with Alexa','electronics',29.99,100),
			('apple ipad-space gray','electronics',280.50,9),
			('Samsung 7 Series','electronics',565.78,50),
			('LOreal Paris Satin Lipstick','beauty & personal care',8.98,79),
			('Michael Kors Parfum Spray','beauty & personal care',72.35,105),
			('Canon Mini Photo Printer','office products',99.99,5),
			('Wire Mesh Desk Organizer','office products',20.87,71),
			('Harry Potter Collection','movies & TV',69.99,30),
			('Mission Impossible','movies & TV',15.66,63),
			('The Very Hungry Caterpillar','books',14.99,60),
			('The Food Lab Home Cooking ','books',33.02,7),
			('First 100 Words','books',14.99,25),
			('Sweaters v neck','clothing',80.65,8),
			('jackets & vests','clothing',75.43,94),
			('active hoodies','clothing',54.70,4);


-- provide initial data into the table departments
-- ****************************************************
INSERT INTO departments(department_name,over_head_costs)
VALUES
			('electronics',1900.60),
            ('beauty & personal care',1689.90),
            ('movies & TV',1550.43),
            ('clothing',1723.65),
            ('books',938.00),
            ('office products',885.21);
            
            
                