function date(offset){
    var today = new Date();
    var month = today.getMonth() + 1;
    var date = today.getDate() + offset;
    
    return month.toString() + "/" + date.toString();
}

function printTimetable(){
    var i, j;
    var t = document.querySelector("#time_table");
    var NUM_DATE = 3;
    var contents = "";


    contents += '<tr><td>시간</td>';
    for(j = 0; j < NUM_DATE; j++){
        contents += '<td>';
        contents += date(j);
        contents += '</td>';
    }
    contents += "</tr>"


    for (i = 0; i < 24; i++){
        contents += '<tr>\n';
         contents += `<td>${i}:00~${i+1}:00</td>`;
        for(j = 0; j < NUM_DATE; j++){
            contents += '<td onclick="reserve(this);">';
            // contents += 'a';
            contents += '</td>';
        }
        contents += '<tr>\n';
    }

    t.innerHTML = contents;
}

function reserve(cell){
    var modal = document.getElementById("rsv_spec");
    var span = document.getElementsByClassName("close")[0];

    // cell.setAttribute
    modal.style.display = "block";
    span.onclick = function() {
      modal.style.display = "none";
    }

    document.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
}