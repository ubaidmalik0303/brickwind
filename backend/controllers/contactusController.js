const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorHandler");
const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    service: process.env.SMPT_SERVICE,
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    auth: {
      user: process.env.SMPT_MAIL,
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOption = {
    from: options.email,
    to: process.env.SMPT_MAIL,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOption);
};

exports.contactus = catchAsyncError(async (req, res, next) => {
  try {
    await sendEmail({
      subject: req.body.subject,
      email: req.body.email,
      message: `Name: ${req.body.name} <br> Email: ${req.body.email} <br> Message: ${req.body.message}`,
    });

    res.status(200).json({
      success: true,
      message: `Your Message Successfully Send`,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
