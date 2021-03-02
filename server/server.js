const express = require('express');
const path = require('path');
const jobsRouter = require('./routes/jobs');
const db = require('./db/model');
// const cors = require('cors');

const { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET } = require('../secret.js');
const GitHubStrategy = require('passport-github2').Strategy;
const passport = require('passport');

const app = express();

const PORT = 3000;

app.use(express.json());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

// const corsOptions = {
// credentials: true,
// };

// app.use(cors(corsOptions));

app.use('/build', express.static(path.join(__dirname, '../build')));

app.use('/jobs', jobsRouter);

/*******************************************************************************************************/

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:8080/auth/github/callback',
    },
    async function (accessToken, refreshToken, profile, done) {
      // asynchronous verification, for effect...
      const findUser = 'SELECT * FROM users WHERE gh_id = $1';
      const params = [profile.id];
      let user = await db
        .query(findUser, params)
        .then((data) => data.rows[0])
        .catch((err) => {
          throw new Error(err);
        });
      if (!user) {
        const createUser = `
          INSERT INTO users (gh_id, username, profile_url, display_name, photo_url)
          VALUES ($1, $2, $3, $4, $5)
          RETURNING *
        `;
        const createUserParams = [
          profile.id,
          profile.username,
          profile.profileUrl,
          profile.displayName,
          profile._json.avatar_url,
        ];
        user = await db
          .query(createUser, createUserParams)
          .then((data) => data.rows[0])
          .catch((err) => {
            throw new Error(err);
            // return next({
            //   log: `Express error handler caught in jobsController.editJobs ${err}`,
            // });
          });
      } else {
        const updateUser = `
          UPDATE users
          SET username = $2, profile_url = $3, display_name = $4, photo_url = $5
          WHERE gh_id = $1
          RETURNING *
        `;
        const updateUserParams = [
          profile.id,
          profile.profileUrl,
          profile.username,
          profile.displayName,
          profile._json.avatar_url,
        ];
        user = await db
          .query(updateUser, updateUserParams)
          .then((data) => data.rows[0])
          .catch((err) => {
            throw new Error(err);
          });
      }
      return done(null, user);
    }
  )
);

// app.get('/account', ensureAuthenticated, function (req, res) {
//   res.render('account', { user: req.user });
// });

// app.get('/login', function (req, res) {
//   res.render('login', { user: req.user });
// });

app.get(
  '/auth/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

app.get(
  '/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/loginpage' }),
  function (req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

/*******************************************************************************************************/

app.get('/*', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/index.html'));
});

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
