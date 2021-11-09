const express = require('express');

const app = express();

const port = 3000;
const Nodemailer = require('./nodemailer');

app.use(express.urlencoded());
app.use(express.json());

app.post('/api/email-send', async (req, res) => {
  try {
    const { email, name } = req.body;
    await new Nodemailer({ name }, email, 'Welcome').sendMail();
    return res.json({
      success: true,
      message: 'Email Send Successfully',
  });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      success: false,
      message: err,
    });
  }
});

app.listen(port, (err, res) => {
  if (err) {
    console.log(`error to fire up the server: ${err}`);
    return;
  }
  console.log(`server is running on port : ${port}`);
});

module.exports = app;