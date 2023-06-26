const bpm = document.querySelector('#bpm');
const bar = document.querySelector('#bar');
const startBtn = document.querySelector('#auto');
const sound1 = document.querySelector('#sound1');
const sound2 = document.querySelector('#sound2');
const prev_scale = document.querySelector('#prev_scale');
const this_scale = document.querySelector('#this_scale');
const next_scale = document.querySelector('#next_scale');
const bar_cnt = document.querySelector('#bar_cnt_container');
let timer = null;
let nowBpm = 60;
let nowBar = 4;
let isPlay = false;
let bpm_cnt = -4;

bar.addEventListener('change', (e) => {
   nowBar = parseInt(e.target.value);
});

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
       bar_cnt.innerHTML="";
       prev_scale.innerHTML="";
       next_scale.innerHTML="";
       
   } else {
       toggle_btns(false);
       changeBtn();
       playSound();
       setScaleSource("next");
       bar_cnt.innerHTML="<div class='bar_cnt'></div>".repeat(nowBar);
       timer = setInterval(playSound, realBpm(nowBpm));
       
   }
   isPlay = !isPlay;
});

function changeBtn() {
   if(startBtn.innerHTML === '(자동) 스케일 생성 시작') {
      startBtn.innerHTML = '중지';
   } else {
      startBtn.innerHTML = '(자동) 스케일 생성 시작';      
   }
}

function realBpm(bpm) {
   return (60 * 1000) / bpm;
}



function playSound() {
    if (bpm_cnt <0){
        this_scale.innerHTML = "READY";
        prev_scale.innerHTML = (-bpm_cnt).toString();
    }
    else if (bpm_cnt==0) {
        for (ch of bar_cnt.children)
            ch.innerText = '';
        prev_scale.innerHTML = '';
        if (this_scale.innerHTML != "READY")
            prev_scale.innerHTML = this_scale.innerHTML;
        
        this_scale.innerHTML = next_scale.innerHTML;
        setScaleSource("next");
        
    }
    if (bpm_cnt >= 0)
        bar_cnt.children[Math.floor(bpm_cnt/4)].innerText =
            (Math.floor(bpm_cnt/4)+1).toString();
    var sound;
    if (bpm_cnt % 4 == 0)
        sound = sound1;
    else sound = sound2;
    sound.currentTime = 0;
    sound.play();
    bpm_cnt++;
    if (bpm_cnt == nowBar * 4) bpm_cnt = 0;
    
}