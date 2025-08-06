const express = require('express');
const router = express.Router();
const {
    createMilestone,
    getAllMilestones,
    getMilestoneById,
    updateMilestone,
    deleteMilestone,
    getMilestonesWithProject,
    getMilestonesByProjectId
} = require('../controllers/milestoneController.ts');
const authenticate = require('../middleware/auth');

// Milestone routes
router.get('/with-project', authenticate, getMilestonesWithProject);
router.get('/project/:project_id', authenticate, getMilestonesByProjectId);
router.post('/', authenticate, createMilestone);
router.get('/', authenticate, getAllMilestones);
router.get('/:id', authenticate, getMilestoneById);
router.put('/:id', authenticate, updateMilestone);
router.delete('/:id', authenticate, deleteMilestone);

module.exports = router;
