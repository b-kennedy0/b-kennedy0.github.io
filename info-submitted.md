---
layout: super-minimal
title: Information Sent
---
<script src="//code.jquery.com/jquery-1.12.0.min.js"></script>
<style>
.container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #80AEEF;
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
.success-icon {
    width: 82px;
    height: 86px;
    margin-bottom: 1rem;
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

<div class="container">
  <div class="message-box">
    <img class="success-icon" src="https://github.com/b-kennedy0/b-kennedy0.github.io/blob/master/assets/img/greentick.png?raw=true" alt="Success" />
    <h1 class="title">Information submitted!</h1>
    <h3 class="subtitle">Thank you <span id="name"></span></h3>
    <p class="subtitle">The information has been sent through.</p>
    <h3 class="subtitle"><span id="option"></span></h3>
    <p class="close-message">You may now close this page</p>
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
