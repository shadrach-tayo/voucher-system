# Voucher-system
A Voucher system application for purchasing vouchers

## To run app locally 
- clone the repository to your local computer
- run ```npm install``` in the root directory 
- on the command line, cd client and run ```npm install```
- after all installs have being completed go back to the root directory 
- run ```npm run dev``` to start both server and client 

## The project uses the **MERN STACK** 
- Mongo 
- Express
- React
- Node

## SERVER
  - The server was built using the express framework for Nodejs
  - The server manages the manual signIN and the Google oAuth sign in
  - Creates new user on signIn if user never existed in the database
  - redirects user to dashboard on sucessful signIN

## CLIENT
  - The client was built with [React](https://reactjs.org) and React-materialize