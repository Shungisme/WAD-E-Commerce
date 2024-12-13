import Role from '../models/role.model.js'
import { StatusCodes } from 'http-status-codes';

class RoleController {
	static async getAllRoles(req, res) {
		try {
			const roles = await Role.find();
			res.status(StatusCodes.OK).json({
				roles
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async getRoleById(req, res) {
		try {
			const { id } = req.params;
			const role = await Role.findById(id);
			if (!role) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Role not found'
			});
			res.status(StatusCodes.OK).json({
				role
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async createRole(req, res) {
		try {
			const role = new Role(req.body);
			await role.save();
			res.status(StatusCodes.CREATED).json({
				role
			});
		} catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async updateRole(req, res) {
		try {
			const { id } = req.params;
			const role = await Role.findByIdAndUpdate(id, req.body, { new: true });
			if (!role) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Role not found'
			});
			res.status(StatusCodes.OK).json({
				role
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}

	static async deleteRole(req, res) {
		try {
			const { id } = req.params;
			const role = await Role.findByIdAndUpdate(id, { status: 'inactive' }, { new: true });
			if (!role) return res.status(StatusCodes.NOT_FOUND).json({
				error: 'Role not found'
			});
			res.status(StatusCodes.OK).json({
				message: 'Role deleted successfully'
			});
		}
		catch (error) {
			res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
				error: error.message
			});
		}
	}
}

export default RoleController;