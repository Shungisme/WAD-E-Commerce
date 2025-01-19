# WAD-E-Commerce Project

## Table of Contents

- [Tech Stack](#i-tech-stack)
- [Features](#ii-features)
   - [Authentication](#1-authentication)
   - [Product Searching And Filtering](#2-product-searching-and-filtering)
   - [Payment](#3-payment)
   - [Order Management](#4-order-management)
   - [Product Upload/Update](#5-product-uploadupdate)
   - [Statistic](#6-statistic)
   - [Database Schema](#7-project-database)
- [Demo](#iii-demo)

## I. Tech Stack

- **Languages:** JavaScript, TypeScript, HTML, CSS
- **Frameworks & Libraries:** ExpressJS, ReactJS, MUI, Tailwind, Redux-thunk, React-tanstack-query, React-hook-form, Formik
- **Testing:** Postman
- **API Documentation:** Postman
- **Database Management System:** MongoDB, MySQL

## II. Features

   ### 1. Authentication

   Using JWT authentication and Google OAuth2 for authenticating user.

   **How it works:**

   - **JWT Authentication:**
     - **Register:** 
       - User open the login modal and click on the button "Tạo tài khoản".
       - After filling in all necessary information, user click on the button "Đăng kí" to create account.  A verification code is sent to the user's email.
       - A modal will appear and require the user to enter the code that sent to the register email.
       - User enter the code and click on the button "Xác thực" to complete the register.
     - **Login:**
        - User fill in his/her username and password and click on the button "Đăng nhập".
        - The client sends a request to verify the information. If valid, the server responds with an access token and a refresh token.
     - **Refresh token:**
        - When the access token expires (valid for 3600 seconds), the client sends a refresh request containing the refresh token.
        - The server checks the validity of the refresh token. If valid, generates new tokens, and sends them back to the client.
   - **Google OAuth2:**
     - **Login:** 
       - User click on the Google logo to login with Google.
       - The page is navigated to the Google account page, user can pick the account google to login here. 
       - After picking the Google account to login and agree with the Privacy Policy and Terms of Service, a one-time code and token will be returned.
       - The server receives the code from the client through PassportJS and exchanges with Google for the user's profile information.
       - The server will retrieve the database to find the account through email. If the user has never created account with this email before, a new account will be created with the name and the avatar that was received from Google. Else, login with the account found.
     
   ![Login With Google](https://res.cloudinary.com/duf2t1pkp/image/upload/v1737264414/e30e9696-e175-4855-8ddb-fe66893b48e6.png)

  ### 2. Product Searching and Filtering

  - **Search by Product Name:**
    - Users can type a keyword to search for products, without needing to know the full name.
    
  - **Filter Product:**
    - Users filter the products with variable options.

  ### 3. Payment
  
  - **Users can pay for their orders using our payment system:**
  ![User Checkout](https://res.cloudinary.com/duf2t1pkp/image/upload/v1737265123/fc8238b8-a4b6-4684-a9f2-bee4a3211a35.png)

  ### 4. Order Management
  
  - **User Order Page:**
    - Users can track their orders.
  
  - **Admin Order Management Page:**
    - Admins can delete orders, update order status, view order details and statistics the orders.
    
  ### 5. Product Upload/Update

  These pages are for admin use only.

  ![Product](https://res.cloudinary.com/duf2t1pkp/image/upload/v1737264719/8d74fdff-dd10-476c-926f-38644a05ad32.png)

  ### 6. Statistic

  These pages are for admin use only.

  ![Statistic](https://res.cloudinary.com/duf2t1pkp/image/upload/v1737264646/Screenshot_2025-01-19_122844_hqjnpg.png)

  ### 7. Project Database

  ![Database Schema](https://res.cloudinary.com/duf2t1pkp/image/upload/v1737264117/wad_bcqrut.png)

## III. Demo

 - Link: [WAD Ecommerce](https://wad-ecommerce.vercel.app/)
 - Account Admin
    + email: admin@gmail.com
    + password: Admin@123
