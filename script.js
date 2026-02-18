// ======================================
// 🌸 POSITIVE SPARKS - JAVASCRIPT 🌸
// A Magical Positivity Garden Engine
// ======================================

// ======================================
// DATA & CONFIGURATION
// ======================================

const moodData = {
    happy: {
        color: '#FFB6D9',
        messages: [
            'روعة! استمتع بهذه اللحظات السعيدة! ✨',
            'سعادتك تضيء العالم! استمر في الابتسام! 😊',
            'أنت تشع بإيجابية! الحياة معك جميلة! 🌟',
            'رائع! هذا الشعور يستحق أن تحتفظ به! 💫'
        ]
    },
    sad: {
        color: '#A0D8F7',
        messages: [
            'كل شعور حزن يعلمنا درساً. أنت قوي! 💙',
            'السحب ستمر والشمس ستشرق مجدداً. صبراً! 🌤️',
            'حزنك صحي، لكن تذكر: أنت لست وحدك! 🤝',
            'في كل ليل ظلام يأتي صباح جديد! ☀️'
        ]
    },
    stressed: {
        color: '#FFD9A8',
        messages: [
            'خذ نفساً عميقاً. أنت أقوى مما تعتقد! 🌬️',
            'التوتر مؤقت، لكن قوتك دائمة! 💪',
            'كل تحدٍ يقربك من النجاح! استمر! 🚀',
            'تذكر: يمكنك التعامل مع هذا! 🔥'
        ]
    },
    calm: {
        color: '#E8D5F5',
        messages: [
            'هدوؤك هو قوة حقيقية! استمتع بهذا السلام! 🧘',
            'في هذا الهدوء تجد الحكمة والوضوح! 🌙',
            'أنت متوازن، وهذا أجمل حالاتك! ✨',
            'حافظ على هذا الصفاء، إنه ثمين! 💎'
        ]
    },
    excited: {
        color: '#B8F3E8',
        messages: [
            'طاقتك معدية! اذهب وحقق أحلامك! 🎯',
            'هذا الحماس سيأخذك للقمة! استمر! 🚀',
            'أنت حريق من الإمكانيات! أشعل العالم! 🔥',
            'يا لك من مذهل! العالم يحتاج طاقتك! ⭐'
        ]
    }
};

const positiveWords = [
    'أمل 🌟',
    'نجاح 🏆',
    'شجاعة 💪',
    'حب 💖',
    'طمأنينة 🙏',
    'إشراقة ☀️',
    'قوة ⚡',
    'جمال 🌸',
    'سلام 🕊️',
    'إبداع 🎨',
    'صحة 💚',
    'مرح 🎉',
    'عزم 🎯',
    'حكمة 📖',
    'سخاء 🎁',
    'صبر 🌿',
    'تحسن 📈',
    'فرح 😄',
    'عطاء 💝',
    'ضياء ✨'
];

const dailyQuotes = [
    'النجاح ليس وجهة، بل رحلة!',
    'كل يوم جديد يحمل فرصة جديدة!',
    'الحب هو أقوى قوة في الكون!',
    'أنت أقوى مما تتخيل بكثير!',
    'البسمة تغير كل شيء!',
    'التغيير يبدأ من داخلك!',
    'الامتنان يملأ الحياة بالمعنى!',
    'كل خطوة صغيرة تحسب!',
    'أنت تستحق الأفضل في الحياة!',
    'الحياة جميلة عندما تركز على الإيجابيات!'
];

const dailyAffirmations = [
    'أنا قادر على تحقيق أحلامي 💪',
    'أستحق الحب والنجاح والسعادة 💖',
    'كل يوم يجلب لي فرصاً جديدة ✨',
    'أنا ممتن للحياة ولحسناتها 🙏',
    'طاقتي إيجابية وقوية اليوم 🔥',
    'أختار أن أكون سعيداً اليوم 😊',
    'أنا قيمة حقيقية في هذا العالم 👑'
];

// ======================================
// STATE MANAGEMENT
// ======================================

let appState = {
    currentMood: null,
    energyLevel: 0,
    gratitudeEntries: JSON.parse(localStorage.getItem('gratitudeEntries')) || [],
    moods: JSON.parse(localStorage.getItem('moods')) || [],
    isGamePlaying: false
};

// ======================================
// UTILITY FUNCTIONS
// ======================================

/**
 * Get random item from array
 */
function getRandomItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Create sparkle effect at mouse position
 */
function createSparkle(x, y) {
    const sparkleContainer = document.getElementById('sparkle-container');
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.textContent = '✨';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    sparkleContainer.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1500);
}

/**
 * Create floating petals
 */
function createFloatingPetal() {
    const container = document.querySelector('.petals-container');
    if (!container) return;
    
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.style.left = Math.random() * window.innerWidth + 'px';
    petal.style.background = getRandomItem([
        'var(--pink)',
        'var(--light-pink)',
        'var(--yellow)',
        'var(--light-yellow)',
        'var(--mint)'
    ]);
    
    container.appendChild(petal);
    
    setTimeout(() => petal.remove(), 8000);
}

/**
 * Typing animation effect
 */
async function typeText(element, text, speed = 50) {
    element.innerHTML = '';
    
    for (let char of text) {
        element.innerHTML += char;
        await new Promise(resolve => setTimeout(resolve, speed));
    }
    
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    element.appendChild(cursor);
}

/**
 * Update energy bar
 */
function updateEnergyBar() {
    const bar = document.getElementById('energy-bar');
    const percentage = document.getElementById('energy-percentage');
    const energy = appState.energyLevel;
    
    bar.style.width = energy + '%';
    percentage.textContent = energy + '%';
}

/**
 * Increase energy
 */
function increaseEnergy(amount = 10) {
    appState.energyLevel = Math.min(100, appState.energyLevel + amount);
    updateEnergyBar();
}

/**
 * Save to localStorage
 */
function saveState() {
    localStorage.setItem('gratitudeEntries', JSON.stringify(appState.gratitudeEntries));
    localStorage.setItem('moods', JSON.stringify(appState.moods));
}

// ======================================
// MOOD AI SYSTEM
// ======================================

/**
 * Handle mood selection
 */
function handleMoodSelection(mood) {
    appState.currentMood = mood;
    appState.moods.push({
        mood: mood,
        timestamp: new Date().toISOString()
    });
    saveState();
    
    // Visual feedback
    document.body.classList.add('mood-changed');
    setTimeout(() => document.body.classList.remove('mood-changed'), 800);
    
    // Get AI response
    generateAIMoodResponse(mood);
    
    // Increase energy
    increaseEnergy(15);
    
    // Create sparkles
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            createSparkle(
                Math.random() * window.innerWidth,
                Math.random() * window.innerHeight
            );
        }, i * 100);
    }
}

/**
 * Generate AI personalized response
 */
async function generateAIMoodResponse(mood) {
    const messages = moodData[mood].messages;
    const message = getRandomItem(messages);
    
    const responseBox = document.getElementById('ai-response');
    const typingText = document.getElementById('typing-text');
    
    responseBox.style.display = 'block';
    responseBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    await typeText(typingText, message, 30);
}

// Setup mood buttons
document.querySelectorAll('.mood-sphere').forEach(button => {
    button.addEventListener('click', function() {
        // Remove previous selection
        document.querySelectorAll('.mood-sphere').forEach(b => b.classList.remove('selected'));
        
        // Add selection to clicked button
        this.classList.add('selected');
        
        // Get mood and handle
        const mood = this.getAttribute('data-mood');
        handleMoodSelection(mood);
    });
});

// ======================================
// GRATITUDE SYSTEM
// ======================================

/**
 * Display gratitude entries
 */
function displayGratitudeEntries() {
    const container = document.getElementById('gratitude-entries');
    container.innerHTML = '';
    
    // Show latest entries first
    const entries = [...appState.gratitudeEntries].reverse().slice(0, 5);
    
    entries.forEach((entry, index) => {
        const div = document.createElement('div');
        div.className = 'gratitude-entry';
        div.innerHTML = `
            <p>💚 ${entry.text}</p>
            <small>${new Date(entry.timestamp).toLocaleDateString('ar-EG')}</small>
        `;
        container.appendChild(div);
    });
}

/**
 * Handle gratitude submission
 */
document.getElementById('gratitude-submit').addEventListener('click', function() {
    const input = document.getElementById('gratitude-input');
    const text = input.value.trim();
    
    if (!text) {
        alert('الرجاء كتابة شيء تشكر عليه! 🙏');
        return;
    }
    
    // Add entry
    appState.gratitudeEntries.push({
        text: text,
        timestamp: new Date().toISOString()
    });
    saveState();
    
    // Clear input
    input.value = '';
    input.focus();
    
    // Create heart particles
    for (let i = 0; i < 8; i++) {
        const heart = document.createElement('div');
        heart.className = 'sparkle';
        heart.textContent = '💚';
        heart.style.left = (this.getBoundingClientRect().left + 50) + 'px';
        heart.style.top = (this.getBoundingClientRect().top) + 'px';
        document.getElementById('sparkle-container').appendChild(heart);
        
        setTimeout(() => heart.remove(), 1500);
    }
    
    // Show random quote
    const quoteBox = document.getElementById('quote-box');
    const quoteText = document.getElementById('quote-text');
    quoteBox.style.display = 'block';
    quoteText.textContent = '✨ ' + getRandomItem(dailyQuotes) + ' ✨';
    quoteBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    
    // Display entries
    displayGratitudeEntries();
    
    // Increase energy
    increaseEnergy(20);
    
    // Create floating petals
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingPetal(), i * 200);
    }
});

// Initialize gratitude entries on load
displayGratitudeEntries();

// ======================================
// GAMES SYSTEM
// ======================================

// Game 1: Catch Flowers
let flowerScore = 0;
let gameActive = false;
let flowers = [];

const canvas = document.getElementById('catch-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = Math.min(400, window.innerWidth - 40);
    canvas.height = 300;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Flower {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.width = 40;
        this.height = 40;
        this.speedY = Math.random() * 2 + 1;
    }
    
    draw() {
        ctx.font = '30px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('🌸', this.x, this.y);
    }
    
    update() {
        this.y += this.speedY;
    }
    
    isClicked(mouseX, mouseY) {
        return mouseX > this.x - 20 && mouseX < this.x + 20 &&
               mouseY > this.y - 20 && mouseY < this.y + 20;
    }
}

function drawGameScene() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update and draw flowers
    for (let i = flowers.length - 1; i >= 0; i--) {
        flowers[i].update();
        flowers[i].draw();
        
        if (flowers[i].y > canvas.height) {
            flowers.splice(i, 1);
        }
    }
    
    if (gameActive) {
        requestAnimationFrame(drawGameScene);
    }
}

function startFlowerGame() {
    gameActive = true;
    flowerScore = 0;
    flowers = [];
    document.getElementById('flower-score').textContent = '0';
    
    // Spawn flowers
    const spawnInterval = setInterval(() => {
        if (gameActive) {
            flowers.push(new Flower());
        } else {
            clearInterval(spawnInterval);
        }
    }, 300);
    
    // Stop after 20 seconds
    setTimeout(() => {
        gameActive = false;
        clearInterval(spawnInterval);
        alert(`🎉 انتهت اللعبة!\nحصلت على ${flowerScore} نقطة! 🌸`);
        increaseEnergy(flowerScore / 2);
    }, 20000);
    
    drawGameScene();
}

canvas.addEventListener('click', (e) => {
    if (!gameActive) return;
    
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    for (let i = flowers.length - 1; i >= 0; i--) {
        if (flowers[i].isClicked(mouseX, mouseY)) {
            flowers.splice(i, 1);
            flowerScore++;
            document.getElementById('flower-score').textContent = flowerScore;
            
            // Create sparkles
            createSparkle(e.clientX, e.clientY);
        }
    }
});

document.getElementById('catch-start').addEventListener('click', startFlowerGame);

// Game 2: Positive Word Generator
document.getElementById('word-generate').addEventListener('click', function() {
    const word = getRandomItem(positiveWords);
    const display = document.getElementById('word-display');
    
    // Play sound effect
    playSound('success');
    
    display.textContent = word;
    display.style.animation = 'none';
    
    setTimeout(() => {
        display.style.animation = 'wordAppear 0.6s ease-out';
    }, 10);
    
    // Create sparkles around word
    for (let i = 0; i < 12; i++) {
        const angle = (Math.PI * 2 * i) / 12;
        const x = window.innerWidth / 2 + Math.cos(angle) * 100;
        const y = window.innerHeight / 2 + Math.sin(angle) * 100;
        
        setTimeout(() => createSparkle(x, y), i * 50);
    }
    
    increaseEnergy(10);
});

// ======================================
// DAILY SPARK SECTION
// ======================================

/**
 * Initialize daily spark
 */
function initializeDailySpark() {
    const quote = getRandomItem(dailyQuotes);
    const affirmation = getRandomItem(dailyAffirmations);
    
    document.getElementById('daily-quote').textContent = '✨ ' + quote + ' ✨';
    document.getElementById('daily-affirmation').textContent = affirmation;
}

// ======================================
// HERO SECTION
// ======================================

document.getElementById('start-journey').addEventListener('click', function() {
    document.getElementById('mood-section').scrollIntoView({ behavior: 'smooth' });
});

// ======================================
// AUDIO CONTROL
// ======================================

const audioToggle = document.getElementById('audio-toggle');
const bgMusic = document.getElementById('bg-music');

audioToggle.addEventListener('click', function() {
    if (bgMusic.paused) {
        bgMusic.play().catch(() => console.log('Audio playback failed'));
        audioToggle.classList.add('playing');
    } else {
        bgMusic.pause();
        audioToggle.classList.remove('playing');
    }
});

// ======================================
// SOUND EFFECTS
// ======================================

/**
 * Play sound effect
 */
function playSound(type) {
    // Create a simple audio context for sound effects
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'success') {
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        } else if (type === 'click') {
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        console.log('Audio context not available');
    }
}

// ======================================
// INTERACTION EFFECTS
// ======================================

/**
 * Create petals periodically
 */
setInterval(() => {
    if (Math.random() > 0.7) {
        createFloatingPetal();
    }
}, 2000);

/**
 * Track clicks and create sparkles
 */
document.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' || e.target.closest('button')) {
        playSound('click');
    }
});

// ======================================
// INITIALIZATION
// ======================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize daily spark
    initializeDailySpark();
    
    // Set initial energy
    increaseEnergy(5);
    
    // Create initial petals
    createFloatingPetal();
    createFloatingPetal();
    createFloatingPetal();
    
    console.log('🌸 ومضات إيجابية - تم التحميل بنجاح! 🌸');
});

// ======================================
// KEYBOARD SHORTCUTS
// ======================================

document.addEventListener('keydown', (e) => {
    // Spacebar to generate word
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        document.getElementById('word-generate').click();
    }
});
