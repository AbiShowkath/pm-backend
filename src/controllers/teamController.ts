import Project from '../models/project.js';
import User from '../models/user.js';
import ProjectMembers from '../models/ProjectMembers.js';

export async function getAllTeams(req, res, next) {
    try {
        const projects = await Project.findAll({
            include: {
                model: User,
                attributes: { exclude: ['password_hash'] },
            },
        });
        res.json(projects);
    } catch (err) {
        next(err);
    }
}

export async function createTeam(req, res, next) {
    try {
        const { project_id, user_id } = req.body;
        const project = await Project.findByPk(project_id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        // Check if the user is already part of the project
        // if (project.hasUser(user_id)) {
        //     return res.status(409).json({ message: "User is already a member of the project" });
        // }

        const user = await User.findByPk(user_id, {
            attributes: { exclude: ['password_hash'] },
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Add user to the project
        await project.addUser(user);

        // if successful, return the user
        return res.status(201).json(user);
    } catch (err) {
        next(err);
    }
}

export async function getTeamById(req, res, next) {
    try {
        const project_id = req.params.project_id;
        const team = await Project.findOne({
            where: { id: project_id },
            include: {
                model: User,
                attributes: { exclude: ["password_hash"] },
            },
        });
        if (!team) {
            return res.status(404).json({ message: "Team not found" });
        }
        res.json(team);
    } catch (err) {
        next(err);
    }
}

export async function deleteUserFromTeam(req, res, next) {
    try {
        const project_id = req.params.project_id;
        const { user_id } = req.body;

        const project = await Project.findOne({
            where: { id: project_id },
            include: {
                model: User,
                attributes: { exclude: ["password_hash"] },
            },
        });
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        if (project.hasUser(user_id)) {
            project.removeUser(user_id);
            return res.status(200).json({ message: "User removed from project" });
        } else {
            return res.status(404).json({ message: "User not found in project" });
        }
    } catch (err) {
        next(err);
    }
}