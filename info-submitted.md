---
layout: super-minimal
title: Information Sent
---
<script type="text/javascript">
$(window).bind("load", function() {
  var hashParams = window.location.hash.substr(1).split('&'); // substr(1) to remove the `#`
for(var i = 0; i < hashParams.length; i++){
    var p = hashParams[i].split('=');
    document.getElementById(p[0]).textContent = decodeURIComponent(p[1]);
}
});
</script>

<div class="text-center">
  <h1 style="text-align: center;"><img style="font-size: 14px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="" width="82" height="86" />&nbsp;<em>Information submitted!</em></h1>
  <h3>Thank you<br>You have confirmed your placement supervisor details as correct.</h3>
  <span id="name">Text </span>
  <p>&nbsp;</p>
  <h3>You may now close this page</h3>
</div>
