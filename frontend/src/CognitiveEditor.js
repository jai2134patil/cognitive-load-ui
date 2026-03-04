import React, { useState, useEffect } from "react";
import axios from "axios";

function CognitiveEditor() {

    

const [keystrokes,setKeystrokes]=useState(0);
const [backspaces,setBackspaces]=useState(0);
const [mouseSpeed,setMouseSpeed]=useState(0);
const [tabSwitches,setTabSwitches]=useState(0);
const [mode,setMode]=useState("NORMAL");
const [load,setLoad] = useState(0);

useEffect(()=>{

const mouseMove = (e)=>{
setMouseSpeed(Math.abs(e.movementX)+Math.abs(e.movementY));
};

document.addEventListener("mousemove",mouseMove);

document.addEventListener("visibilitychange",()=>{
setTabSwitches(v=>v+1);
});

return ()=>{
document.removeEventListener("mousemove",mouseMove);
};

},[]);


const handleKey = (e)=>{

setKeystrokes(k=>k+1);

if(e.key==="Backspace"){
setBackspaces(b=>b+1);
}

};


const analyzeLoad = async ()=>{

try{

const res = await axios.post(
"https://cognitive-load-ui.onrender.com/api/load",
{
typingSpeed:keystrokes,
backspaces,
mouseSpeed,
tabSwitches
}
);
/* update load meter */

setLoad(Math.min(res.data.loadScore*5,100));

if(res.data.level==="HIGH"){
setMode("FOCUS");
}else{
setMode("NORMAL");
}

/* RESET VALUES AFTER ANALYSIS */

setKeystrokes(0);
setBackspaces(0);
setMouseSpeed(0);
setTabSwitches(0);

}catch(err){
console.log(err);
}

};


useEffect(()=>{
const interval=setInterval(analyzeLoad,3000);
return ()=>clearInterval(interval);
});


return (

<div className={`container ${mode==="FOCUS" ? "focusMode" : ""}`}>

<h1 className="title">Cognitive Load Aware Interface</h1>

<div>

<button
className="btn btn-stress"
onClick={()=>setMode("FOCUS")}
>
Simulate Stress
</button>

<button
className="btn btn-normal"
onClick={()=>setMode("NORMAL")}
>
Return Normal
</button>

</div>


<div className="meter-section">

<p>Cognitive Load: {Math.round(load)}%</p>

<div className="meter">

<div
className="meter-fill"
style={{width: load + "%"}}
></div>

</div>

</div>


<textarea
className="editor"
onKeyDown={handleKey}
placeholder="Start typing here..."
></textarea>


{mode==="NORMAL" && (

<div className="toolbar">

<button className="tool-btn">Notifications</button>
<button className="tool-btn">Messages</button>
<button className="tool-btn">Calendar</button>

</div>

)}

<div className="status">

Current Mode: {mode}

</div>

</div>

);

}

export default CognitiveEditor;