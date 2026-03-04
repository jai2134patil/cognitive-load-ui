const Interaction = require("../models/interaction");

exports.calculateLoad = async (req,res)=>{

const {typingSpeed, backspaces, mouseSpeed, tabSwitches} = req.body;

let loadScore =
typingSpeed*0.4 +
backspaces*0.3 +
mouseSpeed*0.2 +
tabSwitches*0.1;

let level="LOW";

if(loadScore>2){
level="HIGH";
}
else if(loadScore>1){
level="MEDIUM";
}

await Interaction.create({
typingSpeed,
backspaces,
mouseSpeed,
tabSwitches,
loadScore
});

res.json({
loadScore,
level
});

};