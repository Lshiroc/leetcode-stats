const cors = require('cors');
const express = require('express');
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
  origin: "http://127.0.0.1:5500"
}))

const usersRouter = require('./routes/user');
app.use('/user', usersRouter);

const lightRouter = require('./routes/light');
app.use('/light', lightRouter);

const darkRouter = require('./routes/dark');
app.use('/dark', darkRouter);

app.listen(PORT, () => console.log("Server is up on localhost:8000"));

