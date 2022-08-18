const { Schema, Model } = require('mongoose');
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
        thoughts: [thoughtSchema] 
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


const User = mongoose.Model('user', userSchema);

module.exports = User;