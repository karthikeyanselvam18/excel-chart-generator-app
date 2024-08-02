const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const DataSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Schema.Types.Mixed, // Allows for flexible data types
        required: true
    }
});

module.exports = mongoose.model('Data', DataSchema);
