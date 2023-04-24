const { Schema, model, Types } = require("mongoose");
const { format_date } = require('../utils')

const reactionSchema = new Schema ({
    reactionId: {
       type: Schema.Types.ObjectId,
       default: () => new Types.ObjectId(),
    },
reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
},
username: {
   type: String,
   required: true, 
},
createdAt: {
    type: Date,
    default: Date.now,
    get: (time) => format_date(time),
},
toJSON: {
    virtuals: true,
    getters: true,
},
id: false,
});


const thoughtSchema = new Schema ({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (time) => format_date(time),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
},
{
  toJSON: {
    virtuals: true,
    getters: true,
  },
  id: false,
}

);

thoughtSchema.virtual('reaction').get(function() {
    return this.reactions.length
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;