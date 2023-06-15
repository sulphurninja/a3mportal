const mongoose = require('mongoose');

let Task;

try {
    Task = mongoose.model('Task');
} catch (error) {
    const taskSchema = new mongoose.Schema({
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
    Task = mongoose.model('Task', taskSchema);
}

module.exports = Task;



