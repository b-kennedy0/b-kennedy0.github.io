---
layout: minimal
title: Connor
---
<html>
  <body>

<h1 style="text-align: center;"><span style="text-decoration: underline; font-size:50px"><strong>Page for Connor</strong></span></h1>
<h1 id="title" style="text-align: center; font-size:30px"><em>Enter room code (e.g. CCR001)</em></h1>
<div style="text-align: center;">
  <input type="text" id="room" placeholder="Enter room here" />
  <input type="hidden" name="options[reCaptcha][siteKey]" value="6LeCO6gZAAAAAFsPMnHFBTJbdJBh0BnTOk6knRQw">
  <input type="hidden" name="options[reCaptcha][secret]" value="S8a7GjHIVxIkk2Hla3NGqyiKiok7HdpvlNm8nZvxyvq7HRHfeXQNBWrW17SzZrvaT+kAWBCq/7yQXrNUapQ4AmbC3xJfDynBuCsgaYXt57jQaZptanfajMX27+GEFJnhDtQkIYfyyFfjNJFG8GFoXH0CwlYLH1/o1sj+AfyFXIg=">
  <div class="g-recaptcha" data-sitekey="6LeCO6gZAAAAAFsPMnHFBTJbdJBh0BnTOk6knRQw"></div>
<script src='https://www.google.com/recaptcha/api.js'></script>
  <input type="button" value="Call Brad" onclick="room();" />
</div>
<div>&nbsp;</div>
<div>&nbsp;</div>
<hr />

<script>
var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
for(var i = 0; i < hashParams.length; i++){
    var p = hashParams[i].split('=');
    document.getElementById(p[0]).value = decodeURIComponent(p[1]);;
}

function room() {
  var response = grecaptcha.getResponse();

if(response.length == 0)
    //reCaptcha not verified
    alert("Confirm that you are not a robot! Please");

else
    //reCaptch verified
  var text = document.getElementById('room');
  var value = encodeURIComponent(text.value); //encode special characters
  let newHref = 'https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=' + value 
  console.log(newHref)
  window.location.href = newHref
  console.log('Fin');
}

</script>

  </body>
</html>
