const express = require('express');
const router = express.Router();
const User = require('../models/user');

// Add contact
router.post('/add', async (req, res) => {
    try {
        let addContact = await User.findByIdAndUpdate(req.body._id, {$push: {Contacts: req.body.contact}}, {new: true})
        res.json(addContact);
} catch (err) {
    res.status(500).json({ message: err.message });
}
});

// Delete contack
router.post('/delete' ,async (req, res) => {
    try {
        let removedContact = await User.findByIdAndUpdate(req.body._id, {$pull: {Contacts: req.body.contact}}, { new: true })
        res.json(removedContact);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
