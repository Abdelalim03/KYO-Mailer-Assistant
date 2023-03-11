const express = require('express');
const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const app = express();

const GOOGLE_CLIENT_ID = '';
const GOOGLE_CLIENT_SECRET = '';
const GOOGLE_REDIRECT_URL = 'http://localhost:3000/auth/google/callback';

const oauth2Client = new OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REDIRECT_URL
);

app.get('/auth/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/userinfo.email', 'https://www.googleapis.com/auth/userinfo.profile']
  });
  res.redirect(url);
});

app.get('/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    const { data } = await google.oauth2('v2').userinfo.get({ auth: oauth2Client });
    // The 'data' object contains the user's profile information
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});