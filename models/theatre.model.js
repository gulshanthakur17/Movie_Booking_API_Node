const mongoose = require('mongoose');

/**
 * Define the schema of the theatre resource to be stored in the db
 */

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: StaticRange,

    city: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true
    },
    address: String

},  {timestamps: true});


const Theatre = mongoose.model('Theatre', theatreSchema);

module.exports = Theatre;