const path = require('path');
const fs = require('fs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'https://localhost:8080'}));

app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../index.html')));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})

module.exports = app;