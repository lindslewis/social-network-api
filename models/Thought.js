const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { Reaction, User } = require('../models');

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

        createdAt: {
            type: Date,
            default: Date.now,
            // get: ex: something => thefuncFromOtherFile(something)
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
        // Hint: we need a new model in ./models/Reactions.js -> import model into this file -> [modelname]
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
                },
                // add toJson: {getters:boolean?}
           },
        ]
    },
    {
        toJSON: {
            getters:true,
            virtuals:true,
        },
        id: false,
    },
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
// post to create a reaction stored in thought's array reactions field-- posting the information, but not seeing it anywhere
// delete to pull and remove a reaction by the reactionId value - got a 200 ok but not sure how to check if it actually did it since the rest of my stuff isn't pulling up


// am I going to need to use an aggregate??? look into it for pushing the thoughts and reactions to users
