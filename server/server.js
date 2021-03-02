const express = require('express');
const path = require('path');
const jobsRouter = require('./routes/jobs');

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../secret.js');
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

const app = express();

const PORT = 3000;

app.use(express.json());

app.use('/build', express.static(path.join(__dirname, '../build')));

app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

/*******************************************************************************************************/
passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }
  )
);

// app.get('/account', ensureAuthenticated, function (req, res) {
//   res.render('account', { user: req.user });
// });

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] }),
  function (req, res) {}
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

/*******************************************************************************************************/

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
