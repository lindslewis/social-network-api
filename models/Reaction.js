const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');
const { Thought, User } = require('../models');

const reactionSchema = new Schema (
    {
        reactionBody: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280,
        },

        username: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            },
        ],
    },
    {
        createdAt: {
            type: Date,
            default: Date.now,
            toJSON: {
                getters: true,
            }
        },
    }
)
