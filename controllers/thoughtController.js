const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');


const thoughtCount = async () =>
    Thought.aggregate()
        .count('reactionCount')
        .then((numberOfReactions) => numberOfReactions);
// aggregate function to collect user reactions???
const reactions = async (thoughtId) => 
    Thought.aggregate([
        // matching to only a single thought
        { $match: { _id: ObjectId(thoughtId)}},
        // deconstructing the array
        { $unwind: '$thoughts', },
        {
            $group: {
                _id: ObjectId(thoughtId),
            }
        }
    ])


module.exports = {
    // find all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then(async (thoughts) => {
                const thoughtObj ={
                    thoughts,
                    thoughtCount: await thoughtCount(),
                };
                return res.json(thoughtObj);
            })
            .catch((err) => {
                console.log(err);
                return res.status(500).json(err);
            });
    },
    // find a singular thought
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select('-__v')
            .populate('reactions')
            .then(async (thought) => 
            !thought
                ? res.status(404).json({ message: 'No thought with that ID' })
                : res.json({
                    thought,
                    reactions: await reactions(req.params.reactionId)
                })
            )
            .catch((err) => {
                console.log(err);
                 return res.status(500).json(err);
            });
    },
    // create a thought
    // does it need to be async??
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: thought.reactions.reactionId }},
                    { new: true }
                );
            })
            .then((User) => 
            !User
                ? res.status(404).json({
                    message: "No user found with that ID"
                })
                : res.json('Posted new thought!')
            )
            .catch((err) => res.status(500).json(err));
            console.log(err)
            // .catch((err) => {
            //     console.log(err);res.status(500).json(err);
            // }); 
    },
    // delete a thought
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
            .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought with that ID" })
                : reactions.deleteMany({ _id: { $in: thought.reactions }})
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
    // post a reaction (I think it's here???)
    // this doesn't feel right, especially the spot that it sets at
    //  /api/thoughts/:thoughtId/reactions
    createReaction(req, res) {
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { thought: req.body}},
            { runValidators: true, new: true }
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ message: "No thought found with that ID"})
                : res.json(thought)
            )
            .catch((err) => res.status(500).json(err)); 
    },

    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId} } },
            { runValidators: true, new: true } 
        )
        .then((thought) => 
            !thought
                ? res
                    .status(404).json({ message: "No thought found with this ID"})
                : res.json(thought)
        )
       .catch((err) => res.status(500).json(err));
    },
};