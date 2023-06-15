const mongoose = require('mongoose');

let Tutorial;

try {
    Tutorial = mongoose.model('Tutorial');
} catch (error) {
    const tutorialSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        groupId: {
            type: mongoose.Types.ObjectId,
            ref: 'InternGroup',
            required: true,
        },
    });
    Tutorial = mongoose.model('Tutorial', tutorialSchema);
}

module.exports = Tutorial;



