---
layout: super-minimal
title: Teaching/Marking Feedback Completed
head-extra: noindex.html
---
<head>
<title>Feedback Submitted</title>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
</head>
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<style>
body {
    background-color: #80AEEF;
    margin: 0;
    padding: 0;
    width: 100vw;
}
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
.message-box {
    background: white;
    padding: 3rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 600px;
    width: 90%;
}
.icon-wrapper {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin-bottom: 1rem;
}
.icon-wrapper svg {
    position: absolute;
    top: 0;
    left: 0;
    transform: rotate(-90deg);
}
.circle {
    fill: none;
    stroke: #28a745;
    stroke-width: 5;
    stroke-dasharray: 381; /* Updated circumference */
    stroke-dashoffset: 381; /* Updated offset */
    animation: draw 1s ease-out forwards;
}
@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}
.success-icon {
    position: relative;
    width: 45px; /* Reduced size */
    height: 48px; /* Reduced size */
    z-index: 1;
    top: 16px
}
.title {
    color: #2c3e50;
    font-size: 2rem;
    margin-bottom: 1.5rem;
}
.subtitle {
    color: #34495e;
    font-size: 1.25rem;
    margin-bottom: 1rem;
}
.close-message {
    color: #7f8c8d;
    font-size: 1.1rem;
}
</style>
<body>
<div class="container d-flex align-items-center justify-content-center min-vh-100">
  <div class="bg-white p-5 rounded shadow text-center" style="max-width: 600px; width: 90%;">
    <div class="icon-wrapper">
      <svg width="80" height="80" viewBox="-10 -10 120 120"> <!-- Updated viewBox -->
        <circle class="circle" cx="50" cy="50" r="55" /> <!-- Updated cx, cy, and r -->
      </svg>
      <img class="success-icon" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="Success" />
    </div>
    <h1 class="title">Feedback submitted!</h1>
    <h3 class="subtitle">Thank you for taking the time to give feedback! :speech_balloon: <span id="name"></span></h3>
    <p class="subtitle">I will make sure to reflect upon all comments and use them to improve my teaching/marking in the future.</p>
    <h3 class="subtitle"><span id="option"></span></h3>
    <p class="close-message">You may now close this page :wave:</p>
  </div>
</div>

<script>
$( document ).ready(function() {
    function getParameterByName(name, option, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\{text}");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    var urlVar = getParameterByName('name');
    document.getElementById('name').textContent = urlVar;
    var urlVar2 = getParameterByName('option');
    document.getElementById('option').textContent = urlVar2;
});
</script>
</body>