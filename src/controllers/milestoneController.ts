const Milestone = require('../models/milestone');
const Project = require('../models/project');

// Create a new milestone
exports.createMilestone = async (req, res, next) => {
    try {
        const { project_id, name, description, due_date } = req.body;
        const milestone = await Milestone.create({ project_id, name, description, due_date });
        res.status(201).json(milestone);
    } catch (error) {
        next(error);
    }
};

// Get all milestones
exports.getAllMilestones = async (req, res, next) => {
    try {
        const milestones = await Milestone.findAll();
        res.status(200).json(milestones);
    } catch (error) {
        next(error);
    }
};

// Get milestone by ID
exports.getMilestoneById = async (req, res, next) => {
    try {
        const milestone = await Milestone.findByPk(req.params.id);
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        res.status(200).json(milestone);
    } catch (error) {
        next(error);
    }
};

exports.getMilestonesByProjectId = async (req, res, next) => {
    try {
        const milestones = await Milestone.findAll({ where: { project_id: req.params.project_id } });
        res.status(200).json(milestones);
    } catch (error) {
        next(error);
    }
};

// Update milestone (only description and due_date)
exports.updateMilestone = async (req, res, next) => {
    try {
        const { description, due_date } = req.body;
        const milestone = await Milestone.findByPk(req.params.id);
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        await milestone.update({ description, due_date });
        res.status(200).json(milestone);
    } catch (error) {
        next(error);
    }
};

// Delete milestone
exports.deleteMilestone = async (req, res, next) => {
    try {
        const milestone = await Milestone.findByPk(req.params.id);
        if (!milestone) {
            return res.status(404).json({ message: 'Milestone not found' });
        }
        await milestone.destroy();
        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

// Get milestones with project details
exports.getMilestonesWithProject = async (req, res, next) => {
    try {
        const milestones = await Milestone.findAll({
            include: [{ model: Project, attributes: ['id', 'name'] }]
        });
        res.status(200).json(milestones);
    } catch (error) {
        next(error);
    }
};
