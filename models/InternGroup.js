const mongoose = require('mongoose');

let InternGroup;

try {
    InternGroup = mongoose.model('InternGroup');
} catch (error) {
    const internGroupSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
    });
    InternGroup = mongoose.model('InternGroup', internGroupSchema);
}

module.exports = InternGroup;



