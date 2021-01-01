---
layout: minimal
title: Meet with...
head-extra: buttonstyle_code.html
---
<script>
var doAjax = function() {
    $.ajax({
       url: 'https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=meeting',
       type: 'POST'
    });
};

$('#myButton').click(function() {
    doAjax();
    window.open('https://bradleykennedy.co.uk/meeting-click/');
});
</scipt>
<h1 style="text-align: center;"><span style="text-decoration: underline; font-size:50px"><strong>Meeting with Brad?</strong></span></h1>
<h1 id="title" style="text-align: center; font-size:30px"><em>Click to notify of your arrival </em></h1>
<!-- <h2 style="text-align: center;">Are you here for a Meeting or as a Participant?</h2> -->
<p>&nbsp;</p>
<div class="text-center">
  <div class="btn-group">
    <button class="button" id="myButton">TEST</button>
<!--  <a href="https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=meeting" target="_self" onclick="window.open('https://bradleykennedy.co.uk/meeting-click/');" class="button" id="myButton">ARRIVED</a>
-->
</div>
  </div>
<hr />
<!-- <div class="text-center">
  <div class="btn-group">
  <a href="https://hook.integromat.com/veirohloph4r49a9txd3npz741acr5ln?action=participant" onclick="window.open('https://bradleykennedy.co.uk/meeting-click/');" class="button">Participant</a>
</div>
  </div>
-->
