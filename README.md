# Simple Blog

A normal blog with a simple but lovely design, exhibiting all basic core functionality one would expect from a 
blog (Amongst others: A landing page, a listing of posts, a page to view each entire post entry, an about page, 
a contact form).

This blog was built with the [React.js](https://reactjs.org/) library and bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).




## To run it locally on your machine

### Prerequisites

You need to have [npm](https://www.npmjs.com/) installed.

Then run `npm install` to install all needed dependencies inside your local project.


### Running the application

To run the application, just execute `npm start` in the root directory of your local project. `create-react-app` will 
then start everything for you and open the blog's URL `http://localhost:3000/` in your default browser automatically.


### Running tests 

For this project, there exists a full test suite of unit tests. They have been written with
[Jest](https://facebook.github.io/jest/) (The configured default test runner for `create-react-app`) and the additional
testing utility [Enzyme](https://github.com/airbnb/enzyme).
 
Executing `npm test` in the root directory of your local project will launch Jest in the watch mode inside your console.


### Using a local server for back end requests

There is a minimalistic and simple server for this blog called 
[Simple Server](https://github.com/amaschell/simple-server) that can be started locally on your machine. 

All requests made by the 
blog to the server, including the default base URL `http://localhost:3001`, are configured under 
`simple-blog/src/config/requestsUtility.js`.
 
 

## Note

For more information, please consult the [Create React App docs](https://github.com/facebook/create-react-app/).

