import nodemailer from 'nodemailer';

class SendMailHelper {
	constructor() {
		this.transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL_USER,
				pass: process.env.EMAIL_PASSWORD
			}
		});
	};

	sendEmail = async (to, userName, randomPassword) => {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: to,
			subject: 'Your New Account and Random Password',
			html: `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Welcome to WAD-E-Commerce</title>
						<style>
							body {
								font-family: Arial, sans-serif;
								margin: 0;
								padding: 0;
								background-color: #f4f4f4;
							}
							.container {
								width: 100%;
								max-width: 600px;
								margin: 0 auto;
								padding: 20px;
								background-color: #fff;
								border-radius: 8px;
								box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
							}
							.header {
								text-align: center;
								padding-bottom: 20px;
								border-bottom: 1px solid #eee;
							}
							.header h1 {
								font-size: 28px;
								color: #333;
							}
							.body {
								padding: 20px 0;
								font-size: 16px;
								line-height: 1.5;
								color: #555;
							}
							.body p {
								margin: 10px 0;
							}
							.footer {
								text-align: center;
								margin-top: 20px;
								font-size: 12px;
								color: #777;
							}
							.cta-button {
								display: inline-block;
								padding: 12px 25px;
								background-color: #4CAF50;
								color: #fff;
								text-decoration: none;
								border-radius: 5px;
								font-size: 16px;
								margin-top: 20px;
							}
							.cta-button:hover {
								background-color: #45a049;
							}
							.highlight {
								color: #4CAF50;
								font-weight: bold;
							}
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h1>Welcome to WAD-E-Commerce!</h1>
							</div>
							<div class="body">
								<p>Dear <strong>${userName}</strong>,</p>
								<p>Thank you for signing up with us! We're excited to have you on board.</p>
								<p>Your account has been successfully created. Below is your randomly generated password:</p>
								<p><strong>Your Password: <span class="highlight">${randomPassword}</span></strong></p>
								<p>Please use the above password to log in and change it after signing in for security reasons.</p>
								<a href="http://localhost:3000/login" class="cta-button">Go to Login</a>
							</div>
							<div class="footer">
								<p>If you did not request an account, please ignore this email.</p>
								<p>&copy; 2024 WAD-E-Commerce. All rights reserved.</p>
							</div>
						</div>
					</body>
				</html>
			`,
		};
		try {
			await this.transporter.sendMail(mailOptions);
			console.log('Email sent successfully');
		} catch (error) {
			console.error('Error sending email:', error);
		}
	};

	sendVerificationCode = async (to, code, type) => {
		const mailOptions = {
			from: process.env.EMAIL_USER,
			to: to,
			subject: 'Your Verification Code',
			html: `
				<!DOCTYPE html>
				<html lang="en">
					<head>
						<meta charset="UTF-8">
						<meta name="viewport" content="width=device-width, initial-scale=1.0">
						<title>Verification Code</title>
						<style>
							body {
								font-family: Arial, sans-serif;
								margin: 0;
								padding: 0;
								background-color: #f4f4f4;
							}
							.container {
								width: 100%;
								max-width: 600px;
								margin: 0 auto;
								padding: 20px;
								background-color: #fff;
								border-radius: 8px;
								box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
							}
							.header {
								text-align: center;
								padding-bottom: 20px;
								border-bottom: 1px solid #eee;
							}
							.header h1 {
								font-size: 28px;
								color: #333;
							}
							.body {
								padding: 20px 0;
								font-size: 16px;
								line-height: 1.5;
								color: #555;
							}
							.body p {
								margin: 10px 0;
							}
							.footer {
								text-align: center;
								margin-top: 20px;
								font-size: 12px;
								color: #777;
							}
							.cta-button {
								display: inline-block;
								padding: 12px 25px;
								background-color: #4CAF50;
								color: #fff;
								text-decoration: none;
								border-radius: 5px;
								font-size: 16px;
								margin-top: 20px;
							}
							.cta-button:hover {
								background-color: #45a049;
							}
							.highlight {
								color: #4CAF50;
								font-weight: bold;
							}
						</style>
					</head>
					<body>
						<div class="container">
							<div class="header">
								<h1>Your Verification Code</h1>
							</div>
							<div class="body">
								<p>Your verification code is: <strong class="highlight">${code}</strong></p>
								${type === 'verify' ? `<p>Please use this code to verify your account. It will expire in 5 minutes.</p>` : ''}
								${type === 'change-password' ? `<p>Please use this code to change your password. It will expire in 5 minutes.</p>` : ''}
								${type === 'reset-password' ? `<p>Please use this code to reset your password. It will expire in 5 minutes.</p>` : ''}
								
							</div>
							<div class="footer">
								<p>If you did not request this code, please ignore this email.</p>
								<p>&copy; 2024 WAD-E-Commerce. All rights reserved.</p>
							</div>
						</div>
					</body>
				</html>
			`,
		};
		try {
			await this.transporter.sendMail(mailOptions);
			console.log('Email sent successfully');
		} catch (error) {
			console.error('Error sending email:', error);
		}
	}
}

export default SendMailHelper;