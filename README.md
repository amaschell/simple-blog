# Simple Blog

A normal blog with a simple but lovely design, exhibiting all basic core features one would expect from a 
blog. 

This blog was built with the [React.js](https://reactjs.org/) library and bootstrapped with
[Create React App](https://github.com/facebook/create-react-app).




## To run it locally on your machine

### Prerequisites

You need to have [npm](https://www.npmjs.com/) installed.

To install then all needed dependencies inside your local project, simply run:

```sh
npm install
```


### Running the application

To run the application, just execute the following command in the root directory of your local project:
```sh
npm start
```

`create-react-app` will then start everything for you and open the blog's URL `http://localhost:3000/` in 
your default browser automatically.


### Running tests 

For this project, there exists a full test suite of unit tests. They have been written with
[Jest](https://facebook.github.io/jest/) (The configured default test runner for `create-react-app`) and the additional
testing utility [Enzyme](https://github.com/airbnb/enzyme).

To launch **Jest** in the watch mode inside your console, just execute the following command:

```sh
npm test
```
 

### Using a local server for back end requests

There is a minimalistic and simple server for this blog called 
[simple-server](https://github.com/amaschell/simple-server) that can be started locally on your machine. 

All requests made by the 
blog to the server, including the default base URL `http://localhost:3001`, are configured under 
`simple-blog/src/config/requestsUtility.js`.
 
 

## Note

For more information, please consult the [Create React App docs](https://github.com/facebook/create-react-app/).

