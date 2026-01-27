---
layout: minimal
title: Success
head-extra: buttonstyle_code.html
---
<div class="meeting-page">
  <main class="meeting-shell meeting-shell-success">
    <div class="meeting-success-header">
      <img class="meeting-icon" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="" width="82" height="86" />
      <h1 class="meeting-title"><span><strong><em>Success!</em></strong></span></h1>
    </div>
    <hr class="meeting-divider" />
    <h1 class="meeting-title meeting-title-compact"><span>Brad has been notified</span></h1>
    <h2 class="meeting-subtitle meeting-subtitle-compact">He will be with you soon</h2>
    <div class="meeting-spacer" aria-hidden="true"></div>
    <img class="meeting-walk" src="https://raw.githubusercontent.com/b-kennedy0/b-kennedy0.github.io/master/assets/img/animate-walk.gif" alt="" width="189" height="147" />
    <hr class="meeting-divider" />
    <p class="meeting-meta">Triggered at: <span id="datetime"></span></p>
  </main>
</div>
<script>
var dt = new Date();
document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();
</script>
