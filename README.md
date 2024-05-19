# MERN Authentication System

A flexible and dynamic authentication system for MERN stack applications. This package provides an easy-to-use solution for user signup and login, allowing you to define custom user fields and integrate with MongoDB seamlessly.

## Features

- User signup and login
- Dynamic user schema
- Secure password hashing
- JSON Web Token (JWT) authentication
- Easy integration with MongoDB

## Installation

npm install <your-package-name>


## Configuration
- Create a schemaConfig.json file to define your user schema fields:

{
    "userSchema": {
        "username": { "type": "String", "required": true },
        "password": { "type": "String", "required": true },
        "email": { "type": "String", "required": false },
        "age": { "type": "Number", "required": false },
        "createdAt": { "type": "Date", "default": "Date.now" }
    }
}

- Set up environment variables in a .env file:

MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
## Usage
Here's an example of how to use this package in your MERN stack project:

- Setup Express App

const express = require('express');
const authSystem = require('@an_average_coder/auth_package');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/auth', authSystem);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

- Define Signup and Login Routes

-- Signup

Send a POST request to /auth/signup with the following JSON body:

{
    "username": "testuser",
    "password": "testpassword",
    "email": "test@example.com",
    "age": 30
}
-- Login

Send a POST request to /auth/login with the following JSON body:

{
    "username": "testuser",
    "password": "testpassword"
}

- Testing
To run tests, use the following command:

npx jest

Sample Test Cases
Create test cases for signup and login functionalities using Jest and Supertest:

const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../src/index');
const User = require('../src/userModel');

beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/auth-test', { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('Signup', () => {
    it('should signup a new user', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                username: 'testuser',
                password: 'testpassword',
                email: 'test@example.com',
                age: 30
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.message).toEqual('User created successfully');
    });

    it('should return error if required fields are missing', async () => {
        const res = await request(app)
            .post('/auth/signup')
            .send({
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(500);
        expect(res.body.message).toBeDefined();
    });
});

describe('Login', () => {
    it('should login an existing user', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.token).toBeDefined();
    });

    it('should return error if user does not exist', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'nonexistentuser',
                password: 'testpassword'
            });
        expect(res.statusCode).toEqual(404);
        expect(res.body.message).toEqual('User not found');
    });

    it('should return error if password is incorrect', async () => {
        const res = await request(app)
            .post('/auth/login')
            .send({
                username: 'testuser',
                password: 'wrongpassword'
            });
        expect(res.statusCode).toEqual(400);
        expect(res.body.message).toEqual('Invalid credentials');
    });
});

## Contributing
Contributions are welcome! Please submit a pull request or open an issue to discuss any changes.

## License
This project is licensed under the MIT License.

