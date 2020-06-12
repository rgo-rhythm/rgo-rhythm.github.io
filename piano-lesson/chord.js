
var white_bases = ["C", "D", "E", "F", "G", "A", "B"];
var black_bases = ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"];

var bases = [];
var chords = [];

var base, chord;
const WHITE_KEY_NUM = 7;


function initialize(){
//  document.getElementById("write").innerHTML = "연습할 코드를 선택해주세요!";
  let goBt = document.getElementById("go");
  goBt.value = "시작하기";
  goBt.style.width = "100%";
  document.getElementById("ans").style.display="none";
  document.getElementById("answer").innerHTML="";
}

function isChordSelected() {
  let anyCheck = false;
  let options = document.getElementsByClassName("chk_chord");
  let startBt = document.getElementById("go");
  let autoBt = document.getElementById("auto");
  let msgDiv = document.querySelector(".options_msg");
    
  for (let option of options){
    anyCheck = anyCheck || option.checked;
  }
    
  if (anyCheck) {
      startBt.disabled = false;
      autoBt.disabled = false;
      msgDiv.style.display = 'none';
  }
  else{
      startBt.disabled = true;
      autoBt.disabled = true;
      msgDiv.style.display = 'block';
      initialize()
  }
//    document.querySelector("#quiz").innerHTML = "No options!"
}


function setChordSource() {
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
      if (optionName === "Tbasic")       chords.push("", "m", "sus4");
      else if (optionName === "Tapply")  chords.push("dim", "aug");
      else if (optionName === "Sbasic")  chords.push("M7", "7", "m7");
      else if (optionName === "Sapply")  chords.push("7sus4", "dim7", "aug7");
      else if (optionName === "Shard")   chords.push("m7b5", "7b5", "mM7");
      else if (optionName == "noBlack")  bases.splice(bases.indexOf("C#"), black_bases.length * 2);
    }
  }
  document.querySelector("#answer").innerText="";
  return write_quiz(bases, chords);
}


function write_quiz(bases, chords) {
  let write = document.querySelector("#quiz");
  let btn = document.querySelector("#go");
  let ans_btn = document.querySelector("#ans");
  // TODO: make chords appear uniformly

  if (chords.length > 0){
    ans_btn.style.display = "inline";
    rndBaseIndex = Math.floor(Math.random()*bases.length);
    rndChordIndex = Math.floor(Math.random()*chords.length);
    base = bases[rndBaseIndex];
    chord = chords[rndChordIndex];

    let text = "<span class='base'>"+base+"</span>";
    text += "<span class='chord'>"+chord+"</span>";
    text += " 을(를) 잡아보세요!"
    write.innerHTML = text;

    btn.value = "다음코드!";
    btn.style.width = '100px';
    return true;
  }
  else { return false; }
}

function toggle_btns(enabled){
    document.getElementById("go").disabled=!enabled;
    document.getElementById("ans").disabled=!enabled;
    document.getElementById("auto").disabled=!enabled;
    let li_chk = document.querySelectorAll("input[type=checkbox]");
    for (ele of li_chk){
        ele.disabled=!enabled;
    }
}

// javascript sleep: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function auto() {
    let solve_t = parseInt(document.getElementById("sol_sec").value);
    let ans_t = parseInt(document.getElementById("ans_sec").value);
    let valid = setChordSource();
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
            setChordSource();
        } 
    }
}

function quit_auto(){
    document.getElementById("stop").style.display="none";
    toggle_btns(true);
}