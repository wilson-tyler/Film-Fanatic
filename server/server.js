const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cookieParser());
server.use(cors({ origin: 'https://localhost:8080'}));

server.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));





server.use('*', (req, res) => res.status(404).send('404 Error: Page not found'))

server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Caught by global error handler. Unkown middleware handler.',
    status: 400,
    message: {err: 'An error occured'}
  };
  const errorObj = Object.assign(defaultErr, err);
  return res.status(errorObj.status).send(errorObj.message);
})



server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = server;