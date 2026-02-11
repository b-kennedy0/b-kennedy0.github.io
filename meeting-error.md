---
layout: minimal
title: Meeting Error
head-extra: buttonstyle_code.html
---

<div class="meeting-page">
<main class="meeting-shell">
  <div class="meeting-error-symbol" aria-hidden="true">
    <span class="meeting-error-x">✕</span>
  </div>
  <h1 class="meeting-title"><span><strong>Error - Alert not sent</strong></span></h1>
  <h2 class="meeting-subtitle"><em>Brad has not been informed due to an error with your submission.</em></h2>
  <div class="meeting-spacer" aria-hidden="true"></div>
</main>
</div>

<style>
  .meeting-error-symbol {
    width: 96px;
    height: 96px;
    margin: 0 auto 18px;
    border-radius: 50%;
    background: #b00020;
    display: grid;
    place-items: center;
    box-shadow: 0 12px 24px rgba(176, 0, 32, 0.35);
  }
  .meeting-error-x {
    color: #ffffff;
    font-size: 44px;
    line-height: 1;
    font-weight: 700;
  }
</style>
