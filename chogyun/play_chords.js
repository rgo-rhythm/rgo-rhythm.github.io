const bpm = document.querySelector('#bpm');
const startBtn = document.querySelector('#auto');
const sound1 = document.querySelector('#sound1');
const sound2 = document.querySelector('#sound2');
const prev_chord = document.querySelector('#prev_chord');
const this_chord = document.querySelector('#this_chord');
const next_chord = document.querySelector('#next_chord');
let timer = null;
let nowBpm = 60;
let isPlay = false;
let bpm_cnt = -4;


//bar.addEventListener('change', (e) => {
//   if (parseInt(e.target.value) < 1 || parseInt(e.target.value) > 16){
//       alert('마디 수는 1~16 사이로 입력해주세요.');
//       e.target.value = nowBar;
//   }
//    else{
//        nowBar = parseInt(e.target.value);
//    }
//});


bpm.addEventListener('change', (e) => {
   nowBpm = parseInt(e.target.value);
   if (isPlay) {
      clearInterval(timer);
      timer = setInterval(playSound, realBpm(nowBpm));
   }
});

startBtn.addEventListener('click', () => {
   if (isPlay) {
       toggle_btns(true);
       clearInterval(timer);
       changeBtn();
       bpm_cnt = -4;
       prev_chord.innerHTML="";
       next_chord.innerHTML="";
       
   } else {
       toggle_btns(false);
       changeBtn();
       playSound();
       setChordSource("next");
       timer = setInterval(playSound, realBpm(nowBpm));
       
   }
   isPlay = !isPlay;
});

function changeBtn() {
   if(startBtn.innerHTML === '(자동) 코드 생성 시작') {
      startBtn.innerHTML = '중지';
   } else {
      startBtn.innerHTML = '(자동) 코드 생성 시작';      
   }
}

function realBpm(bpm) {
   return (60 * 1000) / bpm;
}



function playSound() {
    if (bpm_cnt <0){
        this_chord.innerHTML = "READY";
        prev_chord.innerHTML = (-bpm_cnt).toString();
    }
    else if (bpm_cnt==0) {
        prev_chord.innerHTML = '';
        if (this_chord.innerHTML != "READY")
            prev_chord.innerHTML = this_chord.innerHTML;
        
        this_chord.innerHTML = next_chord.innerHTML;
        setChordSource("next");
        
    }
    var sound;
    if (bpm_cnt % 4 == 0)
        sound = sound1;
    else sound = sound2;
    sound.currentTime = 0;
    sound.play();
    bpm_cnt++;
    if (bpm_cnt == 4) bpm_cnt = 0;
    
}