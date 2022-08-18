const { User, Thought } = require('../models');

module.exports = {
    // find all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    },
    // find a singular thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.id })
            .select('thought')
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with that ID" })
                : Reactions.deleteMany({ _id: { $in: thought.reactions }})
            )
            .then(() => res.json({ message: "Thought and reactions deleted!" }))
            .catch((err) => res.status(500).json(err));
    },
    // update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with this ID' })
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};