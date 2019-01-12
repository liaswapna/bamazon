require('dotenv').config()
const keys = require('./keys'),
  mysql = require('mysql'),
  Table = require('cli-table'),
  colors = require('colors'),
  DB_USER = keys.db.user,
  DB_PASSWORD = keys.db.password,
  connection = mysql.createConnection({
    host: 'localhost',
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'bamazon'
  });

let productTableDetail;

class BamazonOperations {

  // constructor
  constructor(process) {
    connection.connect((err) => {
      if (err) throw err
      if (process) {
        process()
      }
    });
  }

  // function to get data from product table.
  getDataProductTable(process) {
    connection.query(
      'SELECT * FROM products',
      (err, results, fields) => {
        if (err) throw err
        productTableDetail = results;
        if (process) {
          process(productTableDetail)
        }
      }
    );
  }

  // function to get the department table
  getDataDepartmentTable(process){
    connection.query(
      'SELECT * FROM departments',
      (err,results,fields) => {
        if(err) throw err
        process(results)
      }
    )
  }

  // function to get the low inventory
  getLowInventory(productTable) {
    let lowInventory = productTable.filter((data) => data.stock_quantity < 10)
    this.displayProductTable(lowInventory);
  }

  // function to get product sale by department
  getProductSaleDept(process){
    connection.query(
      `SELECT 
        d.department_id,
        d.department_name,
        d.over_head_costs,
        SUM(p.product_sales) AS product_sales,
        d.over_head_costs - SUM(p.product_sales)  AS total_profit
      FROM 
        departments d LEFT JOIN products p 
        ON d.department_name = p.department_name
        GROUP BY d.department_name
        ORDER BY d.department_id`,
      (err,results,fields) =>{
        if (err) throw err
        this.displayProductSaleDept(results)
        if(process) process()
      }
    )
  }

  // function to update the product table and display the total price.
  updateProductTable(id, quantity, price, process) {
    connection.query(
      `UPDATE products 
      SET stock_quantity = stock_quantity - ?,
          product_sales = product_sales + ?
          WHERE item_id = ?`,
      [quantity, (quantity * price).toFixed(2), id],
      (err, results, fields) => {
        if (err) throw err
        console.log('TOTAL PRICE: $%d'.bold.cyan, (quantity * price).toFixed(2))
        this.getDataProductTable(process)
      }
    )
  }

  // function to add inventory to product table
  addToProductInventory(id, quantity, process) {
    connection.query(
      `UPDATE products 
      SET stock_quantity = stock_quantity + ?
      WHERE item_id = ?`,
      [quantity, id],
      (err, results, fields) => {
        if (err) throw err
        console.log('Updated the product inventory.')
        process()
      }
    )
  }

  // function to add new items into the product table
  addNewProduct(productName,department,price,stock,process){
    connection.query(
      `INSERT INTO products SET ?`,
      {
        product_name: productName,
        department_name: department,
        price: price,
        stock_quantity: stock
      },
      (err,results,fields) =>{
        if(err) throw err
        console.log('New product added to product table')
        if(process) process()
      }
    )
  }

  addNewDepartment(deptName,overhead,process){
    connection.query(
      'INSERT INTO departments SET ?',
      {
        department_name: deptName,
        over_head_costs: overhead
      },
      (err,results,fields) => {
        if (err) throw err
        console.log('New Department added to Departments table')
        if(process) process()
      }
    )
  }

  // function to display the table details
  displayProductTable(productTable) {

    // setting up the display table.
    let table = new Table({
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
      },
      colors: false,
      style: { head: ['cyan'], border: ['white'] },
      head: ['ID', 'Product Name', 'Department', 'Price', 'Stock']
    });

    productTable.forEach(data => {
      table.push(
        [data.item_id, data.product_name, data.department_name, data.price, data.stock_quantity]
      )
    });
    console.log(table.toString());
  }

  // function to display the table details
  displayDepartmentTable(departmentTable) {

    // setting up the display table.
    let table = new Table({
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
      },
      colors: false,
      style: { head: ['cyan'], border: ['white'] },
      head: ['ID', 'Department Name', 'Overhead Costs']
    });

    departmentTable.forEach(data => {
      table.push(
        [data.department_id, data.department_name, data.over_head_costs]
      )
    });
    console.log(table.toString());
  }

  // function to get product sale by department
  displayProductSaleDept(departmentTable){
    let table = new Table({
      chars: {
        'top': '═', 'top-mid': '╤', 'top-left': '╔', 'top-right': '╗'
        , 'bottom': '═', 'bottom-mid': '╧', 'bottom-left': '╚', 'bottom-right': '╝'
        , 'left': '║', 'left-mid': '╟', 'mid': '─', 'mid-mid': '┼'
        , 'right': '║', 'right-mid': '╢', 'middle': '│'
      },
      colors: false,
      style: { head: ['cyan'], border: ['white'] },
      head: ['ID', 'Department Name', 'Overhead Costs','Product Sales','Total Profit']
    });

    departmentTable.forEach(data => {
      table.push(
        [data.department_id, data.department_name, data.over_head_costs, data.product_sales, data.total_profit]
      )
    });
    console.log(table.toString());
  }

  // function to find the product by ID
  findProduct(id) {
    if (!productTableDetail) return null
    return productTableDetail.find((data) => { return data.item_id == id })
  }

  // disconnect the database connection 
  exit() {
    connection.end(() => {
      console.log('Exited from App')
      process.exit()
    })
  }
}

module.exports = BamazonOperations