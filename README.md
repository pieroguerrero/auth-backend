# Auth Backend
> Typescript RESTful backend application for User Authentication and Authorizacion.

## Table of Contents
- Auth Backend
  - [Table of Contents](#table-of-contents)
  - [General Information](#general-information)
  - [Features](#features)
  - [Technologies and Techniques used](#technologies-and-techniques-used)
  - [Setup](#setup)
  - [Project Status](#project-status)
  - [Room for Improvement](#room-for-improvement)


## General Information
- This project was created to fullfil the need several Software Engineers have when trying to create a Fullstack Web project from scratch.
- It provides the source code backend template to authenticate and authorize users by exposing RESTful APIs to do so.

## Features
- Username and password signup ✔
- User and password login ✔
- Account verification via email ✔
- Public/open route example ✔
- Route protection with expirable security tokens:
  - Via Autorization header as Bearer token ✔
  - Via cookies ✔
  - Via custom header keys 🔜
- Forgot password 🔜
- Change password 🔜
- User password expiration 🔜
- Account verification via SMS 🔜
- Authentication with Google 🔜

## Technologies and Techniques used

- This project was implenmented 100% with Typescript, Nodejs and Express.
- Authentication is implemented with the [bcryptjs](https://github.com/kelektiv/node.bcrypt.js) library for password encryption and the Local stategy from the [Passport](https://www.passportjs.org/) library.
- Authorization is done with JWT strategy from the Passport library.
- Tokenization is done with [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken).
- ```MongoDB``` and the ```mongoose``` ORM were used for the databse.
- Email service is handled with [nodemailer](https://github.com/nodemailer/nodemailer/) and using gmail as Email server for testing purposes.
- [Cors](https://github.com/expressjs/cors) and [Helmet](https://github.com/helmetjs/helmet) were used to avoid well-known web vulnerabilities.
- [Compression](https://github.com/expressjs/compression) is being used for performance.
- The ```.env``` file is handeled with [dotenv](https://github.com/motdotla/dotenv) and managed by a configurator module to facilitate its usage across the other application modules.
- The project architecture was implemented by enhancing the concepts of [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) to get a more robust architecture with clear separation of concerns:
  
<div style="margin-left: 3rem;" >

```
📦src
 ┣ 📂api  => Main source code container.
 ┃ ┣ 📂controllers  => Orchestrators that use Services and Middlewares to provide a response.
 ┃ ┣ 📂interfaces  => Typescript Interface and Type definitions to be used in the project.
 ┃ ┣ 📂middlewares  => Functions to be executed before the Router's main controllers.
 ┃ ┣ 📂models  => Entity definitions that encapsulate Database and ORM services.
 ┃ ┣ 📂routers  => Routers of the application.
 ┃ ┣ 📂services  => Functions containing the all the Business Logic of the application.
 ┃ ┗ 📂util  => Functions used in across the folders in multiple times.
 ┣ 📂config  => Configuration for the different components of the application.
 ┣ 📂public  => Publicly available resources.
 ┗ 📜index.ts  => Main file that starts the database and the main application.
``` 
</div>

## Setup
1. Clone this project by doing:
```
$ git clone https://github.com/pieroguerrero/jwt-passport-auth.git
```
2. Go to the folder you've just cloned the code and execute:
```
$ npm install
```
**WARNING:** If you are going to use other libraries to achieve other purposes be carefull and remove the caret (^) prefix that the dependency versions have.

3. Create a ```.env``` file in your project's container folder. The file should have the following variables with your own values:
```
#Node Enviromental variable used for performance purposes
NODE_ENV="development"

#APP/SERVER CONFIGS

#Port number to be used by the current application:
PORT="3000"

#DATABASE CONFIGS

#MongoDB full connection string:
MONGODB_URI="<your-own-value-here>"

#JWT TOKEN CONFIGS

#A value to be used as seed by the JWT jsonwebtoken library in order to sign the payload:
SECRET_TOKEN_KEY="<your-own-value-here>"
#Number of iterations for the encryption algotithm:
TOKE_SALT_LENGTH=10
#JWT token expiration time, expressed in seconds or a string describing a time span zeit/ms. Eg: 60, "2 days", "10h", "7d":
JWT_EXPIRATION_IN_SECONDS="<your-own-value-here>"
#When 'true', it will provide and receive the authorization token via the cookies. Otherwhise will handle it via Authorization header with a bearer token:
TOKEN_FROM_COOKIE="false"
#Useful only when TOKEN_FROM_COOKIE is 'true'. This parameter gives a name to the cookie is going to be used to provide and receive the authorization token:
JWT_TOKEN_COOKIE_NAME="<your-own-value-here>"

#EMAIL CONFIGS

#Gmail Email host, commonly: 'smtp.gmail.com':
EMAIL_GMAIL_HOST="smtp.gmail.com"
#Gmail email address to use used as the email sender:
EMAIL_GMAIL_ADDRESS="<your-own-value-here>"
#Gmail email sender password:
EMAIL_GMAIL_PASS="<your-own-value-here>"

```

## Project Status
Project is: _in progress_

## Room for Improvement
There are always room for improvement, in this project so far the thinkgs that can be improved are:
- Unit testing coverage.
- A separate web page for the Docs containing the API catalogs.
