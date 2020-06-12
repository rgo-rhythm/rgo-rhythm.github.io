var pushedKeys = [];

function pushKey(keyElement) {
    var note = keyElement.classList[1].substr(3);
    note = parseInt(note);
    const audio = document.querySelector(`audio[data-key="${note}"]`);
    if (keyElement.style.backgroundColor=='orange'){
        var index = pushedKeys.indexOf(note);
        pushedKeys.splice(index, 1);
        if (keyElement.classList[2] == 'blackkey'){
            keyElement.style.backgroundColor = 'black';
        }
        else { keyElement.style.backgroundColor = 'white'; }
        audio.pause();
        audio.currentTime = 0;
    }
    else {
        pushedKeys.push(note);
        keyElement.style.backgroundColor = 'orange';
        audio.play();
        // playAudio(note);
    }
}

function clearKeys() {
    var allKeys = document.querySelectorAll('.key');
    for (var i = 0; i < allKeys.length; i++){
        if (allKeys[i].style.backgroundColor=='orange'){
            pushKey(allKeys[i]);
        }
    }
    for (var i = 0; i < pushedKeys.length; i++){
        pushedKeys.pop();
    }
}

function playAll(){
    var allKeys = document.querySelectorAll('.key');
    for (var i = 0; i < allKeys.length; i++){
        if (allKeys[i].style.backgroundColor=='orange'){
            var note = parseInt(allKeys[i].classList[1].substr(3));
            var audio = document.querySelector(`audio[data-key="${note}"]`);
            audio.pause();
            audio.currentTime = 0;
            audio.play();
        }
    }
}

function playAudio(key){
    const audio = document.querySelector(`audio[data-key="${key}"]`);
    audio.currentTime = 0;
    audio.play();
}