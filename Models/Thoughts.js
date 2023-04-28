const { Schema, model, Types, default: mongoose } = require("mongoose");
const moment = require('moment');




const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId, 
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm:a')
    }
}, {
    toJSON: {
        getters: true
    },
    id: false
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
        get: createdAtVal => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a'),
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
    getters: true
  },
  id: false
}

);


const thought = mongoose.model("Thought", thoughtSchema);

const newThought = new thought({
    thoughtText: 'Test text',
    username: 'moneyball',
})

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema)

module.exports = Thought;