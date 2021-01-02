---
layout: minimal
title: Meet with...
head-extra: buttonstyle_code.html
---

<html>
    <body>
        <script>
function webhook() {
        fetch('https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=meeting')
            .then(function(response){
            return response.text();
            if(response.text == 'Accepted') {
            console.log('Request successful', text);
            window.location.href('https://bradleykennedy.co.uk/meeting-click/');
            })
            .catch(function(error){
            log('Request failed', error)
            });
        console.log('Fin');
}
        </script>
        
<h1 style="text-align: center;"><span style="text-decoration: underline; font-size:50px"><strong>Meeting with Brad?</strong></span></h1>
<h1 id="title" style="text-align: center; font-size:30px"><em>Click to notify of your arrival </em></h1>
<!-- <h2 style="text-align: center;">Are you here for a Meeting or as a Participant?</h2> -->
<p>&nbsp;</p>
<div class="text-center">
  <div class="btn-group">
    <button class="button" onclick="webhook();">ARRIVED</button>
  </div>
</div>
<hr />
<!-- WILL NEED TO UPDATE THIS IF I USE THE PARTICIPANT LINK AGAIN - USE THE JAVASCRIPT ABOVE AND MODIFY FOR PPWEBHOOK. 
window.location.href('https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=meeting')
<div class="text-center">
  <div class="btn-group">
  <a href="https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=participant" onclick="window.open('https://bradleykennedy.co.uk/meeting-click/');" class="button">Participant</a>
</div>
  </div>
-->
</body>
</html>
