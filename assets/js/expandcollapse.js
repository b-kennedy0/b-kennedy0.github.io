function openAll() {
  var elems = document.getElementsByTagName("details");
  document.getElementById("btnExpandHideAllDetails").innerHTML = "Close All Sections";
  document.getElementById("btnExpandHideAllDetails").setAttribute( "onClick", "javascript: closeAll();");

  for (var i = 1; i <= elems.length; i++){
    elems[i].setAttribute("open", "true");
    }
}

function closeAll() {	
  var elems = document.getElementsByTagName("details");
  document.getElementById("btnExpandHideAllDetails").setAttribute( "onClick", "javascript: openAll();" );
  document.getElementById("btnExpandHideAllDetails").innerHTML = "Open All Sections";	
  
  for (var i = 1; i <= elems.length; i++){
    elems[i].removeAttribute("open");
  }
}
