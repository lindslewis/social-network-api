const { Schema, Model, default: mongoose } = require('mongoose');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            minLength: 1,
            maxLength: 280,
            required: true,
        }
    },
    {
        // not sure how to do the getter
        createdAt: {
            type: Date,
            default: Date.now,
            // get: 
        }
    },
    {
        // do I need to have a reference in here to User?
        username: {
            type: String,
            required: true,
        }
    },
    {
        // this is a subdoc schema, not sure if I laid it out right though
        reactions: [
            {
            type: Schema.Types.ObjectId,
            reactionId: mongoose.ObjectId,
            reactionBody:{
                type: String,
                required: true,
                minLength: 1,
                maxLength: 280,
            },
            username: {
                type: String,
                required: true,
            },
            // getter method here too
            createdAt: {
                type: Date,
                default: Date.now,
            }
           }
        ]
    }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = Model('thought', thoughtSchema);

module.exports = Thought;