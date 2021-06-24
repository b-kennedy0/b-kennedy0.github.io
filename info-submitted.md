---
layout: super-minimal
title: Information Sent
---
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<script type="text/javascript">
$( document ).ready(function() {
      // Parse the URL parameter
    function getParameterByName(name, option, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    // Give the parameter a variable name
    var urlVar = getParameterByName('name');
    document.getElementById('name').textContent = urlVar;
      var urlVar2 = getParameterByName('option');
    document.getElementById('option').textContent = urlVar2;
});
</script>

<div class="text-center">
  <h1 style="text-align: center;"><img style="font-size: 14px;" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="" width="82" height="86" />&nbsp;<em>Information submitted!</em></h1>
  <h3>Thank you <span id="name"></span><br><!--<br>The information has been sent through.--></h3>
  <p>&nbsp;</p>
  <h3>You have selected that you will attend: <span id="option"></span>.<br><br></h3>
  <h3>You may now close this page</h3>
</div>
