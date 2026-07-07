function toggleMusic() {
  var audio = document.getElementById('bgm');
  var btn = document.getElementById('music-toggle');
  if (!audio || !btn) return;

  if (audio.paused) {
    audio.play().then(function () {
      btn.innerText = 'Mortis唱太難聽';
      btn.style.background = '#555';
    }).catch(function () {
      btn.innerText = '來聽Mortis唱歌        ';
    });
  } else {
    audio.pause();
    btn.innerText = '來聽Mortis唱歌        ';
    btn.style.background = '#555';
  }
}

window.addEventListener('DOMContentLoaded', function () {
  var audio = document.getElementById('bgm');
  if (audio) {
    audio.pause();
  }
  var btn = document.getElementById('music-toggle');
  if (btn) {
    btn.innerText = '來聽Mortis唱歌';
  }
});

setInterval(function () {
  var clock = document.getElementById('clock');
  if (clock) {
    clock.innerText = new Date().toString();
  }
}, 1000);

var frames = ['▁▂▃▄▅▆▇', '▂▁▂▃▄▅▆', '▃▂▁▂▃▄▅', '▄▃▂▁▂▃▄', '▅▄▃▂▁▂▃'];
var fi = 0;
setInterval(function () {
  fi = (fi + 1) % frames.length;
  document.title = frames[fi] + ' ？？？';
}, 200);

var terminalInput = document.getElementById('terminal-input');
var terminalOutput = document.getElementById('terminal-output');
if (terminalInput && terminalOutput) {
  terminalInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var cmd = terminalInput.value.trim();
      terminalOutput.innerText = cmd || 'empty command';
      terminalInput.value = '';

      if (cmd.toLowerCase().includes('hack') || cmd.toLowerCase().includes('sudo') || cmd.toLowerCase().includes('init')) {
        terminalOutput.innerText = 'computer has been invaded';
        setTimeout(function () {
          terminalOutput.innerText = 'access granted...';
        }, 800);
      } else {
        terminalOutput.innerText = 'command not found';
      }
    }
  });
}

function getSiteRootUrl() {
  var currentScript = document.currentScript || document.scripts[document.scripts.length - 1];
  var scriptUrl = currentScript && currentScript.src ? currentScript.src : 'js/main.js';
  try {
    var scriptFileUrl = new URL(scriptUrl, document.baseURI);
    return new URL('../', scriptFileUrl);
  } catch (e) {
    return new URL('.', document.baseURI);
  }
}

function resolveAssetPath(relativePath) {
  return new URL(relativePath, getSiteRootUrl()).href;
}

var flyGifs = [
  resolveAssetPath('asstes/fly/1510712344026546216-1.gif'),
  resolveAssetPath('asstes/fly/kkkk.gif'),
  resolveAssetPath('asstes/fly/mutsumi-mortis.gif'),
  resolveAssetPath('asstes/fly/sakuya.gif'),
  resolveAssetPath('asstes/fly/若葉睦.gif')
];
var symRoot = document.getElementById('sym');
if (!symRoot) {
  symRoot = document.createElement('div');
  symRoot.id = 'sym';
  document.body.appendChild(symRoot);
}
for (var n = 0; n < 5; n++) {
  (function () {
    var el = document.createElement('img');
    el.className = 'float-gif';
    el.src = flyGifs[Math.floor(Math.random() * flyGifs.length)];
    el.style.left = Math.random() * 90 + 'vw';
    el.style.top = Math.random() * 80 + 'vh';
    el.style.width = (45 + Math.random() * 35) + 'px';
    symRoot.appendChild(el);

    var dx = (Math.random() - 0.5) * 3;
    var dy = (Math.random() - 0.5) * 3;
    var x = parseFloat(el.style.left);
    var y = parseFloat(el.style.top);

    setInterval(function () {
      x += dx; y += dy;
      if (x < 0 || x > 95) { dx = -dx; }
      if (y < 0 || y > 90) { dy = -dy; }
      el.style.left = x + 'vw';
      el.style.top = y + 'vh';
    }, 30);
  })();
}

var totalArticles = 0;
var runtimeStorageKey = 'site-start-time';
function getSiteStartTime() {
  try {
    var saved = localStorage.getItem(runtimeStorageKey);
    if (saved) {
      return parseInt(saved, 10);
    }
  } catch (e) {}

  var lastModified = Date.parse(document.lastModified);
  var startTime = (!isNaN(lastModified) && lastModified > 0) ? lastModified : Date.now();

  try {
    localStorage.setItem(runtimeStorageKey, String(startTime));
  } catch (e) {}

  return startTime;
}

var startTime = getSiteStartTime();
function updateRuntimeInfo() {
  var elapsed = Math.floor((Date.now() - startTime) / 1000);
  var h = String(Math.floor(elapsed / 3600)).padStart(2, '0');
  var m = String(Math.floor((elapsed % 3600) / 60)).padStart(2, '0');
  var s = String(elapsed % 60).padStart(2, '0');
  var info = document.getElementById('runtime-info');
  if (info) {
    info.innerText = '運行時間: ' + h + ':' + m + ':' + s + ' | 總文章數: ' + totalArticles;
  }
}
setInterval(updateRuntimeInfo, 1000);
updateRuntimeInfo();

var friendData = [
  {
    name: '青呱GUA',
    description: '裝弱大電神',
    avatar: resolveAssetPath('asstes/friend/gua.png'),
    url: 'https://guatw.net/html/Main.html',
    accent: '#2c2023'
  }
];

function createFriendCard(friend) {
  var card = document.createElement('article');
  card.className = 'friend-card';

  var avatarHtml = '';
  if (friend.avatar) {
    if (typeof friend.avatar === 'string' && /^https?:\/\//i.test(friend.avatar)) {
      avatarHtml = '<img src="' + friend.avatar + '" alt="' + friend.name + ' 頭像">';
    } else if (typeof friend.avatar === 'string' && friend.avatar.trim() !== '') {
      avatarHtml = '<img src="' + friend.avatar + '" alt="' + friend.name + ' 頭像">';
    } else {
      avatarHtml = '<span>' + (friend.emoji || '🙂') + '</span>';
    }
  } else {
    avatarHtml = '<span>' + (friend.emoji || '🙂') + '</span>';
  }

  card.innerHTML = [
    '<div class="friend-avatar">' + avatarHtml + '</div>',
    '<h3 class="friend-name">' + friend.name + '</h3>',
    '<p class="friend-description">' + friend.description + '</p>',
    '<a class="friend-link" href="' + friend.url + '" target="_blank" rel="noopener noreferrer">前往</a>'
  ].join('');
  card.style.borderColor = friend.accent;
  card.style.boxShadow = '0 10px 24px rgba(0, 0, 0, 0.25)';
  return card;
}

function renderFriendCards(friends) {
  var board = document.getElementById('friends-board');
  if (!board) return [];

  board.innerHTML = '';
  var cards = friends.map(function (friend) {
    return createFriendCard(friend);
  });

  cards.forEach(function (card) {
    board.appendChild(card);
  });

  return cards;
}

function initFriendCards(cards) {
  var board = document.getElementById('friends-board');
  if (!board || !cards.length) return;

  var boardWidth = board.clientWidth;
  var boardHeight = board.clientHeight;
  var motionState = cards.map(function (card) {
    var width = card.offsetWidth || 220;
    var height = card.offsetHeight || 140;
    var x = Math.random() * Math.max(1, boardWidth - width);
    var y = Math.random() * Math.max(1, boardHeight - height);
    var vx = (Math.random() - 0.5) * 1.6;
    var vy = (Math.random() - 0.5) * 1.6;
    card.style.left = x + 'px';
    card.style.top = y + 'px';
    return { card: card, x: x, y: y, vx: vx, vy: vy, width: width, height: height };
  });

  function animate() {
    boardWidth = board.clientWidth;
    boardHeight = board.clientHeight;

    motionState.forEach(function (item, index) {
      item.x += item.vx;
      item.y += item.vy;

      if (item.x <= 0) {
        item.x = 0;
        item.vx = Math.abs(item.vx);
      } else if (item.x + item.width >= boardWidth) {
        item.x = Math.max(0, boardWidth - item.width);
        item.vx = -Math.abs(item.vx);
      }

      if (item.y <= 0) {
        item.y = 0;
        item.vy = Math.abs(item.vy);
      } else if (item.y + item.height >= boardHeight) {
        item.y = Math.max(0, boardHeight - item.height);
        item.vy = -Math.abs(item.vy);
      }

      item.card.style.left = item.x + 'px';
      item.card.style.top = item.y + 'px';

      for (var j = index + 1; j < motionState.length; j += 1) {
        var other = motionState[j];
        var overlapX = Math.min(item.x + item.width, other.x + other.width) - Math.max(item.x, other.x);
        var overlapY = Math.min(item.y + item.height, other.y + other.height) - Math.max(item.y, other.y);

        if (overlapX > 0 && overlapY > 0) {
          if (overlapX < overlapY) {
            if (item.x < other.x) {
              item.x -= overlapX;
              other.x += overlapX;
            } else {
              item.x += overlapX;
              other.x -= overlapX;
            }
            item.vx *= -1;
            other.vx *= -1;
          } else {
            if (item.y < other.y) {
              item.y -= overlapY;
              other.y += overlapY;
            } else {
              item.y += overlapY;
              other.y -= overlapY;
            }
            item.vy *= -1;
            other.vy *= -1;
          }

          item.card.style.left = item.x + 'px';
          item.card.style.top = item.y + 'px';
          other.card.style.left = other.x + 'px';
          other.card.style.top = other.y + 'px';
        }
      }
    });

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}

var cards = renderFriendCards(friendData);
initFriendCards(cards);

var audioCtx;
var pianoPressCount = 0;

var PIANO_VOLUME = 0.45;

var pianoMelody = [
  {note: 'E', dur: 0.25}, {note: 'G#', dur: 0.25}, {note: 'B', dur: 0.5},
  {note: 'E', dur: 0.25}, {note: 'G#', dur: 0.25}, {note: 'B', dur: 0.5},
  {note: 'C#', dur: 0.25}, {note: 'B', dur: 0.25}, {note: 'A', dur: 0.5},
  {note: 'B', dur: 0.25}, {note: 'C#', dur: 0.25}, {note: 'D#', dur: 0.5},
  {note: 'E', dur: 0.25}, {note: 'F#', dur: 0.25}, {note: 'G#', dur: 0.25}, {note: 'B', dur: 0.25},
  {note: 'G#', dur: 0.5}, {note: 'F#', dur: 0.5},
  {note: 'E', dur: 0.5}, {note: 'B', dur: 0.5},
  {note: 'C#', dur: 0.25}, {note: 'D#', dur: 0.25}, {note: 'E', dur: 1}
];
var noteFreq = {
  C: 261.63,
  'C#': 277.18,
  D: 293.66,
  'D#': 311.13,
  E: 329.63,
  F: 349.23,
  'F#': 369.99,
  G: 392.00,
  'G#': 415.30,
  A: 440.00,
  'A#': 466.16,
  B: 493.88
};
function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}
function playTone(freq, duration) {
  // convenience wrapper: play immediately
  playToneAtTime(freq, duration, getAudioContext().currentTime + 0.01);
}

function playToneAtTime(freq, duration, when) {
  var ctx = getAudioContext();
  var master = ctx.createGain();
  master.gain.setValueAtTime(typeof PIANO_VOLUME !== 'undefined' ? PIANO_VOLUME : 0.8, when);

  // velocity-like control (keep moderate)
  var velocity = 0.85;

  // amplitude envelope (slightly softer attack, longer release for sampled-like piano)
  var env = ctx.createGain();
  env.gain.setValueAtTime(0.0001, when);
  env.gain.linearRampToValueAtTime(velocity, when + 0.01);
  env.gain.exponentialRampToValueAtTime(0.0005, when + duration + 0.08);

  // three partials to emulate piano body (main, octave, fifth-ish)
  var oscMain = ctx.createOscillator(); oscMain.type = 'triangle'; oscMain.frequency.value = freq;
  var oscOct = ctx.createOscillator(); oscOct.type = 'sine'; oscOct.frequency.value = freq * 2; oscOct.detune.value = -5;
  var osc5th = ctx.createOscillator(); osc5th.type = 'sine'; osc5th.frequency.value = freq * 1.5; osc5th.detune.value = 6;

  var gMain = ctx.createGain(); gMain.gain.value = 0.7;
  var gOct = ctx.createGain(); gOct.gain.value = 0.22;
  var g5th = ctx.createGain(); g5th.gain.value = 0.08;

  oscMain.connect(gMain); gMain.connect(env);
  oscOct.connect(gOct); gOct.connect(env);
  osc5th.connect(g5th); g5th.connect(env);

  // hammer noise (very short, subtle)
  var noiseBuf = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.015), ctx.sampleRate);
  var data = noiseBuf.getChannelData(0);
  for (var i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.004));
  var nb = ctx.createBufferSource(); nb.buffer = noiseBuf; nb.loop = false;
  var ng = ctx.createGain(); ng.gain.setValueAtTime(0.35, when); ng.gain.exponentialRampToValueAtTime(0.001, when + 0.03);
  nb.connect(ng); ng.connect(env);

  // small resonant filter to shape timbre
  var filter = ctx.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.setValueAtTime(10000, when);
  filter.Q.value = 0.8;
  filter.frequency.exponentialRampToValueAtTime(3600, when + Math.max(0.02, duration * 0.4));

  // light stereo spread using two delay taps
  var delayL = ctx.createDelay(); delayL.delayTime.value = 0.012;
  var delayR = ctx.createDelay(); delayR.delayTime.value = 0.018;
  var dlGain = ctx.createGain(); dlGain.gain.value = 0.08;
  var drGain = ctx.createGain(); drGain.gain.value = 0.06;

  env.connect(filter);
  filter.connect(master);
  master.connect(ctx.destination);
  filter.connect(delayL); filter.connect(delayR);
  delayL.connect(dlGain); dlGain.connect(ctx.destination);
  delayR.connect(drGain); drGain.connect(ctx.destination);

  // tiny feedback for warmth (low gain)
  var fb = ctx.createGain(); fb.gain.value = 0.06;
  delayL.connect(fb); fb.connect(delayL);

  // start sources
  nb.start(when);
  oscMain.start(when); oscOct.start(when); osc5th.start(when);

  // stop
  oscMain.stop(when + duration + 0.12); oscOct.stop(when + duration + 0.12); osc5th.stop(when + duration + 0.12);
  nb.stop(when + 0.03);
}

function autoPlayMelody() {
  var start = getAudioContext().currentTime + 0.1;
  var acc = 0;
  pianoMelody.forEach(function (item) {
    var t = start + acc;
    var f = noteFreq[item.note] || 261.63;
    playToneAtTime(f, item.dur, t);
    acc += item.dur;
  });
}
// preload Haruhikage MP3 for three-press playback
var haruAudio = new Audio(resolveAssetPath('asstes/fly/春日影.mp3'));
haruAudio.preload = 'auto';
haruAudio.volume = 0.5; // reduce MP3 playback volume

var pianoRoot = document.getElementById('piano');
if (pianoRoot) {
  pianoRoot.querySelectorAll('.piano-key').forEach(function (key) {
    key.addEventListener('click', function () {
      var freq = parseFloat(key.dataset.freq);
      if (!isNaN(freq)) {
        playTone(freq, 0.25);
        key.classList.add('active');
        setTimeout(function () {
          key.classList.remove('active');
        }, 120);
      }
      pianoPressCount += 1;
      if (pianoPressCount === 3) {
        // play the MP3 and reset counter
        try {
          haruAudio.currentTime = 0;
          haruAudio.play().catch(function () { /* ignore play errors */ });
        } catch (e) {
          // fallback: create and play a new Audio
          var a = new Audio(resolveAssetPath('asstes/fly/春日影.mp3'));
          a.play().catch(function () {});
        }
        pianoPressCount = 0;
      }
    });
  });
}
