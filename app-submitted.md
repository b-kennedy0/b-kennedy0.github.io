---
layout: super-minimal
title: Submitted
head-extra: noindex.html
---
<head>
<title>Submitted</title>
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
    stroke-dasharray: 251; /* Updated circumference */
    stroke-dashoffset: 251; /* Updated offset */
    animation: draw 1s ease-out forwards;
}
@keyframes draw {
    to {
        stroke-dashoffset: 0;
    }
}
.success-icon {
    position: relative;
    width: 65px; /* Reduced size */
    height: 68px; /* Reduced size */
    z-index: 1;
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
        <circle class="circle" cx="50" cy="50" r="40" /> <!-- Updated cx, cy, and r -->
      </svg>
      <img class="success-icon" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="Success" />
    </div>
    <h1 class="title">Submitted!</h1>
    <h3 class="subtitle">Like this app? Feel free to </h3>
    <p><a href="https://pay.bradleykennedy.co.uk" target="_blank"><img style="margin-right: auto; margin-left: auto; display: block;" src="https://raw.githubusercontent.com/b-kennedy0/b-kennedy0.github.io/master/assets/img/bmc-button.png" width="309" height="80" /></a></p>
<br>
  <p class="close-message"><a href="https://bradleykennedy.co.uk/apps" target="_blank">Return to Apps page</a></p>
    <p class="close-message">or, you may close this page :wave:</p>
  </div>
</div>
</body>