Fiverr Clone Backend

🚀 Project Overview

This is a backend system for a Fiverr-like freelancing platform. It enables users to register, create gigs, place orders, send messages, and receive notifications. The backend supports authentication, payments, email verification, and IP tracking.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: PostgreSQL + TypeORM

Authentication: JWT, bcrypt

File Uploads: Multer, Cloudinary

Emailing: Nodemailer

IP Tracking: request-ip

📂 Project Structure

├── src
│   ├── controllers  # Request handlers
│   ├── entities     # Database models
│   ├── middleware   # Authentication, validation
│   ├── routes       # API routes
│   ├── services     # Business logic
│   ├── utils        # Helper functions
│   ├── templates    # Email templates
│   └── index.ts     # App entry point
└── README.md

🔑 Authentication & Users

POST /auth/register – Register a new user

POST /auth/login – Login user & get token

GET /auth/profile – Get current user profile

POST /auth/verify-email – Verify user email

🎨 Gigs

POST /gigs – Create a new gig

GET /gigs – Get all gigs

GET /gigs/:id – Get gig by ID

PUT /gigs/:id – Update a gig

DELETE /gigs/:id – Delete a gig

🛒 Orders

POST /orders – Create an order

GET /orders – Get all orders

GET /orders/:id – Get order details

PUT /orders/:id – Update order status

DELETE /orders/:id – Cancel an order

✉️ Messaging

POST /messages – Send a message

GET /messages/:conversationId – Get chat messages

📢 Notifications

GET /notifications – Get user notifications

POST /notifications/mark-as-read – Mark notifications as read

🌍 IP Tracking

User IP is logged on registration & login using request-ip

📧 Email System

Users receive a verification email upon registration

Order confirmations & status updates are emailed

🛠️ Setup & Installation

Clone the repo:

git clone https://github.com/yourusername/fiverr-clone-backend.git
cd fiverr-clone-backend

Install dependencies:

npm install

Set up environment variables in .env:

DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email
EMAIL_PASS=your_email_password

Run database migrations:

npm run typeorm migration:run

Start the server:

npm run dev

📝 License

This project is licensed under the MIT License.
