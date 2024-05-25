# MERN Authentication System

A flexible and dynamic authentication system for MERN stack applications. This package provides an easy-to-use solution for user signup and login, allowing you to define custom user fields and integrate with MongoDB seamlessly.

## Features

- User signup and login
- Dynamic user schema
- Secure password hashing
- JSON Web Token (JWT) authentication
- Easy integration with MongoDB

## Installation

npm install @an_average_coder/auth_package

## Configuration

### Create a configs.json file to define your user schema fields:

```bash
{
    "userSchema": {
        "username": { "type": "String", "required": true },
        "password": { "type": "String", "required": true },
        "email": { "type": "String", "required": false },
        "age": { "type": "Number", "required": false },
        "createdAt": { "type": "Date", "default": "Date.now" }
    },

    "saltRounds": 10,

    "cookieConfig": {
        "httpOnly": true,
        "secure": false,
        "maxAge": "1000 * 60 * 60 * 24 * 7"
    }

}
```

### Set up environment variables in a .env file:

```
- MONGO_URI=your_mongo_db_uri
- ACCESS_TOKEN_SECRET="your_secret",
- REFRESH_TOKEN_SECRET="your_refresh_token_secret",
- ACCESS_TOKEN_EXPIRY="1h",
- REFRESH_TOKEN_EXPIRY="7d"
```

## Usage

Here's an example of how to use this package in your MERN stack project:

### Setup Express App

```bash
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
```

### Signup

Send a POST request to /auth/signup with the following JSON body:

```bash
{
"firstName": "Test",
"lastName", "User"
"username": "testuser",
"password": "testpassword",
"email": "test@example.com",
"age": 30
}
```

### Login

Send a POST request to /auth/login with the following JSON body:

```bash
{
"username": "testuser",
"password": "testpassword"
}
```

### Protecting Routes using Middleware

```bash
const express = require('express');
const authSystem = require('@an_average_coder/auth_package');
const { authMiddleware } = require('@an_average_coder/auth_package');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/auth', authSystem);

app.get('/protected', authMiddleware, (req, res) => {
    res.send('This is a protected route');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

```

### Testing

To run tests, use the following command:

```bash
- npx jest
```

## Changelog

- All notable changes to this project are documented in [Changelog](./CHANGELOG.md).
