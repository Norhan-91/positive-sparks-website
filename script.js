// 🌸 ومضات إيجابية - محرك الحديقة السحرية

const moodData = {
  happy: {
    colorClass: 'mood-happy',
    flower: '🌷',
    messages: ['سعادتك اليوم هدية جميلة، شاركها بابتسامة صغيرة مع من حولك. ✨', 'رائع! قلبك مشرق، واليوم ينتظر منك لمسة فرح إضافية. 💖', 'يا لها من طاقة جميلة! استمر، فوجودك يزرع النور في كل مكان. 🌟']
  },
  sad: {
    colorClass: 'mood-sad',
    flower: '🪻',
    messages: ['أنا هنا معك... حتى الأيام الثقيلة تمر، وأنت تستحق الراحة واللطف. 💙', 'خذ نفساً عميقاً، فالغد يحمل لك صفحة أخف وألطف بإذن الله. 🌤️', 'حزنك لا يقلل منك، بل يكشف قوة قلبك الصبور. 🤍']
  },
  stressed: {
    colorClass: 'mood-stressed',
    flower: '🌼',
    messages: ['تمهّل قليلاً، خطوة صغيرة بهدوء أفضل من قفزة متعبة. 🌿', 'كل ما عليك الآن: نفس عميق... وزفير... أنت تتقدم بالفعل. 🫶', 'قد يبدو اليوم مزدحماً، لكنك أقوى وأكثر مرونة مما تظن. ⚡']
  },
  calm: {
    colorClass: 'mood-calm',
    flower: '🪷',
    messages: ['ما أجمل هدوءك... هذا السلام الداخلي مصدر إلهام حقيقي. 🌙', 'صفاؤك اليوم كنز، حافظ عليه بلحظة امتنان لطيفة. ✨', 'هدوءك ينعكس جمالاً على كل شيء حولك. 🤍']
  },
  excited: {
    colorClass: 'mood-excited',
    flower: '🌺',
    messages: ['حماسك مُعدٍ! اجعل هذه الطاقة خطوة عملية نحو حلمك. 🚀', 'انطلق! اليوم مناسب جداً لبدء شيء جديد يسعدك. 🎯', 'هذا الوهج فيك مذهل، ثابر وستدهش نفسك قبل الآخرين. 🔥']
  }
};

const positiveWords = ['أمل', 'نجاح', 'شجاعة', 'حب', 'طمأنينة', 'إشراقة', 'فرح', 'عطاء'];
const dailyQuotes = ['حين تمتّن، تزهر الحياة.', 'أنت قادر على تحويل يومك إلى مساحة نور.', 'حتى الخطوات الصغيرة تصنع فرقاً كبيراً.', 'القلب اللطيف أقوى مما يظن.'];
const dailyAffirmations = ['أنا أستحق السلام والنجاح.', 'أختار اليوم أن أكون لطيفاً مع نفسي.', 'طاقتي تنمو مع كل فكرة جميلة.', 'أنا ممتن للنعم الصغيرة قبل الكبيرة.'];

const state = {
  energy: Number(localStorage.getItem('energyLevel') || 0),
  moods: JSON.parse(localStorage.getItem('moods') || '[]'),
  gratitudeEntries: JSON.parse(localStorage.getItem('gratitudeEntries') || '[]'),
  currentMood: null,
  gameActive: false,
  audioCtx: null,
  ambientInterval: null
};

const $ = (id) => document.getElementById(id);
const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

function saveState() {
  localStorage.setItem('energyLevel', String(state.energy));
  localStorage.setItem('moods', JSON.stringify(state.moods.slice(-20)));
  localStorage.setItem('gratitudeEntries', JSON.stringify(state.gratitudeEntries.slice(-20)));
}

function typeText(el, text, speed = 27) {
  el.textContent = '';
  return new Promise((resolve) => {
    let i = 0;
    const timer = setInterval(() => {
      el.textContent += text[i] || '';
      i += 1;
      if (i > text.length) {
        clearInterval(timer);
        resolve();
      }
    }, speed);
  });
}

function createSparkle(x, y, char = '✨') {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.textContent = char;
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  $('sparkle-container').appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 1400);
}

function createPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.style.left = `${Math.random() * window.innerWidth}px`;
  document.querySelector('.petals-container').appendChild(p);
  setTimeout(() => p.remove(), 8000);
}

function createLightParticles(count = 7) {
  const layer = $('light-particles');
  for (let i = 0; i < count; i += 1) {
    const dot = document.createElement('span');
    dot.className = 'light-dot';
    dot.style.left = `${10 + Math.random() * 80}%`;
    dot.style.bottom = `${Math.random() * 30}%`;
    dot.style.animationDelay = `${i * 80}ms`;
    layer.appendChild(dot);
    setTimeout(() => dot.remove(), 6100);
  }
}

function increaseEnergy(amount) {
  state.energy = Math.min(100, state.energy + amount);
  $('energy-bar').style.width = `${state.energy}%`;
  $('energy-percentage').textContent = `${Math.round(state.energy)}%`;
  saveState();
  updatePersonalEnergyMessage();
}

function setMood(moodKey) {
  state.currentMood = moodKey;
  state.moods.push({ mood: moodKey, timestamp: Date.now() });
  saveState();

  Object.keys(moodData).forEach((key) => document.body.classList.remove(moodData[key].colorClass));
  document.body.classList.add(moodData[moodKey].colorClass, 'mood-changed');
  setTimeout(() => document.body.classList.remove('mood-changed'), 600);
  $('mood-flower').textContent = moodData[moodKey].flower;

  const message = randomItem(moodData[moodKey].messages);
  $('ai-response').hidden = false;
  typeText($('typing-text'), `أشعر بك اليوم... ${message}`);
  createLightParticles(moodKey === 'sad' ? 14 : 8);
  increaseEnergy(16);
}

function renderGratitudeBook() {
  const box = $('gratitude-entries');
  box.innerHTML = '';
  state.gratitudeEntries.slice(-6).reverse().forEach((entry) => {
    const card = document.createElement('article');
    card.className = 'gratitude-entry';
    card.innerHTML = `<p>💚 ${entry.text}</p><small>${new Date(entry.timestamp).toLocaleDateString('ar-EG')}</small>`;
    box.appendChild(card);
  });
}

function submitGratitude() {
  const input = $('gratitude-input');
  const text = input.value.trim();
  if (!text) return;
  state.gratitudeEntries.push({ text, timestamp: Date.now() });
  saveState();
  input.value = '';

  const quote = randomItem(dailyQuotes);
  $('quote-box').hidden = false;
  $('quote-text').textContent = `✨ ${quote} ✨`;

  for (let i = 0; i < 9; i += 1) {
    const x = window.innerWidth / 2 + (Math.random() * 160 - 80);
    const y = window.innerHeight / 2 + (Math.random() * 120 - 60);
    createSparkle(x, y, '💗');
  }

  renderGratitudeBook();
  increaseEnergy(20);
  updatePersonalEnergyMessage();
}

function updatePersonalEnergyMessage() {
  const moods = state.moods.slice(-3).map((m) => m.mood);
  const lastMood = moods[moods.length - 1] || 'calm';
  const lastGratitude = state.gratitudeEntries[state.gratitudeEntries.length - 1]?.text || '';
  const lengthFactor = lastGratitude.length;

  let moodTone = 'قلبك اليوم متزن وجميل.';
  if (lastMood === 'sad') moodTone = 'رغم الحزن، لديك نور داخلي رائع.';
  if (lastMood === 'stressed') moodTone = 'وسط الضغط، ما زلت تتقدم بشجاعة.';
  if (lastMood === 'excited') moodTone = 'حماسك يفتح أمامك أبواباً جميلة.';
  if (lastMood === 'happy') moodTone = 'فرحك ينعكس لطفاً على من حولك.';

  const memoryTone = moods.length > 1 ? `أتذكر مزاجاتك الأخيرة: ${moods.map((m) => ({ happy: 'سعيد', sad: 'حزين', stressed: 'متوتر', calm: 'هادئ', excited: 'متحمس' }[m])).join(' ← ')}.` : 'هذه بداية جميلة لرحلتنا معاً.';
  const gratitudeTone = lengthFactor > 80 ? 'كتابتك التفصيلية عن الامتنان تعني أن قلبك متصل بعمق بالنِعَم.' : 'حتى كلمات الامتنان القصيرة تصنع أثراً كبيراً.';

  typeText($('energy-ai-message'), `${moodTone} ${gratitudeTone} ${memoryTone}`);
}

function initDailySpark() {
  $('daily-quote').textContent = `✨ ${randomItem(dailyQuotes)} ✨`;
  $('daily-affirmation').textContent = randomItem(dailyAffirmations);
}

// Game: catch flowers
const canvas = $('catch-canvas');
const ctx = canvas.getContext('2d');
let flowers = [];
let score = 0;

class Flower {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = -20;
    this.z = 0.6 + Math.random() * 0.8;
    this.speed = 1.4 + Math.random() * 1.8;
  }
  draw() {
    ctx.font = `${Math.round(24 * this.z)}px Arial`;
    ctx.fillText('🌸', this.x, this.y);
  }
  update() { this.y += this.speed; }
}

function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255,255,255,0.7)');
  gradient.addColorStop(1, 'rgba(225,245,255,0.45)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  flowers = flowers.filter((f) => f.y < canvas.height + 30);
  flowers.forEach((f) => { f.update(); f.draw(); });

  if (state.gameActive) requestAnimationFrame(drawGame);
}

function startGame() {
  if (state.gameActive) return;
  score = 0;
  flowers = [];
  $('flower-score').textContent = '0';
  state.gameActive = true;

  const words = ['أمل', 'نجاح', 'شجاعة', 'حب', 'طمأنينة', 'إشراقة'];
  const wordTicker = setInterval(() => { $('positive-floating-word').textContent = randomItem(words); }, 900);
  const spawner = setInterval(() => { flowers.push(new Flower()); }, 380);

  drawGame();
  setTimeout(() => {
    state.gameActive = false;
    clearInterval(spawner);
    clearInterval(wordTicker);
    increaseEnergy(Math.min(22, score * 2));
  }, 18000);
}

canvas.addEventListener('click', (e) => {
  if (!state.gameActive) return;
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  flowers = flowers.filter((f) => {
    const hit = Math.abs(f.x - x) < 22 && Math.abs(f.y - y) < 22;
    if (hit) {
      score += 1;
      $('flower-score').textContent = String(score);
      createSparkle(e.clientX, e.clientY);
    }
    return !hit;
  });
});

function playBeep() {
  const ctxAudio = state.audioCtx || new (window.AudioContext || window.webkitAudioContext)();
  state.audioCtx = ctxAudio;
  const osc = ctxAudio.createOscillator();
  const gain = ctxAudio.createGain();
  osc.type = 'sine';
  osc.frequency.value = 660;
  gain.gain.setValueAtTime(0.001, ctxAudio.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.07, ctxAudio.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, ctxAudio.currentTime + 0.24);
  osc.connect(gain).connect(ctxAudio.destination);
  osc.start();
  osc.stop(ctxAudio.currentTime + 0.25);
}

function toggleAmbient() {
  if (!state.audioCtx) state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  const btn = $('audio-toggle');

  if (state.ambientInterval) {
    clearInterval(state.ambientInterval);
    state.ambientInterval = null;
    btn.classList.remove('playing');
    btn.textContent = '🎵';
    return;
  }

  const notes = [261.63, 329.63, 392.0, 523.25];
  const playAmbientNote = () => {
    const osc = state.audioCtx.createOscillator();
    const gain = state.audioCtx.createGain();
    osc.frequency.value = randomItem(notes);
    osc.type = 'triangle';
    gain.gain.setValueAtTime(0.0001, state.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.03, state.audioCtx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, state.audioCtx.currentTime + 2.8);
    osc.connect(gain).connect(state.audioCtx.destination);
    osc.start();
    osc.stop(state.audioCtx.currentTime + 3);
  };

  playAmbientNote();
  state.ambientInterval = setInterval(playAmbientNote, 2400);
  btn.classList.add('playing');
  btn.textContent = '🔊';
}

function initEvents() {
  $('start-journey').addEventListener('click', () => {
    document.body.classList.add('deep-garden');
    $('mood-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  document.querySelectorAll('.mood-sphere').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.mood-sphere').forEach((m) => m.classList.remove('selected'));
      btn.classList.add('selected');
      setMood(btn.dataset.mood);
    });
  });

  $('gratitude-submit').addEventListener('click', submitGratitude);
  $('catch-start').addEventListener('click', startGame);

  $('word-generate').addEventListener('click', () => {
    $('word-display').textContent = `${randomItem(positiveWords)} ✨`;
    $('word-display').style.animation = 'none';
    setTimeout(() => { $('word-display').style.animation = 'wordAppear .6s ease'; }, 10);
    playBeep();
    createLightParticles(8);
    increaseEnergy(9);
  });

  $('audio-toggle').addEventListener('click', toggleAmbient);
  document.addEventListener('click', (e) => {
    if (e.target.closest('button')) createSparkle(e.clientX, e.clientY);
  });
}

function init() {
  initDailySpark();
  renderGratitudeBook();
  increaseEnergy(5);
  updatePersonalEnergyMessage();
  initEvents();
  setInterval(() => { if (Math.random() > 0.35) createPetal(); }, 1500);
}

document.addEventListener('DOMContentLoaded', init);
