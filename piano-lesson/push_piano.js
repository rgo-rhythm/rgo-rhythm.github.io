var pushedKeys = [];
var volumeOn = true;

const pushedKeyColor = 'rgb(219, 209, 171)';


function isPressed(element){
    return !(element.getAttribute("pressed") == null);
}

function pushKey(keyElement) {
    var note = keyElement.classList[1].substr(3);
    note = parseInt(note);
    
    const audio = document.querySelector(`audio[data-key="${note}"]`);
    if (!isPressed(keyElement)){
        keyElement.setAttribute("pressed", true);
        
        pushedKeys.push(note);
        keyElement.style.backgroundColor = pushedKeyColor;
        if (volumeOn)
            audio.play();
    }
    else {
        keyElement.removeAttribute("pressed");
        
        var index = pushedKeys.indexOf(note);
        pushedKeys.splice(index, 1);
        if (keyElement.classList[2] == 'blackkey'){
            keyElement.style.backgroundColor = 'black';
        }
        else { keyElement.style.backgroundColor = 'white'; }
        audio.pause();
        audio.currentTime = 0;
    }
    if (keyElement.style.backgroundColor == 'darkgreen' ||
             keyElement.style.backgroundColor == 'red') {
        
    }
}

function clearKeys() {
    var allKeys = document.querySelectorAll('.key');
    for (var i = 0; i < allKeys.length; i++){
        if (isPressed(allKeys[i])){
            pushKey(allKeys[i]);
        }
        else if (allKeys[i].style.backgroundColor == 'darkgreen' ||
                 allKeys[i].style.backgroundColor == 'red'){
            allKeys[i].style.backgroundColor = (allKeys[i].classList[2] == 'blackkey') ? 'black' : 'white';
        }
    }
    for (var i = 0; i < pushedKeys.length; i++){
        pushedKeys.pop();
    }
    resetAudioTimer();
}

function resetAudioTimer(){
    var audios = document.getElementsByTagName("audio");
    
    for (var i = 0; i < audios.length; i++){
        audios[i].pause();
        audios[i].currentTime = 0;
    }
}

function showAnswerKeys(notes, correct) {
    var answerKeys = [];
    
    answerKeys.push(parseInt(notes[0]));
    for (var i = 1; i < notes.length; i++){
        if (answerKeys[i-1] > notes[i])
            answerKeys.push(parseInt(notes[i] + 12));
        else
            answerKeys.push(parseInt(notes[i]));  
    }
    
    if (notes[0] < 5) {
        for (var i = 0; i < answerKeys.length; i++)
            answerKeys[i] += 12;
    }
    
    resetAudioTimer()
    const color = (correct) ? 'darkgreen': 'red';
    for (var i = 0; i < answerKeys.length; i++){
        var element = document.querySelector(`.key${answerKeys[i]}`);
        element.style.backgroundColor = color;
        // keyElements.push(element);
        if (volumeOn)
            document.querySelector(`audio[data-key="${answerKeys[i]}"]`).play();
    }

}

function playAll(){
    var allKeys = document.querySelectorAll('.key');
    if (volumeOn){
        for (var i = 0; i < allKeys.length; i++){
            if (isPressed(allKeys[i])){
                var note = parseInt(allKeys[i].classList[1].substr(3));
                var audio = document.querySelector(`audio[data-key="${note}"]`);
                audio.pause();
                audio.currentTime = 0;
                audio.play();
            }
        }
    }
    else{
        alert("음소거를 해제해주세요!");
    }
}

function soundOnOff(){
    var bt = document.querySelector(".sound_onoff");
    
    if (bt.src.indexOf("soundoff.png") != -1){
        bt.src = "audios/soundon.png";
        volumeOn = true;
    }
    else {
        bt.src = "audios/soundoff.png";
        volumeOn = false;
        resetAudioTimer();
    }
    
}