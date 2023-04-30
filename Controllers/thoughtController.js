const Thought = require("../Models/Thoughts");
const User = require("../Models/User");
// All of this was heavily inspired by the mini project.
// All of these function will be individually exported by referencing the function names in the routes folder.
module.exports = {
  async getThoughts(req, res) {
    Thought.find({})
    .populate({
      path: "reactions",
      select: "-__v",
    })
    .select("-__v")
    .sort({ _id: -1 })
    .then((dbThoughtData) => res.json(dbThoughtData))
    .catch((err) => {
      console.log(err);
      res.send(400);
    });
},
// This will pull a single id.
  async getSingleThoughts(req, res) {
    try {
      const thoughts = await Thought.findOne({
        _id: req.params.id,
      }).select("-__v");

      if (!thoughts) {
        return res.status(404).json({ message: "No thoughts with that ID" });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // This should create a new thought by reguiring the data to be parsed into a readable form.
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// This function will find a certain id and update the information under the id.
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thoughts with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// This will find an id and allow for it to be deleted.
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thought) {
        res.status(404).json({ message: "No thoughts with that ID" });
      }
      await User.findOneAndUpdate({ _id: { $in: thought.id } });
      res.json({ message: "thought and user deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addReaction(req, res) {
    console.log(req.body);

    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: body }},
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No thought found any id resembling that' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
// This will delete the submodel of thoughts by id.
  async deleteReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactionId: req.params.reactionId }},
        { new: true }
      );

      if (!thought) {
        return res
          .status(404)
          .json({ message: 'No reaction found with that ID :(' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};