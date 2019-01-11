# bamazon

### Overview
---
Amazon-like storefront with MySQL.

### Getting Started
---
* Clone down repo.
* Navigate to the repo.
* Run command ```npm install``` in Terminal or GitBash
* Run command ```node bamazonCustomer``` for Manager View.
* Run command ```node bamazonManager``` for Customer View.
* Run command ```node bamazonSupervisor``` for Supervisor View.

### Technologies Used
---
* Node js
* MySQL

### Dependencies
---
```js
{
    "cli-table": "^0.3.1",
    "colors": "^1.3.3",
    "dotenv": "^6.2.0",
    "express": "^4.16.4",
    "inquirer": "^6.2.1",
    "mysql": "^2.16.0"
}
```
### Code Explanation
---
#### Roles and Actions

* bamazonCustomer
    * View Products for Sale
    * Purchase product

* bamazonManager
    * View Products for Sale
    * View Low Inventory
    * Add to Inventory
    * Add New Product

* bamazonSupervisor
    * View Departments
    * View Product Sales by Department
    * Create New Department

### Demos
---
* [watch the demo video Customer View]()
* [watch the demo video Manager View]()
* [watch the demo video Supervisor View]()
