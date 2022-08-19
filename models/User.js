const { Schema, model } = require('mongoose');
const mongoose = require('mongoose')
const thoughtSchema = require('./Thought');

const userSchema = new mongoose.Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        }
    },
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                // think I'm gonna need to use a custom validator function, found the regex pattern from regex libraries. .test tests for a match
                validator: function(v) {
                    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
                },
                message: props => `${props.value} is not a valid email address!`
            },
        }
    },
    {
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ] 
    },
    {                                                                                 
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],                                                         
    }

);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});


const User = mongoose.model('user', userSchema);

module.exports = User;

// needed routes for api/users

// get all users -- so far this one works
// get a single user by it's _id -- seems to work
// post a new user-- so far this one works too. 
// put to update a user by it's _id --this works
// delete user (bonus to have it also removed a user's thoughts when their account is deleted) -- does not work, get a 404. doesn't recognize id

// routes for api/users/:userId/friends/:friendId
// post to add a new friend to a friend list
// delete to remove the friend