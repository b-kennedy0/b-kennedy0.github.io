var cloudOne = gsap.timeline({repeat: -1, delay: -12});
 cloudOne.to("#cloud-one", 36, {x: "-720px", ease: Linear.easeNone});

var cloudTwo = gsap.timeline({repeat: -1, delay: -3});
 cloudTwo.to("#cloud-two", 24, {x: "-720px", ease: Linear.easeNone});

var cloudFour = gsap.timeline({repeat: -1, delay: 4});
 cloudFour.to("#cloud-four", 33, {x: "-720px", ease: Linear.easeNone});

var cloudFive = gsap.timeline({repeat: -1});
 cloudFive.to("#cloud-five", 24, {x: "-720px", ease: Linear.easeNone});

$("#email").focus(function(){
  if($("#email").val() == ""){
    $("#placeholder").fadeToggle();
  }
});
$("#email").focusout(function(){
  if($("#email").val() == ""){
    $("#placeholder").fadeToggle();
  }
});

$("#btn").mouseenter(function(){
  gsap.to("#btnSVG", .3, {fill: "#d85168"});
});
$("#btn").mouseleave(function(){
  gsap.to("#btnSVG", .3, {fill: "#e96f8c"});
});

$("#email").on("keypress", function(e) {
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    $("#btn").click();
  }
});

gsap.set("#mail", {scale: 0, x: 20, transformOrigin: "right"});

$("#btn").click(function() {
  var submit = gsap.timeline();
    submit.to("#title, #disclaimer, #btn, #email, #placeholder", {opacity: 0, pointerEvents: "none", ease: Power1.easeInOut});
    submit.to("#inputSVG, #btnSVG", .5, {morphSVG:{shape:"#invisible-heart"}, ease: Power1.easeInOut});
    submit.to("#inputSVG, #btnSVG", .5, {y: -30, ease: Power1.easeInOut});
    submit.to("#success", .5, {delay: -.5, opacity: 1, ease: Power1.easeInOut});
  
  var mailbox = gsap.timeline();
    mailbox.to({}, 1, {});
    mailbox.to("#mailbox-stick", 3, {rotate: -90, x: 15, transformOrigin: "left", ease: Elastic.easeOut});
    mailbox.to("#cover-closed", 1, {delay: -3, y: -1, rotation:-180, transformOrigin: "bottom", ease: "Bounce.easeOut"});
    mailbox.to("#cover-open-side", .15, {delay: -2, opacity: 0});
    mailbox.to("#heart", .15, {delay: -3, opacity: 0});
    mailbox.to("#mail", 0, {delay: -3, opacity: 1, display: "block"});
    mailbox.to("#mail", 1, {delay: -3, scale: 1, x: 0, transformOrigin: "right", ease: "back.out"});
  
  var wrapper = gsap.timeline({delay: 3});
    wrapper.to("#svgWrapper", 1, {scale: .8, ease: Bounce.easeOut});
    wrapper.to("#svgWrapper", 1, {delay: -.6, x: "-200%", rotate: 9, ease: Power1.easeIn});
    wrapper.to("#title, #disclaimer, #btn, #email, #placeholder", 0, {opacity: 1, pointerEvents: "all"});
    wrapper.to("#inputSVG", 0, {morphSVG: {shape:"#inputSVG"}, y: 0});
    wrapper.to("#btnSVG", 0, {morphSVG: {shape:"#btnSVG"}, y: 0});
    wrapper.to("#success", 0, {opacity: 0});
    wrapper.to("#mailbox-stick", 0, {rotate: 0, x: 0, transformOrigin: "left"});
    wrapper.to("#cover-closed", 0, {rotation: 0, y: 0, transformOrigin: "bottom"});
    wrapper.to("#cover-open-side", 0, {opacity: 1});
    wrapper.to("#heart", 0, {opacity: 1});
    wrapper.to("#mail", 0, {opacity: 0, scale: 0, x: 0, transformOrigin: "right", display: "none"});
    wrapper.to("#svgWrapper", 0, {x: "200%"});
    wrapper.to("#svgWrapper", 1.5, {x: "0", rotate: -9, ease: "back.out"});
    wrapper.to("#svgWrapper", 1, {delay: -.5, rotate: 0, scale: 1, ease: Bounce.easeOut});
});
