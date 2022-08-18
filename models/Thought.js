const { Schema, Model } = require('mongoose');

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
            default: Date.now(),
            // get: 
        }
    },
    {
        // do I need to have a reference in here to User?
        username: {
            type: String,
            required: true,
        }
    }
    // {
    //     // how???
    //     reactions: [
    //         {
    //         type: Schema.Types.ObjectId,
    //         reactionId: ObjectId
    //        }
    //     ]
    // }
);

thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;