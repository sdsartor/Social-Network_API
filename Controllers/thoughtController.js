const Thought = require('../Models/Thoughts');

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
      const thoughts = await thoughts.findOne({ _id: req.params.thoughtId });

      if (!thoughts) {
        return res.status(404).json({ message: 'No thoughts with that ID' });
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async createThought(req, res) {
    try {
      const dbThoughtData = await User.create(req.body);
      res.json(dbThoughtData);
    } catch (err) {
      res.status(500).json(err)
    }
  },
};
