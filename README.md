# Portfolio

Welcome to this hacking tutorial (hacking is illegal).

## Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Setup](#setup)
- [Requirements](#requirements)

## Overview

You have created a web application using React for the front end and Spring Boot for the back end, implementing JWT (JSON Web Token) authentication. This application allows users to authenticate, create job offers, and express interest in job offers. Users have detailed profiles including email, password, full name, website, birthdate, job title, education degree, and skills. Job offer creators can view profiles of users interested in their job offers, enabling effective candidate tracking.

### Features

1. **User Authentication**:
   - Secure JWT authentication for user login and session management.
   - Detailed user profiles with personal information and skills.

2. **Job Offer Management**:
   - Creation of job offers with titles and descriptions.
   - User ability to express interest in job offers.

3. **User Interaction**:
   - Job offer creators can view profiles of users interested in their offers.

## Architecture

The application architecture includes:

- **Front End**: Developed with React for responsive and interactive user interfaces.
- **Back End**: Built on Spring Boot to handle business logic, API endpoints, and database interactions.
![arch](https://github.com/hamzalach02/portfolio/assets/121760220/e58ca6a4-ed7c-472c-8bb0-74610a136f45)
- **JWT Authentication**: Ensures secure user sessions and protects API endpoints.
- ![jwtt](https://github.com/hamzalach02/portfolio/assets/121760220/cf4e29d5-6361-41a1-8ecd-4c7b86f17a9a)


## Setup

To setup this project:

1. Clone the repository on your machine:
   ```bash
   git clone https://github.com/hamzalach02/portfolio
   ```
2. Set up MySQL database:

Use Docker to create a MySQL container:

bash
```bash
docker run -d --name portfolio-mysql -e MYSQL_ROOT_PASSWORD=123456 -e MYSQL_DATABASE=portfolio -p 3306:3306 mysql:8.0
```
![docker2](https://github.com/hamzalach02/portfolio/assets/121760220/f1340a69-62b2-478f-9820-1df285673da8)


3. Run the Spring Boot application:

Open the project in your IDE (e.g., IntelliJ IDEA).
Start the server and test its functionality using Postman.
![testpostman1](https://github.com/hamzalach02/portfolio/assets/121760220/a85dd29e-9fa1-4f71-a45e-0afaf69b0ce5)


4. Set up the front end:

Navigate to the frontend directory and install dependencies:

````bash
cd frontend
````

install node_modules:
````bash
yarn install
````

Start the React development server:

````bash
yarn start
````


Open your browser and go to http://localhost:3000 to access the login/signup interface:
![login](https://github.com/hamzalach02/portfolio/assets/121760220/341b6495-8193-4a6a-bab0-4894af7c4dbf)
![signup](https://github.com/hamzalach02/portfolio/assets/121760220/8666b89f-8e95-4c70-80c6-ba985ad42f88)

After successful login, you will see the home page displaying a list of job offers:
![home](https://github.com/hamzalach02/portfolio/assets/121760220/27591b1c-71d1-4e4f-9ef1-6c6e16ecaac4)
you can interest to a job offer or create a job offer like : 
![home2](https://github.com/hamzalach02/portfolio/assets/121760220/f3299fd0-5cf4-4f9c-b911-e6ae1db9fa44)
you can see your progile and edit infos and password : 
![profile](https://github.com/hamzalach02/portfolio/assets/121760220/2ea06f93-844a-46d6-ada2-2e36595f4238)
![profile2](https://github.com/hamzalach02/portfolio/assets/121760220/7d216142-69a8-4826-87c5-69b994f2b8df)
and you can see interested users of your joboffers : 
![interested](https://github.com/hamzalach02/portfolio/assets/121760220/7755c49a-dbb6-4158-852e-3caae0be8dc4)
and you can see a user profile and his jobffers and the job offers he'is interested in : 
![userprofile](https://github.com/hamzalach02/portfolio/assets/121760220/098a02a6-77fa-48ac-8d2a-a2718da0c176)



## Requirements
To run this project, ensure you have the following:

-Spring Boot IDE (e.g., IntelliJ IDEA) for backend development.
-MySQL database (e.g., set up using Docker as described above).
-Node.js and yarn for frontend dependencies management and development.
