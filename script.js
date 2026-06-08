// ===== EXERCISE POOLS =====
const gridExercises=[
{base:0,hiddenCol:2},{base:10,hiddenCol:2},{base:20,hiddenCol:2},{base:30,hiddenCol:1},
{base:35,hiddenCol:2},{base:40,hiddenCol:3},{base:45,hiddenCol:1},{base:50,hiddenCol:2},
{base:55,hiddenCol:3},{base:5,hiddenCol:1},{base:15,hiddenCol:3},{base:25,hiddenCol:1},
{base:60,hiddenCol:2},{base:65,hiddenCol:1},{base:70,hiddenCol:3},{base:75,hiddenCol:2},
{base:7,hiddenCol:2},{base:33,hiddenCol:1}
];
const patternExercises=[
{start:4,step:2,hidden:3},{start:32,step:2,hidden:1},{start:2,step:2,hidden:2},{start:14,step:2,hidden:1},{start:50,step:2,hidden:3},
{start:6,step:3,hidden:3},{start:21,step:3,hidden:2},{start:3,step:3,hidden:1},{start:33,step:3,hidden:2},{start:12,step:3,hidden:3},
{start:8,step:4,hidden:2},{start:40,step:4,hidden:3},{start:4,step:4,hidden:1},{start:28,step:4,hidden:2},{start:60,step:4,hidden:3},
{start:15,step:5,hidden:3},{start:50,step:5,hidden:1},{start:5,step:5,hidden:2},{start:35,step:5,hidden:1},{start:70,step:5,hidden:3}
];
const riddleExercises=[
{q:'¿CUÁL ES EL NÚMERO MAYOR?',o:[32,45,28,39],a:45},
{q:'¿CUÁL ES EL NÚMERO MAYOR?',o:[52,49,61,58],a:61},
{q:'¿CUÁL ES EL NÚMERO MAYOR?',o:[71,63,55,48],a:71},
{q:'¿CUÁL ES EL NÚMERO MENOR?',o:[52,49,61,58],a:49},
{q:'¿CUÁL ES EL NÚMERO MENOR?',o:[37,54,46,62],a:37},
{q:'¿CUÁL ES EL NÚMERO MENOR?',o:[81,19,72,64],a:19},
{q:'¿QUÉ NÚMERO ESTÁ MÁS CERCA DE 50?',o:[48,61,72,35],a:48},
{q:'¿QUÉ NÚMERO ESTÁ MÁS CERCA DE 100?',o:[92,74,81,67],a:92},
{q:'¿QUÉ NÚMERO ESTÁ MÁS CERCA DE 20?',o:[18,35,42,57],a:18},
{q:'¿CUÁL ESTÁ MÁS LEJOS DE 50?',o:[48,52,15,47],a:15},
{q:'¿CUÁL ESTÁ MÁS LEJOS DE 30?',o:[28,32,55,27],a:55},
{q:'¿QUÉ NÚMERO ESTÁ ENTRE 40 Y 50?',o:[37,54,46,62],a:46},
{q:'¿QUÉ NÚMERO ESTÁ ENTRE 20 Y 30?',o:[18,25,32,38],a:25},
{q:'¿QUÉ NÚMERO TERMINA EN 7?',o:[42,37,51,69],a:37},
{q:'¿QUÉ NÚMERO TERMINA EN 3?',o:[43,54,61,78],a:43},
{q:'¿QUÉ NÚMERO COMIENZA CON 8?',o:[81,19,72,64],a:81},
{q:'¿QUÉ NÚMERO COMIENZA CON 5?',o:[15,51,53,59],a:51},
{q:'¿QUÉ NÚMERO ES PAR?',o:[23,35,48,57],a:48},
{q:'¿QUÉ NÚMERO ES IMPAR?',o:[40,62,75,88],a:75},
{q:'¿QUÉ NÚMERO ES PAR?',o:[31,44,57,63],a:44},
{q:'¿QUÉ NÚMERO ES IMPAR?',o:[52,68,79,84],a:79},
{q:'¿QUÉ NÚMERO VIENE DESPUÉS DE 58?',o:[57,59,60,61],a:59},
{q:'¿QUÉ NÚMERO VIENE ANTES DE 30?',o:[28,29,31,32],a:29},
{q:'¿QUÉ NÚMERO VIENE DESPUÉS DE 75?',o:[74,76,77,78],a:76},
{q:'¿QUÉ NÚMERO VIENE ANTES DE 50?',o:[48,49,51,52],a:49},
{q:'¿QUÉ NÚMERO FALTA? 25 · 26 · ? · 28 · 29',o:[24,27,30,31],a:27},
{q:'¿QUÉ NÚMERO FALTA? 10 · 12 · ? · 16 · 18',o:[13,14,15,17],a:14},
{q:'SOY MAYOR QUE 60 Y MENOR QUE 70. ¿QUIÉN SOY?',o:[45,67,72,59],a:67},
{q:'SOY MAYOR QUE 30 Y MENOR QUE 40. ¿QUIÉN SOY?',o:[28,35,42,39],a:35},
{q:'SOY MAYOR QUE 80 Y MENOR QUE 90. ¿QUIÉN SOY?',o:[75,85,92,79],a:85},
{q:'SOY UN NÚMERO QUE TERMINA EN 5 Y ES MAYOR QUE 40.',o:[25,35,45,38],a:45},
{q:'SOY UN NÚMERO PAR Y MENOR QUE 30.',o:[32,28,35,22],a:28}
];

const TOTAL_TIME=300,QUESTION_TIME=30,TOTAL_CHALLENGES=10;
let usedExercises=[],stars=0,errors=0,answered=false,currentExercise=null;
let totalTimeLeft=TOTAL_TIME,questionTimeLeft=QUESTION_TIME;
let totalTimerInterval=null,questionTimerInterval=null;
let currentChallenge=0,challenges=[],gameActive=false,advanceTimeout=null;
let challengeType=1;

function shuffle(arr){for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]]}return arr}

// ===== CHALLENGE 1 - Grid =====
function getGridAnswer(ex){return ex.base+10+ex.hiddenCol}
function getGridDistractors(ans,ex){
const c=[];const pool=[ex.base+ex.hiddenCol,ex.base+20+ex.hiddenCol];
for(const o of[-3,-2,2,3,5,-5])pool.push(ans+o);
for(const v of pool){if(v!==ans&&v>0&&!c.includes(v))c.push(v)}
shuffle(c);return c.slice(0,2)
}
function renderGrid(ex){
let h='<div id="grid">';
for(let r=0;r<3;r++)for(let c=0;c<5;c++){
if(r===1&&c===ex.hiddenCol)h+='<div class="cell hidden-cell" id="hidden-cell">?</div>';
else h+=`<div class="cell">${ex.base+r*10+c}</div>`
}
h+='</div>';return h
}

// ===== CHALLENGE 2 - Pattern =====
function getPatternAnswer(ex){return ex.start+ex.step*ex.hidden}
function getPatternDistractors(ans,ex){
const seq=Array.from({length:5},(_,i)=>ex.start+ex.step*i);
const visible=seq.filter((_,i)=>i!==ex.hidden);
const c=[];
[ans-1,ans+1,ans-ex.step,ans+ex.step,ans-2,ans+2].forEach(v=>{
if(v!==ans&&v>0&&!visible.includes(v)&&!c.includes(v))c.push(v)
});
if(c.length<2){for(let i=1;i<=5;i++){const v=ans+i;if(v!==ans&&!visible.includes(v)&&!c.includes(v))c.push(v)}}
for(let i=1;i<=5;i++){const v=ans-i;if(v!==ans&&!visible.includes(v)&&!c.includes(v))c.push(v)}
shuffle(c);return c.slice(0,2)
}
function renderSequence(ex){
const seq=Array.from({length:5},(_,i)=>ex.start+ex.step*i);
let h='';
if(challengeType===2)h+=`<div class="challenge-badge c2">🔍 PATRÓN OCULTO</div>`;
h+='<div id="sequence">';
seq.forEach((v,i)=>{
if(i>0)h+='<span class="seq-arrow">→</span>';
if(i===ex.hidden)h+=`<div class="seq-cell hidden" id="hidden-cell">?</div>`;
else h+=`<div class="seq-cell">${v}</div>`
});
h+='</div>';return h
}
function getPatternHint(ex,level){
if(level===1)return '💡 OBSERVA CUÁNTO AUMENTAN LOS NÚMEROS.';
if(level===2)return '💡 LA DIFERENCIA ENTRE LOS NÚMEROS SIEMPRE ES LA MISMA.';
return `💡 LOS NÚMEROS AVANZAN DE ${ex.step} EN ${ex.step}.`
}

// ===== GENERIC EXERCISE =====
function getExercisePool(){return challengeType===1?gridExercises:challengeType===2?patternExercises:riddleExercises}
function getAnswer(ex){return challengeType===3?ex.a:challengeType===1?getGridAnswer(ex):getPatternAnswer(ex)}
function getDistractors(ans,ex){return challengeType===1?getGridDistractors(ans,ex):challengeType===2?getPatternDistractors(ans,ex):[]}
function renderChallenge(ex){
const area=document.getElementById('challenge-area');
if(challengeType===3){
area.innerHTML='<div class="challenge-badge c3">🎯 RETO DEL DETECTIVE</div>';
document.getElementById('question').textContent=ex.q
}else{
area.innerHTML=challengeType===1?renderGrid(ex):renderSequence(ex);
document.getElementById('question').textContent='¿QUÉ NÚMERO FALTA?'
}
}
function getCustomHint(ex,level){
if(challengeType===1)return null;
if(challengeType===2)return getPatternHint(ex,level);
if(level===1)return '💡 LEE ATENTAMENTE LA PREGUNTA.';
if(level===2)return '💡 ANALIZA CADA OPCIÓN UNA POR UNA.';
return '💡 DESCARTA LAS OPCIONES QUE NO CUMPLEN LA CONDICIÓN.'
}
function getCorrectMessage(){return '🎉 ¡MUY BIEN!'}

// ===== TIMERS & GAME LOOP =====
function startGame(type){
challengeType=type;
const shuffled=shuffle([...getExercisePool()]);
challenges=shuffled.slice(0,TOTAL_CHALLENGES);
currentChallenge=0;stars=0;gameActive=true;totalTimeLeft=TOTAL_TIME;
document.getElementById('star-count').textContent='0';
document.getElementById('game-card-content').style.display='block';
document.getElementById('end-screen').classList.add('hidden');
document.getElementById('game-screen').setAttribute('data-challenge',type);
document.getElementById('game-badge').textContent=type===1?'DESAFÍO DE LA GRILLA NUMÉRICA':type===2?'DESCUBRE EL PATRÓN':'DESCUBRE EL NÚMERO QUE FALTA';
try{SoundFX.play('start')}catch(e){};
totalTimerInterval=setInterval(updateTimers,1000);
loadChallenge()
}
function loadChallenge(){
errors=0;answered=false;questionTimeLeft=QUESTION_TIME;
if(advanceTimeout){clearTimeout(advanceTimeout);advanceTimeout=null}
document.getElementById('hint').textContent='';
document.getElementById('result').textContent='';
document.getElementById('result').className='';
updateProgress();
const ex=challenges[currentChallenge];currentExercise=ex;
renderChallenge(ex);
renderOptions(getAnswer(ex),ex);
if(questionTimerInterval)clearInterval(questionTimerInterval);
questionTimerInterval=setInterval(updateQuestionTimer,1000);
updateQuestionTimerDisplay()
}
function updateTimers(){totalTimeLeft--;if(totalTimeLeft<=0)endGame('time')}
function updateProgress(){
const done=currentChallenge;
document.getElementById('progress-bar').style.width=(done/TOTAL_CHALLENGES*100)+'%';
document.getElementById('challenge-progress').textContent=`${done}/${TOTAL_CHALLENGES}`
}
function updateQuestionTimer(){
questionTimeLeft--;updateQuestionTimerDisplay();
if(questionTimeLeft<=0)handleTimeout()
}
function updateQuestionTimerDisplay(){
const el=document.getElementById('q-timer-text');
el.textContent=`⏱ ${questionTimeLeft}s`;
if(questionTimeLeft<=10){el.style.color='#ef4444';el.classList.add('urgent')}
else{el.style.color='';el.classList.remove('urgent')}
}
function handleTimeout(){
if(answered||!gameActive)return;
answered=true;
try{SoundFX.play('timeout')}catch(e){}
clearInterval(questionTimerInterval);
document.querySelectorAll('.option-btn').forEach(b=>b.disabled=true);
const ex=challenges[currentChallenge];const answer=getAnswer(ex);
const h=document.getElementById('hidden-cell');
if(h){h.textContent=answer;h.classList.remove('hidden');h.classList.add('revealed')}
document.getElementById('result').textContent='⏰ SE ACABÓ EL TIEMPO.';
document.getElementById('result').className='error';
document.querySelectorAll('.option-btn').forEach(b=>{if(Number(b.dataset.value)===answer)b.classList.add('correct')});
if(currentChallenge>=TOTAL_CHALLENGES-1)endGame('time');
else advanceTimeout=setTimeout(()=>advanceChallenge(),2000)
}
function handleAnswer(selected,correct){
if(answered||!gameActive)return;
const btns=document.querySelectorAll('.option-btn');
if(selected===correct){
answered=true;clearInterval(questionTimerInterval);
btns.forEach(b=>{b.disabled=true;if(Number(b.dataset.value)===correct)b.classList.add('correct')});
const h=document.getElementById('hidden-cell');
if(h){h.textContent=correct;h.classList.remove('hidden');h.classList.add('revealed')}
document.getElementById('result').textContent='🎉 ¡MUY BIEN!';
document.getElementById('result').className='success';
stars++;document.getElementById('star-count').textContent=stars;
try{SoundFX.play('correct');spawnStars();spawnConfetti()}catch(e){}
if(currentChallenge>=TOTAL_CHALLENGES-1)endGame('complete');
else advanceChallenge()
}else{
errors++;
try{SoundFX.play('wrong')}catch(e){}
document.getElementById('result').textContent='❌ INTÉNTALO DE NUEVO.';
document.getElementById('result').className='error';
btns.forEach(b=>{if(Number(b.dataset.value)===selected){b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),600)}});
const custom=getCustomHint(currentExercise,errors);
if(custom)document.getElementById('hint').textContent=custom;
else if(errors===1)document.getElementById('hint').textContent='💡 OBSERVA EL NÚMERO ANTERIOR Y EL SIGUIENTE.';
else if(errors>=2){const a=getAnswer(currentExercise);document.getElementById('hint').textContent=`💡 ENTRE EL ${a-1} Y EL ${a+1} SOLO HAY UN NÚMERO.`}
}
}
function advanceChallenge(){currentChallenge++;if(currentChallenge>=TOTAL_CHALLENGES)endGame('complete');else loadChallenge()}
function renderOptions(ans,ex){
const ct=document.getElementById('options');ct.innerHTML='';
const opts=challengeType===3?ex.o:shuffle([ans,...getDistractors(ans,ex)]);
for(const opt of opts){
const b=document.createElement('button');
b.className='option-btn';b.textContent=opt;b.dataset.value=opt;
b.addEventListener('click',()=>handleAnswer(Number(opt),ans));
ct.appendChild(b)
}
}

// ===== END SCREEN =====
function endGame(reason){
gameActive=false;clearInterval(totalTimerInterval);clearInterval(questionTimerInterval);
if(advanceTimeout){clearTimeout(advanceTimeout);advanceTimeout=null}
document.getElementById('game-card-content').style.display='none';
document.getElementById('end-screen').classList.remove('hidden');
const medals=['😞','🥉','🥉','🥉','🥉','🥈','🥈','🥈','🥇','🥇','🏆'];
document.getElementById('end-medal').textContent=medals[stars]||'🎖️';
if(reason==='complete'){
document.getElementById('end-icon').textContent='🎉';
document.getElementById('end-title').textContent='¡JUEGO COMPLETADO!';
document.getElementById('end-sub').textContent='¡Completaste todos los desafíos!';try{SoundFX.play('complete')}catch(e){}
}else{
document.getElementById('end-icon').textContent='⏰';
document.getElementById('end-title').textContent='¡TIEMPO AGOTADO!';
document.getElementById('end-sub').textContent=`Completaste ${currentChallenge} de 10 desafíos`;try{SoundFX.play('timeout')}catch(e){}
}
document.getElementById('end-stat').textContent=`⭐ ${stars} / 10 respuestas correctas`;
if(reason==='complete'){document.getElementById('progress-bar').style.width='100%';document.getElementById('challenge-progress').textContent='10/10'}
const container=document.getElementById('end-stars-container');container.innerHTML='';
for(let i=0;i<10;i++){const s=document.createElement('span');s.className='end-star'+(i<stars?' show':' empty');s.textContent='⭐';s.style.animationDelay=(i*0.12)+'s';container.appendChild(s)}
setTimeout(()=>{document.querySelectorAll('.end-star.show').forEach((el,i)=>{setTimeout(()=>{el.style.opacity='1';el.style.transform='scale(1)'},i*120)})},100);
spawnConfetti()
}

// ===== EFFECTS =====
function spawnStars(){
const r=document.querySelector('.game-card').getBoundingClientRect();
const cx=r.left+r.width/2,cy=r.top+r.height/2;
for(let i=0;i<6;i++){
const e=document.createElement('div');e.className='star-particle';e.textContent='⭐';
e.style.left=(cx-20+Math.random()*40)+'px';e.style.top=(cy-20+Math.random()*40)+'px';
e.style.animationDelay=(i*0.08)+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),1500)
}
}
function spawnConfetti(){
const colors=['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#10b981','#f59e0b','#a78bfa'];
for(let i=0;i<48;i++){
const e=document.createElement('div');e.className='confetti-piece';
const s=5+Math.random()*10;
e.style.width=s+'px';e.style.height=s+'px';
e.style.background=colors[Math.floor(Math.random()*colors.length)];
e.style.left=(10+Math.random()*80)+'%';e.style.top='-20px';
e.style.borderRadius=Math.random()>.5?'50%':'2px';
e.style.animationDuration=(1.2+Math.random()*1.2)+'s';
e.style.animationDelay=(Math.random()*0.6)+'s';
document.body.appendChild(e);setTimeout(()=>e.remove(),2500)
}
}

// ===== SOUND FX =====
const SoundFX={
ctx:null,
getCtx(){return this.ctx||(this.ctx=new(window.AudioContext||window.webkitAudioContext)())},
_correct(){const c=this.getCtx(),t=c.currentTime;[523,659,784].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';g.gain.setValueAtTime(0.25,t+i*0.1);g.gain.exponentialRampToValueAtTime(0.01,t+i*0.1+0.35);o.frequency.setValueAtTime(f,t+i*0.1);o.start(t+i*0.1);o.stop(t+i*0.1+0.35)})},
_wrong(){const c=this.getCtx(),t=c.currentTime;const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='square';g.gain.setValueAtTime(0.15,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.3);o.frequency.setValueAtTime(180,t);o.frequency.linearRampToValueAtTime(120,t+0.25);o.start(t);o.stop(t+0.3)},
_timeout(){const c=this.getCtx(),t=c.currentTime;[0,0.12,0.24].forEach(d=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sawtooth';g.gain.setValueAtTime(0.12,t+d);g.gain.exponentialRampToValueAtTime(0.01,t+d+0.1);o.frequency.setValueAtTime(380,t+d);o.frequency.linearRampToValueAtTime(280,t+d+0.08);o.start(t+d);o.stop(t+d+0.1)})},
_complete(){const c=this.getCtx(),t=c.currentTime;[523,659,784,1047].forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';g.gain.setValueAtTime(0.3,t+i*0.12);g.gain.exponentialRampToValueAtTime(0.01,t+i*0.12+0.4);o.frequency.setValueAtTime(f,t+i*0.12);o.start(t+i*0.12);o.stop(t+i*0.12+0.4)})},
_start(){const c=this.getCtx(),t=c.currentTime;const o=c.createOscillator(),g=c.createGain();o.connect(g);g.connect(c.destination);o.type='sine';g.gain.setValueAtTime(0.2,t);g.gain.exponentialRampToValueAtTime(0.01,t+0.35);o.frequency.setValueAtTime(440,t);o.frequency.setValueAtTime(660,t+0.15);o.start(t);o.stop(t+0.35)},
play(e){if(this['_'+e])this['_'+e]()}
};

// ===== SCREENS =====
const menuScreen=document.getElementById('menu-screen');
const gameScreen=document.getElementById('game-screen');

function showMenu(){
gameActive=false;clearInterval(totalTimerInterval);clearInterval(questionTimerInterval);
if(advanceTimeout){clearTimeout(advanceTimeout);advanceTimeout=null}
gameScreen.classList.remove('visible');gameScreen.style.display='none';
document.getElementById('game-card-content').style.display='block';
document.getElementById('end-screen').classList.add('hidden');
menuScreen.classList.remove('hidden');menuScreen.style.display='flex'
}
function showGame(type){
menuScreen.classList.add('hidden');
setTimeout(()=>{menuScreen.style.display='none';gameScreen.style.display='flex';gameScreen.classList.add('visible');startGame(type)},400)
}

document.querySelectorAll('.challenge-btn.active[data-challenge]').forEach(b=>{
b.addEventListener('click',()=>showGame(Number(b.dataset.challenge)))
});
document.querySelectorAll('.challenge-btn.locked').forEach(b=>
b.addEventListener('click',()=>{b.style.transform='scale(0.97)';setTimeout(()=>b.style.transform='',200)})
);
document.getElementById('back-to-menu').addEventListener('click',showMenu);
document.getElementById('end-back-btn').addEventListener('click',showMenu);
document.getElementById('end-replay-btn').addEventListener('click',()=>showGame(challengeType));