const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { Thought, User } = require('../models');

const reactionSchema = new Schema (
    {
        reaction_id: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },

        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        username: {
                type: String,
                required: true,
        },

        createdAt: {
            type: Date,
            default: Date.now,

        },
    },
    {
        toJSON: {
            getters: true,
        },
    }
);

// const Reaction = mongoose.model('reaction', reactionSchema);

module.exports = reactionSchema;
