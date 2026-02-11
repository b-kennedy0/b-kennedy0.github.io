---
layout: minimal
title: Meet with...
head-extra: buttonstyle_code.html
---

<div class="meeting-page">
<main class="meeting-shell">
  <h1 class="meeting-title"><span><strong>Meeting with Brad?</strong></span></h1>
  <h1 id="title" class="meeting-subtitle"><em>Click to notify of your arrival </em></h1>
  <!-- <h2 style="text-align: center;">Are you here for a Meeting or as a Participant?</h2> -->
  <div class="meeting-spacer" aria-hidden="true"></div>
  <div class="text-center">
    <div class="btn-group">
      <a class="button" href="#" id="meeting-arrived" rel="nofollow">ARRIVED</a>
    </div>
  </div>
  <div id="initials-modal" class="meeting-modal" aria-hidden="true" role="dialog" aria-labelledby="initials-title" aria-modal="true">
    <div class="meeting-modal__backdrop" data-modal-close></div>
    <div class="meeting-modal__card" role="document">
      <h2 id="initials-title" class="meeting-modal__title">Enter your initials</h2>
      <p class="meeting-modal__hint">This helps identify who has arrived.</p>
      <label class="meeting-modal__label" for="initials-input">Initials</label>
      <input id="initials-input" class="meeting-modal__input" type="text" inputmode="text" autocomplete="off" maxlength="6" />
      <div class="meeting-modal__actions">
        <button class="button meeting-modal__submit" id="initials-submit" type="button">Submit</button>
        <button class="button meeting-modal__cancel" id="initials-cancel" type="button" data-modal-close>Cancel</button>
      </div>
      <p class="meeting-modal__error" id="initials-error" aria-live="polite"></p>
    </div>
  </div>
  <hr class="meeting-divider" />
  <!-- WILL NEED TO UPDATE THIS IF I USE THE PARTICIPANT LINK AGAIN IN THE FUTURE. 
  <div class="text-center">
    <div class="btn-group">
    <a class="button" href="LINK?action=participant">Participant</a>
  </div>
    </div>
  -->
</main>
</div>
<style>
  .meeting-modal[aria-hidden="true"] { display: none; }
  .meeting-modal {
    position: fixed;
    inset: 0;
    z-index: 1000;
    display: grid;
    place-items: center;
  }
  .meeting-modal__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.55);
  }
  .meeting-modal__card {
    position: relative;
    z-index: 1;
    width: min(92vw, 420px);
    background: #ffffff;
    color: #111111;
    border-radius: 10px;
    padding: 24px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    text-align: left;
  }
  .meeting-modal__title { margin: 0 0 6px; font-size: 22px; }
  .meeting-modal__hint { margin: 0 0 14px; font-size: 14px; color: #555555; }
  .meeting-modal__label { display: block; font-weight: 600; margin-bottom: 6px; }
  .meeting-modal__input {
    width: 100%;
    padding: 10px 12px;
    font-size: 16px;
    border: 1px solid #cccccc;
    border-radius: 6px;
  }
  .meeting-modal__actions { display: flex; gap: 10px; margin-top: 16px; }
  .meeting-modal__submit {
    flex: 1;
    background: #c8f3d2;
    color: #0f3d1f;
  }
  .meeting-modal__cancel { flex: 1; background: #dddddd; color: #222222; }
  .meeting-modal__error { margin: 10px 0 0; color: #b00020; font-size: 13px; min-height: 16px; }
</style>
<script>
  (function () {
    var btn = document.getElementById("meeting-arrived");
    var modal = document.getElementById("initials-modal");
    var input = document.getElementById("initials-input");
    var submit = document.getElementById("initials-submit");
    var error = document.getElementById("initials-error");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      if (!modal) return;
      modal.setAttribute("aria-hidden", "false");
      if (input) input.focus();
    });
    function closeModal() {
      if (!modal) return;
      modal.setAttribute("aria-hidden", "true");
      if (input) input.value = "";
      if (error) error.textContent = "";
    }
    function submitInitials() {
      if (!input) return;
      var initials = input.value.trim();
      if (!initials) {
        if (error) error.textContent = "Please enter your initials.";
        input.focus();
        return;
      }
      var base = "https://hook.eu1.make.com/";
      var path = "iokdgnmxeyqba2ngdl1iqjyxmcttxs58";
      var query = "?action=meeting&a=" + encodeURIComponent(initials);
      window.location.href = base + path + query;
    }
    if (submit) {
      submit.addEventListener("click", function () {
        submitInitials();
      });
    }
    if (input) {
      input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          submitInitials();
        }
      });
    }
    if (modal) {
      modal.addEventListener("click", function (e) {
        if (e.target && e.target.hasAttribute("data-modal-close")) {
          closeModal();
        }
      });
    }
    var cancel = document.getElementById("initials-cancel");
    if (cancel) {
      cancel.addEventListener("click", function () {
        closeModal();
      });
    }
  })();
</script>
