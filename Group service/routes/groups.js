const express = require('express');
const router = express.Router();
const Group = require('../models/group');

// Add group
router.post('/add', async (req, res) => {
    try {
        let newGroup = new Group ({
            ...req.body
        });
        // Check if group exits
        let dublicateCheck = await Group.findOne({groupName: newGroup.groupName});
        if (dublicateCheck) {
            return res.json({success: false, msg: 'Group name already in use'})
        }
        await newGroup.save();
        res.status(500).json(newGroup);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Delete group
router.post('/delete' ,async (req, res) => {
    try {
        await Group.findByIdAndDelete(req.body._id)
        res.json({message: "group deleted"});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;