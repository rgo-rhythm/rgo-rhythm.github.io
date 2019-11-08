
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
  write(bases, chords);
}


function write(bases, chords) {
  let write = document.querySelector("#write");
  let btn = document.querySelector(".go");
  let ans_btn = document.querySelector("#ans_bt");
  // TODO: make chords appear uniformly
  /*
  let prevB, prevC;
  if (document.querySelector(".base") != null)
    prevB = document.querySelector(".base").innerText;
  if (document.querySelector(".chord") != null)
    prevC = document.querySelector(".chord").innerText;
  */

  write.innerHTML = "연습할 코드를 선택해주세요!";
  btn.value = "Go!";
  ans_btn.innerHTML = "";
  console.log("ans_btn disappeared");
  if (chords.length > 0){
    /*
    let rndBaseIndex = prevB, rndChordIndex = prevC;
    while (rndBaseIndex == prevB && rndChordIndex == prevC) {
      rndBaseIndex = Math.floor(Math.random()*bases.length);
      rndChordIndex = Math.floor(Math.random()*chords.length);
    }*/

    ans_btn.innerHTML="<input type='button' onclick='applyChord(base, chord);' value='정답확인'>";
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
    console.log("ans_btn appeared");
  }
}