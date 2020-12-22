---
layout: minimal
title: Connor
---
<html>
<body>

<h1 style="text-align: center;"><span style="text-decoration: underline; font-size:50px"><strong>Page for Connor</strong></span></h1>
<h1 id="title" style="text-align: center; font-size:30px"><em>Enter room code (e.g. CCR001)</em></h1>
<div style="text-align: center;">
  <input type="text" id="textInput" placeholder="Enter room number here" />
  <input type="button" value="Call Brad" onclick="room();" />
</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<hr />

<script>
function room() {
  var text = document.getElementById('textInput');
  var value = encodeURIComponent(text.value); //encode special characters
  let newHref = 'https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=' + value 
  console.log(newHref)
  window.location.href = newHref
}
</script>

</body>
</html>
