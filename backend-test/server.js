// server.js
const express = require('express');
const nodemailer = require('nodemailer');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors());
app.use(express.json());


// Replace these values with your Amazon SES SMTP credentials
const sesTransporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-2.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: 'AKIARVOYC3HBH57RXIP6', // Replace with your SMTP username
    pass: 'BMQ/4vh42vZezgF31B4F0hJSuXlmgJz5hZhPilbCHXJ+', // Replace with your SMTP password
  },
});

app.post('/create-appointment', (req, res) => {
  // Extract user input from the request body
  const {netId, email, reason, meetingType, selectedDate, selectedTime} = req.body;

  // Use the sesTransporter for sending appointment email using Amazon SES
  const mailOptions = {
    from: 'noreplytester05@gmail.com', 
    to: email,
    subject: 'Advising Appointment Confirmation',
    text: `Dear ${netId},\n\nYour advising appointment has been scheduled ${meetingType.toLowerCase()}\nfor ${selectedDate} \nat ${selectedTime}`,
  };

  sesTransporter.sendMail(mailOptions, (error, info) => {
    console.log('Request Body:', req.body);
    if (error) {
      console.error(error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent successfully');
      res.status(200).json({ message: 'Email sent successfully' });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
