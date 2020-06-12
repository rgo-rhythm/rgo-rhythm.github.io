var base_enum =
  {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'D#': 3, 'Eb': 3, 'E': 4,
   'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'G#': 8, 'Ab': 8, 'A': 9,
   'A#': 10, 'Bb': 10, 'B': 11};
var NOTES =
  {0: '도', 1: '도#', 1.5: '레b',
   2: '레', 3: '레#', 3.5: '미b', 4: '미',
   5: '파', 6: '파#', 6.5: '솔b',
   7: '솔', 8: '솔#', 8.5: '라b',
   9: '라', 10: '라#', 10.5: '시b', 11: '시'};


function generateMajor5(base){
	let baseNum = base_enum[base];

	return [baseNum, baseNum + 4, baseNum + 7];
}


function applyChord(base, chord) {
	let note = generateMajor5(base);
	let seventh = false;

	if (chord.includes("7")){
		seventh = true;
		note.push(note[0] + 10);

		if (chord.includes("M7"))
	  		note[3] += 1;
	}
  

	if (chord.search("^m") == 0)
		note[1] -= 1;
	
	else if (chord.includes("sus4"))
		note[1] += 1;

	else if (chord.includes("aug"))
		note[2] += 1;

	else if (chord.includes("dim")) {
		note[1] -= 1;
		note[2] -= 1;
		if (seventh)
			note[3] -= 1;
	}

	
	if (chord.includes("b5"))
		note[2] -= 1;  


  	if (chord.includes("m") || chord.includes("dim")){
        if (base == 'B') { 
        }
        else{
            if (base.includes("#")) {
            }
            else {
                for (let i=0; i < note.length; i++){
            	   console.log(note[i]);
                    if (NOTES[note[i]%12].search("#") > -1) {
                       note[i] += 0.5;
                   }
                }
            }
        }
        
    }
    else {
    	if (base.includes("b")) {
            for (let i=0; i < note.length; i++){
        	   if (NOTES[note[i]%12].search("#") > -1){
            	   note[i] += 0.5;
               }
            }
        }
    }
     print_chord(note);
}


function print_chord(notes){
	var ans = document.querySelector("#answer");
	ans.innerText = "";
	ans.innerText += "정답: ";
	notes.forEach(function(item, index, array){
		ans.innerText += (NOTES[item % 12] + " 	 ");
	});
}