const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'zabideen639@gmail.com', // Replace with your Gmail email
    pass: 'theginyuforce05', // Replace with your Gmail password
  },
});

app.post('/api_male_orders_notifications.php', (req, res) => {
  const {name, adress, cell, product} = req.body;

  const mailOptions = {
    from: 'zabideen639@gmail.com',
    to: 'muhammadzainulabideen292@gmail.com',
    subject: 'New Order Received',
    text: `New order from ${name} for ${product}. Details:\nName: ${name}\nAddress: ${adress}\nCell: ${cell}\nProduct: ${product}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({success: false, error: error.message});
    } else {
      console.log('Email sent successfully:', info.response);
      res.json({success: true});
    }
  });
});

app.post('/api_female_orders_notifications.php', (req, res) => {
  const {name, adress, cell, product} = req.body;

  const mailOptions = {
    from: 'zabideen639@gmail.com',
    to: 'muhammadzainulabideen292@gmail.com',
    subject: 'New Order Received',
    text: `New order from ${name} for ${product}. Details:\nName: ${name}\nAddress: ${adress}\nCell: ${cell}\nProduct: ${product}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error.message);
      res.status(500).json({success: false, error: error.message});
    } else {
      console.log('Email sent successfully:', info.response);
      res.json({success: true});
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
