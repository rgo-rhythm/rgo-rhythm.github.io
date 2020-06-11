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
            contents += '<td onclick="reserve(this);clickedCell=this;">';
            // contents += 'a';
            contents += '</td>';
        }
        contents += '<tr>\n';
    }

    t.innerHTML = contents;
}

// var debug
function reserve(cell){
    var modal = document.getElementById("reserve_screen");
    var span = document.getElementsByClassName("close")[0];

    let hour = clickedCell.getAttribute("class");
    console.log(hour);
    hour = hour[hour.length-1];
    querySelector("#t1").innerHTML = `<input type="hidden" name="hour" value='${hour}'> 예약시간: ${hour}시 <input type='text' name='min'> 분 부터 <input type='text' name='dur'>시간동안`;
    
    cell.innerHTML = "clicked";
    cell.setAttribute("class", "rsv");
    
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