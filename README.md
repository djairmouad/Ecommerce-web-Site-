

# Ecommerce Website
## accounts:
-**Admin:admin@gmail.com** 
-**password:admin@**
-**USER**:YOU CAN CREAT ONE

## 🛠️ **Technologies Used**:
- **Frontend**: React, Tailwind CSS, Redux, React Router, and other libraries.
- **Backend**: Node.js, Express.js.
- **Database**: MySQL.

## 📌 Project Overview:
This is a comprehensive Ecommerce web application with robust features for both admin and user roles.

## 👨🏻‍💻 **Admin Features**:
- **Product Management**: Add, update, and remove products; manage product properties.
- **Category Management**: Add, update, and remove categories; manage category properties.
- **Order Management**: View all orders received from clients.
- **Admin Management**: View, add, and remove admins.
- **Homepage Selection**: Select products to feature on the homepage.

## 🙍‍ **User Features**:
- **Product Browsing**: View all products.
- **Cart Management**: Add products to the cart.
- **Reviews**: Add reviews for products.
- **Search Functionality**: Search for products.
- **Profile Management**: Edit personal information.
- **Order History**: View order history.
- **Purchasing**: Buy products.

## 🛠️ **Installation and Running the Project**

### **Prerequisites**
- Ensure you have Node.js and npm installed on your machine.
- Install and configure XAMPP for MySQL.

### **Database Setup using XAMPP**
1. **Start MySQL in XAMPP**:
   - Open XAMPP Control Panel and start the Apache and MySQL services.

2. **Access phpMyAdmin**:
   - In your browser, go to `http://localhost/phpmyadmin/`.

3. **Create the MySQL Database**:
   - In phpMyAdmin, click on the "Databases" tab.
   - Create a new database named `ecommerce`.

4. **Import the `ecommerce.sql` File**:
   - Select the `ecommerce` database from the list on the left.
   - Click on the "Import" tab.
   - Click on "Choose File" and select the `ecommerce.sql` file from your local machine.
   - Click "Go" to import the file and set up the database structure and data.

### **Backend Setup**
1. **Navigate to the backend directory**:
   ```bash
   cd backend
   ```
2. **Install backend dependencies**:
   ```bash
   npm install
   ```
3. **Run the backend server**:
   ```bash
   npm run dev
   ```

### **Frontend Setup**
1. **Navigate to the frontend directory**:
   ```bash
   cd frontend
   ```
2. **Install frontend dependencies**:
   ```bash
   npm install
   ```
3. **Run the frontend server**:
   ```bash
   npm run dev
   ```

### **Accessing the Application**
- Once both the frontend and backend servers are running, open your web browser and navigate to the specified localhost port to access the application.
