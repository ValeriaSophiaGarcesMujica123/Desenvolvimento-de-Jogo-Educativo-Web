
/* =====================================================
JOGO DA MEMÓRIA
ARTES VISUAIS
6º ANO
Cada "par" = 1 CARD conceito (texto) + 1 CARD imagem (SVG)
===================================================== */
// --------
-BANCO DE DADOS DAS CARTAS ----------
// Cada item = um par (id). Um lado tem SVG, outro tem texto-conceito.
const CARD_PAIRS = [
{
id: 'cor_primaria',
label: 'Cores Primárias',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<defs>
<radialGradient id="cp1" cx="30%" cy="30%"><stop offset="0" stop-color="#ff6b6b"/><stop offset="1" stop-color="#c62828"/></radialGradient>
<radialGradient id="cp2" cx="30%" cy="30%"><stop offset="0" stop-color="#ffe066"/><stop offset="1" stop-color="#f9a825"/></radialGradient>
<radialGradient id="cp3" cx="30%" cy="30%"><stop offset="0" stop-color="#64b5f6"/><stop offset="1" stop-color="#1565c0"/></radialGradient>
</defs>
<circle cx="35" cy="45" r="22" fill="url(#cp1)" opacity="0.92"/>
<circle cx="65" cy="45" r="22" fill="url(#cp2)" opacity="0.92"/>
<circle cx="50" cy="70" r="22" fill="url(#cp3)" opacity="0.92"/>
</svg>`
},
{
id: 'cor_secundaria',
label: 'Cores Secundárias',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<defs>
<radialGradient id="cs1" cx="30%" cy="30%"><stop offset="0" stop-color="#ba68c8"/><stop offset="1" stop-color="#6a1b9a"/></radialGradient>
<radialGradient id="cs2" cx="30%" cy="30%"><stop offset="0" stop-color="#81c784"/><stop offset="1" stop-color="#2e7d32"/></radialGradient>
<radialGradient id="cs3" cx="30%" cy="30%"><stop offset="0" stop-color="#ffb74d"/><stop offset="1" stop-color="#e65100"/></radialGradient>
</defs>
<circle cx="35" cy="45" r="22" fill="url(#cs1)" opacity="0.92"/>
<circle cx="65" cy="45" r="22" fill="url(#cs2)" opacity="0.92"/>
<circle cx="50" cy="70" r="22" fill="url(#cs3)" opacity="0.92"/>
</svg>`
},
{
id: 'pintura_abstrata',
label: 'Arte Abstrata',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<defs>
<linearGradient id="ab1" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="#ff6fb5"/><stop offset="1" stop-color="#a66dd4"/>
</linearGradient>
</defs>
<rect width="100" height="100" fill="#fff8e7"/>
<path d="M10 70 Q 30 20 50 50 T 90 30" stroke="url(#ab1)" stroke-width="9" fill="none" stroke-linecap="round"/>
<circle cx="30" cy="30" r="10" fill="#ffd93d"/>
<circle cx="70" cy="70" r="12" fill="#4da6ff" opacity="0.9"/>
<rect x="55" y="15" width="20" height="20" fill="#6bcb77" opacity="0.85" transform="rotate(20 65 25)"/>
</svg>`
},
{
id: 'pintura_figurativa',
label: 'Arte Figurativa',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<rect width="100" height="100" fill="#e6f4ff"/>
<circle cx="70" cy="25" r="12" fill="#ffd93d"/>
<path d="M0 70 Q 25 55 50 70 T 100 70 L 100 100 L 0 100 Z" fill="#6bcb77"/>
<path d="M20 70 L 40 40 L 55 55 L 70 35 L 85 70 Z" fill="#a66dd4"/>
<circle cx="30" cy="20" r="4" fill="#4da6ff"/>
<circle cx="45" cy="15" r="3" fill="#4da6ff"/>
</svg>`
},
{
id: 'ponto_linha_forma',
label: 'Ponto, Linha e Forma',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<rect width="100" height="100" fill="#fff"/>
<circle cx="20" cy="20" r="5" fill="#ff5757"/>
<circle cx="20" cy="50" r="5" fill="#ff5757"/>
<circle cx="20" cy="80" r="5" fill="#ff5757"/>
<line x1="40" y1="20" x2="90" y2="20" stroke="#4da6ff" stroke-width="4"/>
<line x1="40" y1="50" x2="90" y2="50" stroke="#4da6ff" stroke-width="4"/>
<line x1="40" y1="80" x2="90" y2="80" stroke="#4da6ff" stroke-width="4"/>
<rect x="55" y="10" width="15" height="20" fill="#6bcb77" opacity="0.7"/>
</svg>`
},
{
id: 'textura',
label: 'Textura',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<rect width="100" height="100" fill="#ff9f45"/>
<g fill="#c62828" opacity="0.55">
<circle cx="15" cy="15" r="3"/><circle cx="30" cy="25" r="3"/>
<circle cx="50" cy="15" r="3"/><circle cx="70" cy="25" r="3"/>
<circle cx="85" cy="15" r="3"/><circle cx="20" cy="45" r="3"/>
<circle cx="45" cy="40" r="3"/><circle cx="75" cy="45" r="3"/>
<circle cx="15" cy="75" r="3"/><circle cx="40" cy="80" r="3"/>
<circle cx="65" cy="70" r="3"/><circle cx="85" cy="80" r="3"/>
</g>
<path d="M0 60 Q 25 40 50 60 T 100 60" stroke="#fff" stroke-width="3" fill="none" opacity="0.6"/>
</svg>`
},
{
id: 'escultura',
label: 'Escultura',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<defs>
<linearGradient id="esc" x1="0" y1="0" x2="0" y2="1">
<stop offset="0" stop-color="#d7ccc8"/><stop offset="1" stop-color="#8d6e63"/>
</linearGradient>
</defs>
<rect x="30" y="80" width="40" height="10" fill="#5d4037"/>
<rect x="42" y="30" width="16" height="55" rx="8" fill="url(#esc)"/>
<ellipse cx="50" cy="25" rx="14" ry="16" fill="url(#esc)"/>
</svg>`
},
{
id: 'gravura',
label: 'Gravura',
svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"&gt;
<rect width="100" height="100" fill="#2b2233"/>
<g stroke="#fff8e7" stroke-width="2" fill="none">
<path d="M20 80 Q 30 40 50 50 T 80 30"/>
<path d="M20 70 Q 35 30 55 45 T 80 20"/>
</g>
<circle cx="50" cy="50" r="25" stroke="#ff9f45" stroke-width="2" fill="none"/>
</svg>`
}
];
// --------
-CONFIGURAÇÃO DO JOGO ----------
const TOTAL_PAIRS = 6; // 6 pares = 12 cartas
const MAX_LIVES = 3;
// --------
-ESTADO ----------
let state = {
deck: [],
flipped: [],
matched: 0,
moves: 0,
score: 0,
lives: MAX_LIVES,
timer: 0,
timerId: null,
lock: false,
started: false
};
// --------
-REFERÊNCIAS DOM ----------
const $ = (sel) => document.querySelector(sel);
const startScreen = $('#start-screen');
const gameScreen = $('#game-screen');
const endScreen = $('#end-screen');
const board = $('#board');
const timerEl = $('#timer');
const movesEl = $('#moves');
const scoreEl = $('#score');
const livesEl = $('#lives');
const endTitle = $('#end-title');
const endMessage = $('#end-message');
const finalScore = $('#final-score');
const finalTime = $('#final-time');
const finalMoves = $('#final-moves');
// --------
-UTILITÁRIOS ----------
function shuffle(arr){
const a = [...arr];
for(let i=a.length-1; i>0; i--){
const j = Math.floor(Math.random()*(i+1));
[a[i],a[j]] = [a[j],a[i]];
}
return a;
}
function formatTime(s){
const m = String(Math.floor(s/60)).padStart(2,'0');
const sec = String(s % 60).padStart(2,'0');
return `${m}:${sec}`;
}

// Cria o "baralho": para cada par, gera 2 cartas (imagem + conceito)
function buildDeck(){
const pairsPool = shuffle(CARD_PAIRS).slice(0, TOTAL_PAIRS);
const deck = [];
pairsPool.forEach((pair, i) => {
deck.push({ pairId: pair.id, type: 'image', label: pair.label, svg: pair.svg, uid: `${pair.id}-img` });
deck.push({ pairId: pair.id, type: 'text', label: pair.label, svg: pair.svg, uid: `${pair.id}-txt` });
});
return shuffle(deck);
}

// --------
-RENDERIZAÇÃO DAS CARTAS ----------
function renderCard(card){
const el = document.createElement('div');
el.className = 'card';
el.dataset.pair = card.pairId;
el.dataset.uid = card.uid;
el.setAttribute('role','gridcell');
el.setAttribute('tabindex','0');
const frontContent = card.type === 'image'
? card.svg
: `<div class="label">${card.label}</div>`;

el.innerHTML = `
<div class="card-inner">
<div class="card-face card-back"></div>
<div class="card-face card-front">${frontContent}</div>
</div>
`;

el.addEventListener('click', () => flipCard(el));
el.addEventListener('keydown', (e) => {
if(e.key === 'Enter' || e.key === ' '){ e.preventDefault(); flipCard(el); }
});
return el;
}

function renderBoard(){
board.innerHTML = '';
state.deck.forEach(card => board.appendChild(renderCard(card)));
}

// --------
-LÓGICA DE VIRADA ----------
function flipCard(el){
if(state.lock) return;
if(el.classList.contains('flipped') || el.classList.contains('matched')) return;
if(!state.started) return;
el.classList.add('flipped');
state.flipped.push(el);

if(state.flipped.length === 2){
state.moves++;
movesEl.textContent = state.moves;
checkMatch();
}
}

function checkMatch(){
const [a, b] = state.flipped;
const samePair = a.dataset.pair === b.dataset.pair;

if(samePair){
// Par correto
a.classList.add('matched');
b.classList.add('matched');
state.flipped = [];
state.matched++;
// Bônus por tempo: quanto mais rápido, mais pontos
const bonus = Math.max(10, 60
state.timer);
state.score += 50 + bonus;
scoreEl.textContent = state.score;
if(state.matched === TOTAL_PAIRS){
endGame(true);
}
} else {
// Errou — trava temporariamente e perde vida
state.lock = true;
a.classList.add('wrong');
b.classList.add('wrong');
state.lives--;
livesEl.textContent = state.lives;

setTimeout(() => {
a.classList.remove('flipped','wrong');
b.classList.remove('flipped','wrong');
state.flipped = [];
state.lock = false;

if(state.lives <= 0){
endGame(false);
}
}, 900);
}
}

// --------
-TIMER ----------
function startTimer(){
clearInterval(state.timerId);
state.timer = 0;
timerEl.textContent = '00:00';
state.timerId = setInterval(() => {
state.timer++;
timerEl.textContent = formatTime(state.timer);
}, 1000);
}
// --------
-INÍCIO DO JOGO ----------
function startGame(){
// Reset de estado
state = {
deck: buildDeck(),
flipped: [],
matched: 0,
moves: 0,
score: 0,
lives: MAX_LIVES,
timer: 0,
timerId: null,
lock: false,
started: true
};
movesEl.textContent = '0';
scoreEl.textContent = '0';
livesEl.textContent = MAX_LIVES;
timerEl.textContent = '00:00';

renderBoard();
showScreen('game');
startTimer();
}

// --------
-FINALIZAÇÃO ----------
function endGame(win){
clearInterval(state.timerId);
state.started = false;
finalScore.textContent = state.score;
finalTime.textContent = formatTime(state.timer);
finalMoves.textContent = state.moves;

if(win){
endTitle.textContent = '🎉 Parabéns, grande artista!';
endMessage.textContent = 'Você encontrou todos os pares e dominou os conceitos de Arte!';
} else {
endTitle.textContent = '💔 Fim de Jogo!';
endMessage.textContent = 'Você perdeu todas as vidas. Tente novamente — você consegue!';
}

setTimeout(() => showScreen('end'), 500);
}

// --------
-NAVEGAÇÃO DE TELAS ----------
function showScreen(name){
[startScreen, gameScreen, endScreen].forEach(s => s.classList.remove('active'));
if(name === 'start') startScreen.classList.add('active');
if(name === 'game') gameScreen.classList.add('active');
if(name === 'end') endScreen.classList.add('active');
}
// --------
-EVENTOS ----------
$('#btn-start').addEventListener('click', startGame);
$('#btn-restart').addEventListener('click', () => {
showScreen('start');
});
// Inicializa na tela inicial
showScreen('start');
