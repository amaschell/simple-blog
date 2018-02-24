import React from 'react';

const rrd = require('react-router-dom');
// Just render plain div with its children.
// This is needed for properly mocking the BrowserRouter for tests.
rrd.BrowserRouter = ({children}) => <div>{children}</div>;

module.exports = rrd;