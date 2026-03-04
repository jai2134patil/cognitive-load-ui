const mongoose = require("mongoose");

const interactionSchema = new mongoose.Schema({

typingSpeed:Number,
backspaces:Number,
mouseSpeed:Number,
tabSwitches:Number,
loadScore:Number,
timestamp:{
type:Date,
default:Date.now
}

});

module.exports = mongoose.model("Interaction", interactionSchema);