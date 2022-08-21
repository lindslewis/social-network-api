const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
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
    // {
    //     toJSON: {
    //         getters: true,
    //     },
    //     id:false
    // },
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

const Thought = mongoose.model('thought', thoughtSchema);

module.exports = Thought;

// needed routes
// /api/thoughts
// get all thoughts  --seems to work
// get a single thought by it's _id -- does not grab, doesn't recognize the id
// post a new thoughtwith thought _id pushed to user's thoughts array field -- can create but isn't pushing
// put to update a thought by it's id-- can update
// delete to remove --500 internal error, but is actually deleting the thought, regardless

// api/thoughts/:thoughtId/reactions
// post to create a reaction stored in thought's array reactions field
// delete to pull and remove a reaction by the reactionId value


// am I going to need to use an aggregate??? look into it for pushing the thoughts and reactions to users
