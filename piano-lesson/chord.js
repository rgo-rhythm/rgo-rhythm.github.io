
var white_bases = ["C", "D", "E", "F", "G", "A", "B"];
var black_bases = ["C#", "Db", "D#", "Eb", "F#", "Gb", "G#", "Ab", "A#", "Bb"];

var bases = [];
var chords = [];

var base, chord;
const WHITE_KEY_NUM = 7;


function checkValid() {
  let anyCheck = false;
  let options = document.querySelectorAll("input");

  for (let option of options){
    anyCheck = anyCheck && option.checked;
  }

  if (!anyCheck) document.querySelector("#write").innerHTML = "No options!"
}


function setChordSource() {
  let options = document.querySelectorAll("input");

  checkValid(); // not implemented yet


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
  return write(bases, chords);
}

function initialize(){
  document.getElementById("write").innerHTML = "연습할 코드를 선택해주세요!";
  document.getElementById("go").value = "Go!";
  document.getElementById("ans").style.display="none";
  document.getElementById("answer").innerHTML="";
}

function write(bases, chords) {
  let write = document.querySelector("#write");
  let btn = document.querySelector("#go");
  let ans_btn = document.querySelector("#ans");
  // TODO: make chords appear uniformly
  /*
  let prevB, prevC;
  if (document.querySelector(".base") != null)
    prevB = document.querySelector(".base").innerText;
  if (document.querySelector(".chord") != null)
    prevC = document.querySelector(".chord").innerText;
  */

  initialize();
  if (chords.length > 0){
    /*
    let rndBaseIndex = prevB, rndChordIndex = prevC;
    while (rndBaseIndex == prevB && rndChordIndex == prevC) {
      rndBaseIndex = Math.floor(Math.random()*bases.length);
      rndChordIndex = Math.floor(Math.random()*chords.length);
    }*/
    ans_btn.style.display = "inline";
    rndBaseIndex = Math.floor(Math.random()*bases.length);
    rndChordIndex = Math.floor(Math.random()*chords.length);
    base = bases[rndBaseIndex];
    chord = chords[rndChordIndex];

    let text = "<div class='result'>";
    text += "<span class='base'>"+base+"</span>";
    text += "<span class='chord'>"+chord+"</span>";
    text += " 을(를) 잡아보세요!</div><br>"
    write.innerHTML = text;

    btn.value = "다음코드!";
    return true;
  }
  else { return false; }
}

// javascript sleep: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
async function auto() {
    let solve_t = parseInt(document.getElementById("sol_sec").value);
    let ans_t = parseInt(document.getElementById("ans_sec").value);
    let valid = setChordSource();
    let stop_bt = document.getElementById("stop");
    if (valid){
        stop_bt.style.display="block";
        document.getElementById("go").disabled=true;
        document.getElementById("ans").disabled=true;
        document.getElementById("auto").disabled=true;
        while (stop_bt.style.display === "block"){
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
    document.getElementById("go").disabled=false;
    document.getElementById("ans").disabled=false;
    document.getElementById("auto").disabled=false;
    initialize();
}