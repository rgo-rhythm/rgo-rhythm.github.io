
var white_bases = ["C", "D", "E", "F", "G", "A", "B"];
var black_bases = ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"];

var bases = [];
var scales = [];

var base;
var scale;


function isScaleSelected() {
  let anyCheck = false;
  let options = document.getElementsByClassName("chk_scale");
  let startBt = document.getElementById("go");
  let autoBt = document.getElementById("auto");
  let msgDiv = document.querySelector(".options_msg");
  
  for (let option of options){
    anyCheck = anyCheck || option.checked;
  }
    
  console.log(anyCheck)
  if (anyCheck) {
      startBt.disabled = false;
      autoBt.disabled = false;
      msgDiv.style.display = 'none';
  }
  else{
      startBt.disabled = true;
      autoBt.disabled = true;
      msgDiv.style.display = 'block';
      initialize();
  }
//    document.querySelector("#quiz").innerHTML = "No options!"
}

function initialize() {
    let goBt = document.getElementById("go");
    goBt.value = "(수동) 랜덤 스케일 생성";
    goBt.style.width = "100%";
    document.getElementById("ans").disabled=true;
    document.getElementById("answer").innerHTML="";
}


function setScaleSource(where) {
  let options = document.getElementsByTagName("input");

  scales = [];
  bases = [];

  bases.push(...white_bases);
  bases.push(...white_bases);
  bases.splice(bases.indexOf("C"), 1);  // because C is too easy...
  bases.push(...black_bases);
    
  console.log("setScale1")

  for (let option of options) {
    if (option.checked) {
      let optionName = option.getAttribute("value");
      if (optionName === "Ion")       scales.push("Ion");
      else if (optionName === "Dor")  scales.push("Dor");
      else if (optionName === "Phr")  scales.push("Phr");
      else if (optionName === "Phr")  scales.push("Phr");
      else if (optionName === "Lyd")  scales.push("Lyd");
      else if (optionName === "Mix")  scales.push("Mix");
      else if (optionName === "Aeo")  scales.push("Aeo");
      else if (optionName === "Lyd")  scales.push("Lyd");
      else if (optionName === "Hm")  scales.push("Harmonic Minor");
      else if (optionName === "Mm")  scales.push("Melodic Minor");
      else if (optionName === "Mixb9b13")  scales.push("Mix b9, b13");
      else if (optionName === "Lydb7")  scales.push("Lyd b7");
      else if (optionName === "Alt")  scales.push("Alt");
      else if (optionName === "HW")   scales.push("Half-Whole");
      else if (optionName === "Wh")   scales.push("Whole-Half");
      else if (optionName === "WT")   scales.push("Whole Tone");
    }
  }
  document.querySelector("#"+where+"_scale").innerText="";
    console.log("setScale2")
  return writeScale(bases, scales, where);
}

// where: this or next
function writeScale(bases, scales, where) {
    if (where != "this" && where != "next"){
        alert("writeScale Error!");
        return false;
    }
  let write = document.querySelector("#"+where+"_scale");
  let btn = document.querySelector("#go");
  // TODO: make scales appear uniformly

  if (scales.length > 0){
    while (true){
        rndBaseIndex = Math.floor(Math.random()*bases.length);
        rndScaleIndex = Math.floor(Math.random()*scales.length);
        if (base != bases[rndBaseIndex])
            break;
    }
    base = bases[rndBaseIndex];
    scale = scales[rndScaleIndex];

    let text = "<span class='base'>"+base+" </span>";
    text += "<span class='scale'>"+scale+"</span>";
    write.innerHTML = text;

    btn.value = "(수동) 다음 스케일";
    return true;
  }
  else { return false; }
}

function toggle_btns(enabled){
    document.getElementById("go").disabled=!enabled;
    //document.getElementById("bar").readOnly=!enabled;
    for (op of document.getElementById("bar").children){
        op.disabled=!enabled;
    }
    let li_chk = document.querySelectorAll("input[type=checkbox]");
    for (ele of li_chk){
        ele.disabled=!enabled;
    }
}

// javascript sleep: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function auto() {
    let solve_t = parseInt(document.getElementById("bpm").value);
    let ans_t = parseInt(document.getElementById("ans_sec").value);
    let valid = setScaleSource("this");
    
    let stop_bt = document.getElementById("stop");
    if (valid){
        stop_bt.style.display="inline";
        toggle_btns(false);
        while (stop_bt.style.display === "inline"){
           await new Promise(r => setTimeout(r, solve_t * 1000));
            if (stop_bt.style.display === "none")
                break;
            applyChord(base, scale);
            await new Promise(r => setTimeout(r, ans_t * 1000));
            if (stop_bt.style.display === "none")
                break;
            setScaleSource("this");
        } 
    }
}



function quit_auto(){
    document.getElementById("stop").style.display="none";
    toggle_btns(true);
}