import Project from "../models/project.js";

export async function getAllProjects(req, res, next) {
    try {
        const projects = await Project.findAll();
        res.json(projects);
    } catch (err) {
        next(err);
    }
}

export async function createProject(req, res, next) {
    try {
        const { name, description, start_date, end_date, status, progress } = req.body;
        const project = await Project.create({
            name,
            description,
            start_date,
            end_date,
            owner_id: req.headers.owner, // req.user.id Assuming req.user contains authenticated user info
            status,
            progress
        });
        res.status(201).json(project);
    } catch (err) {
        next(err);
    }
}

export async function getProjectById(req, res, next) {
    try {
        const projectId = req.params.id;
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.json(project);
    } catch (err) {
        next(err);
    }
}

export async function updateProject(req, res, next) {
    try {
        const projectId = req.params.id;
        const { name, description, start_date, end_date, status, progress } = req.body;
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        await project.update({
            name,
            description,
            start_date,
            end_date,
            status,
            progress
        });
        res.json(project);
    } catch (err) {
        next(err);
    }
}

export async function deleteProject(req, res, next) {
    try {
        const projectId = req.params.id;
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        await project.destroy();
        res.status(204).send(); // No content
    } catch (err) {
        next(err);
    }
}
