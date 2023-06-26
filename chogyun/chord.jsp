<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<%
  String[] bases = {"C", "D", "E", "F", "G", "A", "B"};
  ArrayList<String> chords = new ArrayList<String>();
  if (request.getParameter("chordtype") != null) {
    String[] chordTypes = request.getParameterValues("chordtype");
    // based on http://blog.naver.com/PostView.nhn?blogId=fromyongsik&logNo=40130234734&redirect=Dlog&widgetTypeCall=true
    for (int i = 0; i < chordTypes.length; i++){
      switch(chordType[i]){
        case "Tbasic":
          ArrayList<String> basicTriad = String[]{"", "m", "sus4"}.asList();
          chords.addAll(basicTriad); break;
        case "Tapply":
          ArrayList<String> appliedTriad = String[]{"dim", "aug"}.asList();
          chords.addAll(appliedTriad); break;
        case "Sbasic":
          ArrayList<String> basicSeventh = String[]{"M7", "7", "m7"}.asList();
          chords.addAll(basicSeventh); break;
        case "Sapply":
          ArrayList<String> appliedSeventh = String[]{"7sus4", "aug7", "dim7"}.asList();
          chords.addAll(appliedSeventh); break;
        case "Shard":
          ArrayList<String> complexSeventh = String[]{"m7b5", "7b5", "mM7"}.asList();
          chords.addAll(complexSeventh); break;
      }
    }
  } else {
    String error = new String("No selection Error...\n");
  }
  if (request.getParameter("options") != null){
    // String[] otherOptions = request.getParameterValues("options"); We don't need to do this now

  }

%>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <link rel="icon" type="image/x-icon" href="./piano.ico">
    <title>Chord Practice!</title>
  </head>
  <body>
    <h1>ㅎㅇㅌ!</h1>
  </body>
</html>
