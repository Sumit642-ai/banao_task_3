const nodemailer = require('nodemailer');

module.exports.sendEmail = async (event) => {
  try {
    const { receiver_email, subject, body_text } = JSON.parse(event.body || '{}');

    if (!receiver_email || !subject || !body_text) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'All fields are required.' }),
      };
    }

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'sumitrau74224@gmail.com',       
        pass: 'eorxpxkhyrarufbi',    
      },
    });

    let info = await transporter.sendMail({
      from: '"Sumit Raut" <sumitrau74224@gmail.com>', 
      to: receiver_email,
      subject: subject,
      text: body_text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Email sent successfully.',
      }),
    };
  } catch (error) {
    console.error('Email error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error.message,
      }),
    };
  }
};
