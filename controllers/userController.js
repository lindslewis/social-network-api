const { User, Thought, Reaction } = require('../models');

module.exports = {
    // find all users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    // find singular user
    // getSingleUser(req, res) {
    //     User.findOne({ _id: req.params.userId})
    //         .select('-__v')
    //         .then(async (user) => 
    //         !user
    //             ? res.status(404).json({ message: 'No user with that ID'})
    //             : res.json({
    //                 user,
    //                 thought: await Thought(req.params.userId),
    //             })    
    //         )
    //         .catch((err) => {
    //             console.log(err);
    //             return res.status(500).json(err);
    //         });
    // },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with that ID'})
                : res.json(user)    
            )
            .catch((err) => res.status(500).json(err)
           );
    },
    // create new user
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) => 
            !user
                ? res.status(404).json({ message: "No user with that ID" })
                : Thought.deleteMany({ _id: { $in: user.thoughts }})
            )
            .then(() => res.json({ message: "User and thoughts deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    // update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(404).json({ message: 'No user with this ID' })
                : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    // add a friend
    addFriend(req, res) {
        User.findByIdAndUpdate(
        // User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.body } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res.status(404).json({ message: "No user found with this ID"})
                    : res.json(user)
            )
            .catch((err) => res.status(500).json(err)); 
        // User.findOne({ _id: req.params.postId })
        //     .then((user) => {
        //     if (!user)
        //         // ? res.status(404).json({message: "no users with that ID"})
        //         // : res.json()
        //     else
            
        //     }) 
        // User.findOneAndUpdate(
        //     { _id: req.params.userId},
        //     { }
        // )
    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: { friendId: req.params.friendId } } },
            { runValidators: true, new: true }
        )
            .then((user) => 
                !user
                    ? res
                        .status(404).json({ message: 'No user found with this ID' })
                        : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
};
