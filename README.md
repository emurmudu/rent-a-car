# Project Name : rent-a-car
### Live Link : https://rent-a-car-ivory-one.vercel.app

## Project Overview
The rent-a-car is an API-based service that manages car rentals, user authentication, car availability, and booking management. This backend system is implemented using TypeScript, Express.js, and MongoDB.

## Features
* User Authentication (Signup, Signin)
* Car Management (Create, Read, Update, Delete, Return Car)
* Booking Management (Create Booking, Get User's Booking, Get All Booking)
* Role-Based Access Control (Admin and User roles)
* Comprehensive Error Handling
* Middleware for Authentication and Authorization
## Technology Stack
* Language: TypeScript
* Framework: Express.js
* Database: MongoDB
* Authentication: JSON Web Tokens (JWT)
* Password Hashing: bcryptjs
* Environment Variables Management: dotenv
* Validation: Zod & Mongoose

## Prerequisites
* Node.js and npm installed
* MongoDB instance (local or cloud)
## Getting Started
### **Project Setup**
#### **Clone the Repository**:
- ```git clone https://github.com/emurmudu/rent-a-car.git```
- ```cd rent-a-car```
#### **Install Dependencies:**
- ```npm install```
#### **Configure Environment Variables:**

**Create a .env file in the root directory and add the following content:**
- ```DATABASE_URL``` = <your_mongodb_uri>
- ```JWT_ACCESS_SECRET``` = <your_access_secret>
- ```JWT_ACCESS_EXPIRES_IN``` = <your_access_expires_in>
- ```JWT_REFRESH_SECRET``` = <your_refresh_secret>
- ```JWT_REFRESH_EXPIRES_IN``` = <your_refresh_expires_in>
- ```PORT``` = <your_port_number>
- ```BCRYPT_SALT_ROUNDS``` = <your_bcrypt_salt_rounds>
- ```NODE_ENV``` = <your_producton_or_development_mode>
- ```DEFAULT_PASS``` = <your_default_password>

Replace with your actual values.
### **Running the Project:**

Use the following command to start the development server:
- ```npm run start:dev```
### **API Endpoints:**

**Authentication**

**Signup (POST): `/api/auth/signup`**
* Request body:
>
```
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "role": "user",  // role can be user or admin
  "password": "password123",
  "phone": "1234567890",
  "address": "123 Main St, City, Country"
}
```
* Response: User details and success message.

**Signin (POST): `/api/auth/signin`**
* Request body:
>
```
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```
* Response: User details, token, and success message.

### **Car Management**

**Create Car(POST): `/api/cars` (Admin only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with admin a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```
* Request body:
>
```
{
  "name": "Tesla Model 3",
  "description": "An electric car with advanced technology and performance.",
  "color": "White",
  "isElectric": true,
  "features": ["AC", "Bluetooth", "Long Range Battery"],
  "pricePerHour": 500
}
```
* Response: Car details and success message.

**Get All Cars(GET): `/api/cars`**
* Response: List of cars.

**Get Car by ID(GET): `/api/cars/:id`**
* Response: Car details.

**Update Car(PUT): `/api/cars/:id` (Admin only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with admin a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```
* Request body:
>
```
{
    "color": "Black",  // You can update all the fields including name, description, color, isElectric, features, pricePerHour, etc.
}
```
* Response: Updated car details and success message.

**Delete Car(DELETE): `/api/cars/:id` (Admin only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with admin a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```

* Response: Deleted car details and success message.



**Return Car(PUT): `/api/cars/return` (Admin only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with admin a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```
* Request body:
>
```
{
   "bookingId": "60d9c4e4f3b4b544b8b8d1c7",
   "endTime": "15:00"
}
```
* Response: Updated booking details, car status, and success message.

### **Booking Management**


**Create Booking(POST): `/api/bookings` (User only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with user a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```
* Request body:
>
```
{
   "carId": "60d9c4e4f3b4b544b8b8d1c7",
   "date": "2024-06-15",
   "startTime": "13:00",
}
```
* Response: Created booking details and success message.



**Get User's Booking(GET): `/api/bookings/my-bookings` (User only)**
* Request header:
>
```
Authorization:
Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmF
tZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

After signin with user a token will be generated without "Bearer" at the beginning of the token, but when you send the data from client side add the 'Bearer' before token in header.
```

* Response: User's booked details and success message.


**Get All Booking(GET): `/api/bookings` (Admin only)**
* Query Parameters:
>
```
carId: ID of the car for which availability needs to be checked.
date: The specific date for which availability needs to be checked (format: YYYY-MM-DD).
```
* Example Request:
>
```
/api/bookings?carId=608a6d8d03a1b40012abcdef&date=2024-06-15
/api/bookings?carId=608a6d8d03a1b40012abcdef
/api/bookings?date=2024-06-15
/api/bookings
```

* Response: Query matched booking details and success message.