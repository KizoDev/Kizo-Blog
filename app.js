const express = require('express');
const app = express();
const connectDB = require('./db/connect');
require('dotenv').config();
const {TOKEN_SECRET} = require('./key')
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const routeruser = require('./routes/user');
const routerpost = require('./routes/post');
const routercomment = require('./routes/comment');
const routerget = require('./routes/get');
const routergetuser = require('./routes/getuser');
// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// routes

app.use('/api/v1', routeruser);
app.use('/api/v1', routerpost);
app.use('/api/v1', routercomment);
app.use('/api/v1', routerget);
app.use('/api/v1', routergetuser);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 6000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
