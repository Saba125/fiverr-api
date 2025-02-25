📌 Project Overview: E-Commerce API (Without Payments & Notifications)
Tech Stack
Backend: Node.js (Express.js)
Database: PostgreSQL
Authentication: JWT, bcrypt
Email Sending: Nodemailer
📌 User Roles & Permissions
Role	Permissions
Buyer	Register, login, browse products, add to cart, place orders, view order history.
Admin	Manage products, categories, orders, and users.
📌 Database Models (Tables)
1. Users (Authentication & Role Management)
Column	Type	Description
id	SERIAL (PK)	Unique ID
name	VARCHAR(100)	User’s full name
email	VARCHAR(255)	Unique email
password	TEXT	Hashed password
role	ENUM('buyer', 'admin')	Defines user role
createdAt	TIMESTAMP	Registration date
2. Products (Product Listings)
Column	Type	Description
id	SERIAL (PK)	Unique product ID
name	VARCHAR(255)	Product name
description	TEXT	Product details
price	DECIMAL(10,2)	Product price
stock	INT	Available stock
categoryId	INT (FK)	Reference to Categories table
createdAt	TIMESTAMP	Date added
3. Categories (Product Categories)
Column	Type	Description
id	SERIAL (PK)	Unique category ID
name	VARCHAR(100)	Category name
4. Cart (User Shopping Cart)
Column	Type	Description
id	SERIAL (PK)	Unique cart ID
userId	INT (FK)	Reference to Users table
productId	INT (FK)	Reference to Products table
quantity	INT	Number of items
5. Orders (Order History)
Column	Type	Description
id	SERIAL (PK)	Unique order ID
userId	INT (FK)	Reference to Users table
totalAmount	DECIMAL(10,2)	Order total price
status	ENUM('pending', 'shipped', 'delivered')	Order status
createdAt	TIMESTAMP	Order date
📌 API Endpoints
1️⃣ Authentication (/auth)
✅ POST /register – Register a new user & send welcome email
✅ POST /login – Login & get JWT token

2️⃣ Products (/products)
✅ GET /products – Get all products
✅ POST /products – Add a new product (Admin only)
✅ PUT /products/:id – Update product (Admin only)
✅ DELETE /products/:id – Delete product (Admin only)

3️⃣ Categories (/categories)
✅ GET /categories – Get all categories
✅ POST /categories – Add a category (Admin only)

4️⃣ Cart (/cart)
✅ POST /cart – Add item to cart
✅ GET /cart – View cart items
✅ DELETE /cart/:id – Remove item from cart

5️⃣ Orders (/orders)
✅ POST /orders – Place an order & send order confirmation email
✅ GET /orders – View order history
