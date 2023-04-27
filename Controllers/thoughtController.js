const Thought = require("../Models/Thoughts");
const User = require("../Models/User");

module.exports = {
  async getThoughts(res, req) {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
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
  async createThought(req, res) {
    try {
      const dbThoughtData = await Thought.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: "No thoughts with this id!" });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({
        _id: req.params.id,
      });

      if (!thought) {
        res.status(404).json({ message: "No thoughts with that ID" });
      }

      await User.deleteMany({ _id: { $in: thought.username } });
      res.json({ message: "thought and user deleted!" });
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
