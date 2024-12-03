import User from '../models/user.model.js';

class UserController {
	static async login(req, res) {
		res.send('Login');
	}

	static async register(req, res) {
		res.send('Register');
	}

	static async logout(req, res) {
		res.send('Logout');
	}
}


export default UserController;