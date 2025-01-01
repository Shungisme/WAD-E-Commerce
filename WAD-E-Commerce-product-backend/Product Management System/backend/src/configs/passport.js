import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import User from '../../src/apis/v1/models/user.model.js';
import GenerateHelper from '../helpers/generate.helper.js';
import bcrypt from 'bcrypt';
import SendMailHelper from '../helpers/sendMail.helper.js';

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET,
	callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
	passReqToCallback: true,
},
	async (request, accessToken, refreshToken, profile, done) => {
		try {
			let user = await User.findOne({ email: profile.emails[0].value });

			if (!user) {
				const randomPassword = GenerateHelper.generateRandomPassword(20);
				const salt = await bcrypt.genSalt(13);
				const hashedPassword = await bcrypt.hash(randomPassword, salt);

				user = await User.create({
					email: profile.emails[0].value,
					password: hashedPassword,
					name: profile.displayName,
					avatar: profile.photos[0].value
				});

				const mailHelper = new SendMailHelper();
				mailHelper.sendEmail(user.email, user.name, randomPassword);
			}
			return done(null, user);
		} catch (error) {
			return done(error, null);
		}
	})
);

passport.serializeUser((user, done) => {
	done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
	try {
		const user = await User.findOne({ email });
		done(null, user);
	} catch (error) {
		done(error, null);
	}
});

export default passport;

