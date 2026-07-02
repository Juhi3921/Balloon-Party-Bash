
var count = 0;
var counterEl = document.getElementById("counter");
var sky = document.getElementById("sky");
var confettiLayer = document.getElementById("confetti");

var messages = [
  "Smile",
  "Dream",
  "Hope",
  "Joy",
  "Shine",
  "Bloom",
  "Laugh",
  "Hello",
  "Happy",
  "Kind",
  "Magic",
  "Believe",
  "Imagine",
  "Create",
  "Explore",
  "Wonder",
  "Spark",
  "Bright",
  "Lucky",
  "Cheers",
  "Celebrate",
  "Peace",
  "Relax",
  "Breathe",
  "Giggle",
  "Yay!",
  "Hooray!",
  "Awesome",
  "Fantastic",
  "Wonderful",
  "Brilliant",
  "Amazing",
  "Sweet",
  "Lovely",
  "Sunny",
  "Rainbow",
  "Fly High",
  "Keep Going",
  "Dream Big",
  "You Rock",
  "Stay Cool",
  "Good Luck",
  "Have Fun",
  "Best Day",
  "Enjoy",
  "Keep Smiling",
  "Stay Happy",
  "You Can",
  "Go For It",
  "Be You"
];
var gradients = [
  ["#ff9a9e", "#c471f5"], 
  ["#43cea2", "#185a9d"], 
  ["#00c6ff", "#00ffd5"], 
  ["#ff9966", "#ffe259"], 
  ["#a8ff78", "#78ffd6"], 
  ["#f6d365", "#fda085"], 
  ["#fbc2eb", "#a6c1ee"]  
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function playWhoosh() {
  try {
    var ctx = new (window.AudioContext || window.webkitAudioContext)();
    var osc = ctx.createOscillator();
    var gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(700, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.4);

    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.15, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.5);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {
  }
}

function releaseBalloon() {
  var balloon = document.createElement("div");
  balloon.className = "balloon";

  var sizes = [70, 90, 110];
  var size = pick(sizes);
  balloon.style.width = size + "px";
  balloon.style.height = size + 15 + "px";

  var g = pick(gradients);
  balloon.style.background = "linear-gradient(135deg, " + g[0] + ", " + g[1] + ")";

  var x = Math.random() * (window.innerWidth - size);
  balloon.style.left = x + "px";

  var msg = document.createElement("span");
  msg.className = "msg";
  msg.textContent = pick(messages);
  balloon.appendChild(msg);

  sky.appendChild(balloon);

  playWhoosh();

  setTimeout(function () {
    if (balloon.parentNode) {
      balloon.parentNode.removeChild(balloon);
    }
  }, 8000);

  count = count + 1;
  counterEl.textContent = "Balloons Released: " + count;

  if (count % 10 === 0) {
    showConfetti();
  }
}

function showConfetti() {
  var colors = ["#ff5c8a", "#ffd166", "#06d6a0", "#4cc9f0", "#c77dff"];
  for (var i = 0; i < 60; i++) {
    var piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "vw";
    piece.style.background = pick(colors);
    piece.style.animationDuration = (2 + Math.random() * 2) + "s";
    piece.style.animationDelay = (Math.random() * 0.5) + "s";
    confettiLayer.appendChild(piece);

    setTimeout(function (p) {
      return function () {
        if (p.parentNode) p.parentNode.removeChild(p);
      };
    }(piece), 4500);
  }
}

document.addEventListener("keydown", function (e) {
  if (e.key === "b" || e.key === "B") {
    e.preventDefault();
    releaseBalloon();
  }
});

