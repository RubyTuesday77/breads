// DEPENDENCIES:
const mongoose = require('mongoose')
const Bread = require('./bread')

// Create shorthand for the Schema constructor:
const { Schema } = mongoose


// Define schema using the Schema constructor, saved as variable bakerSchema:
const bakerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            enum: ['Rachel', 'Monica', 'Joey', 'Chandler', 'Ross', 'Phoebe']
        },
        startDate: {
            type: Date,
            required: true
        },
        bio: String
    },
    { 
        toJSON: { virtuals: true }
    }
);


// Virtuals:
bakerSchema.virtual('breads', {
    ref: 'Bread',
    localField: '_id',
    foreignField: 'baker'
})


// Hooks:
bakerSchema.post('findOneAndDelete', function() {
    Bread.deleteMany({ baker: this._conditions._id })
        .then(deleteStatus => {
            console.log(deleteStatus)
        })
})            


// Create Baker model under the schema:
const Baker = mongoose.model('Baker', bakerSchema)


// Export model (not schema) to use in bakers controller
module.exports = Baker