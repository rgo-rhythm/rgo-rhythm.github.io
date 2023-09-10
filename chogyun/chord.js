
var white_bases = ["C", "D", "E", "F", "G", "A", "B"];
var black_bases = ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb",
                   "C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb",
                   "Cb", "E#", "Fb", "B#"];

var bases = [];
var chords = [];

var base;
var chord;


function isChordSelected() {
  let anyCheck = false;
  let options = document.getElementsByClassName("chk_chord");
  let startBt = document.getElementById("go");
  let autoBt = document.getElementById("auto");
  let msgDiv = document.querySelector(".options_msg");
  
  for (let option of options) {
    if (option.value == "tens") continue;
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


function setChordSource(where) {
  let options = document.getElementsByTagName("input");

  chords = [];
  bases = [];

  bases.push(...white_bases);
  bases.push(...white_bases);
  bases.splice(bases.indexOf("C"), 1);  // because C is too easy...
  bases.push(...black_bases);

  for (let option of options) {
    if (option.checked) {
      let optionName = option.getAttribute("value");
      if (optionName === "Triad")       chords.push("", "m", "sus4", "aug", "dim");
      else if (optionName === "basic7")  {
          chords.push("7", "m7", "M7", "m7(b5)");
          chords.push("7", "m7", "M7", "m7(b5)");
      }
      else if (optionName === "aug")  chords.push("aug7");
      else if (optionName === "dim")  chords.push("dim7");
      else if (optionName === "sus4")  chords.push("7sus4");
      else if (optionName === "mM7")  chords.push("mM7");
      else if (optionName === "six")  chords.push("6", "m6");
      else if (optionName === "tens")  chords.push(
          "7(9)", "7(#11)", "7(13)", "7(b9)", "7(#9)", "7(b13)", "M7(9)",
          "M7(#11)", "M7(13)", "m7(9)", "m7(11)");
      else if (optionName === "tens_db")  chords.push(
          "m7(9, 11)", "7(9, 13)", "7(b9, b13)", "7(#9, b13)", "7(9, b13)",
          "7(b9, 13)", "7(b9, #11)", "7(9, #11)", "7(#11, 13)", "M7(9, #11)", 
          "M7(9, 13)", "M7(11, 13)", "m7(b5, 9)", "m7(b5, 11)");
    }
  }
  document.querySelector("#"+where+"_chord").innerText="";
  return writeChord(bases, chords, where);
}

// where: this or next
function writeChord(bases, chords, where) {
    if (where != "this" && where != "next"){
        alert("writeChord Error!");
        return false;
    }
  let write = document.querySelector("#"+where+"_chord");
  let btn = document.querySelector("#go");
  // TODO: make chords appear uniformly

  if (chords.length > 0){
    while (true){
        rndBaseIndex = Math.floor(Math.random()*bases.length);
        rndChordIndex = Math.floor(Math.random()*chords.length);
        if (base != bases[rndBaseIndex])
            break;
    }
    base = bases[rndBaseIndex];
    chord = chords[rndChordIndex];

    let text = "<span class='base'>"+base+"</span>";
    text += "<span class='chord'>"+chord+"</span>";
    write.innerHTML = text;

    btn.value = "(수동) 다음 코드";
    return true;
  }
  else { return false; }
}

function toggle_btns(enabled){
    document.getElementById("go").disabled=!enabled;
    //document.getElementById("bar").readOnly=!enabled;
    let li_chk = document.querySelectorAll("input[type=checkbox]");
    for (ele of li_chk){
        ele.disabled=!enabled;
    }
}

// javascript sleep: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function auto() {
    let solve_t = parseInt(document.getElementById("bpm").value);
    let ans_t = parseInt(document.getElementById("ans_sec").value);
    let valid = setChordSource("this");
    
    let stop_bt = document.getElementById("stop");
    if (valid){
        stop_bt.style.display="inline";
        toggle_btns(false);
        while (stop_bt.style.display === "inline"){
           await new Promise(r => setTimeout(r, solve_t * 1000));
            if (stop_bt.style.display === "none")
                break;
            applyChord(base, chord);
            await new Promise(r => setTimeout(r, ans_t * 1000));
            if (stop_bt.style.display === "none")
                break;
            setChordSource("this");
        } 
    }
}



function quit_auto(){
    document.getElementById("stop").style.display="none";
    toggle_btns(true);
}