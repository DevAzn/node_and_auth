const express = require('express');
const app = express();
require('dotenv').config();
const { auth, requiresAuth } = require('express-openid-connect');
const port = process.env.PORT || 3000;

const config = {

  authRequired: false,
  auth0Logout: true,
  issuerBaseURL: process.env.ISSUER_BASE_URL,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  secret: process.env.SECRET,

};

app.use(auth(config));



// app.get('/', function (req, res, next) {
//     res.render('main', {
//       title: 'Auth0 Webapp sample Nodejs',
//       isAuthenticated: req.oidc.isAuthenticated()
//     });
//   });
  

  module.exports = app;


// req.isAuthenticated is provided from the auth app

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(port, () => {
    console.log("Listening on port " + port);
})