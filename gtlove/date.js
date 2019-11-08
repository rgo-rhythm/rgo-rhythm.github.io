        function date(offset=0){
            var today = new Date();
            var month = today.getMonth() + 1
            var date = today.getDate() + offset
            
            return month.toString() + "/" + date.toString();
        }

        function printTimetable(){
            var i, j;
            var t = document.querySelector("#time_table");
            const NUM_DATE = 3;
            var contents = "";


            contents += `<tr><td>시간</td>`
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
                    contents += '<td>';
                    // contents += 'a';
                    contents += '</td>';
                }
                contents += '<tr>\n';
            }

            t.innerHTML = contents;
        }