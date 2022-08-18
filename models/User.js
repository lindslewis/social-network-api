const { Schema, model } = require('mongoose');

const userSchema = new User (
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
                // think I'm gonna need to use a custom validator function, found the regex pattern from regex libraries
                validator: function(v) {
                    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(v);
                },
                message: props => `${prop.value} is not a valid email address!`
            },
        }
    },
    {
        
    }

)