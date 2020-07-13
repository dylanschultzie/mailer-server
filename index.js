const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
    },
    (accessToken) => {
      console.log(accessToken);
    }
  )
);

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.get('/auth/:service', (req, res) => {
  res.send('Auth time! ' + req.params.service);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Server started on port:' + PORT);
});
