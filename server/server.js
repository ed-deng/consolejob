const express = require('express');
const path = require('path');
const jobsRouter = require('./routes/jobs');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

app.use('/jobs', jobsRouter);

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).send(errorObj.message);
});

app.listen(3000, () => console.log(`Listening on PORT ${PORT}`));
