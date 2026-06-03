const exercisePool=[
{base:20,hiddenCol:2},
{base:35,hiddenCol:2},
{base:60,hiddenCol:1},
{base:1,hiddenCol:3},
{base:40,hiddenCol:1},
{base:50,hiddenCol:3},
{base:70,hiddenCol:2},
{base:80,hiddenCol:2},
{base:5,hiddenCol:1},
{base:25,hiddenCol:3},
{base:55,hiddenCol:1},
{base:65,hiddenCol:2},
{base:75,hiddenCol:3},
{base:90,hiddenCol:2},
{base:15,hiddenCol:1},
{base:30,hiddenCol:2},
{base:45,hiddenCol:3},
{base:85,hiddenCol:1}
];
let usedExercises=[];
let stars=0;
let errors=0;
let answered=false;
let currentExercise=null;

function shuffle(arr){
for(let i=arr.length-1;i>0;i--){
const j=Math.floor(Math.random()*(i+1));
[arr[i],arr[j]]=[arr[j],arr[i]]
}
return arr
}
function getNextExercise(){
let available=exercisePool.filter(e=>!usedExercises.includes(e));
if(available.length===0){usedExercises=[];available=[...exercisePool]}
const ex=available[Math.floor(Math.random()*available.length)];
usedExercises.push(ex);
return ex
}
function getAnswer(ex){return ex.base+10+ex.hiddenCol}
function generateDistractors(answer,ex){
const candidates=[];
const above=ex.base+ex.hiddenCol;
const below=ex.base+20+ex.hiddenCol;
const nearOffsets=[-3,-2,2,3,5,-5];
const pool=[above,below];
for(const off of nearOffsets)pool.push(answer+off);
for(const v of pool){if(v!==answer&&v>0&&!candidates.includes(v))candidates.push(v)}
shuffle(candidates);
return candidates.slice(0,2)
}
function renderGrid(ex){
const grid=document.getElementById('grid');
grid.innerHTML='';
for(let r=0;r<3;r++){
for(let c=0;c<5;c++){
const div=document.createElement('div');
div.className='cell';
if(r===1&&c===ex.hiddenCol){div.classList.add('hidden-cell');div.textContent='?';div.id='hidden-cell'}
else div.textContent=ex.base+r*10+c;
grid.appendChild(div)
}
}
}
function renderOptions(answer,ex){
const container=document.getElementById('options');
container.innerHTML='';
const distractors=generateDistractors(answer,ex);
const options=shuffle([answer,...distractors]);
for(const opt of options){
const btn=document.createElement('button');
btn.className='option-btn';
btn.textContent=opt;
btn.dataset.value=opt;
btn.addEventListener('click',()=>handleAnswer(Number(opt),answer));
container.appendChild(btn)
}
}
function handleAnswer(selected,correct){
if(answered)return;
const btns=document.querySelectorAll('.option-btn');
if(selected===correct){
answered=true;
btns.forEach(b=>b.disabled=true);
btns.forEach(b=>{if(Number(b.dataset.value)===correct)b.classList.add('correct')});
const hiddenCell=document.getElementById('hidden-cell');
hiddenCell.textContent=correct;
hiddenCell.classList.remove('hidden-cell');
hiddenCell.classList.add('revealed');
document.getElementById('result').textContent='🎉 ¡MUY BIEN, DETECTIVE!';
document.getElementById('result').className='success';
stars++;
document.getElementById('star-count').textContent=stars;
spawnStars();
spawnConfetti();
document.getElementById('next-btn').style.display='inline-block'
}else{
errors++;
document.getElementById('result').textContent='❌ INTÉNTALO OTRA VEZ.';
document.getElementById('result').className='error';
btns.forEach(b=>{if(Number(b.dataset.value)===selected){b.classList.add('wrong');setTimeout(()=>b.classList.remove('wrong'),600)}});
showHint()
}
}
function showHint(){
const hintDiv=document.getElementById('hint');
if(errors===1)hintDiv.textContent='💡 OBSERVA EL NÚMERO ANTERIOR Y EL SIGUIENTE.';
else if(errors>=2){
const ans=getAnswer(currentExercise);
hintDiv.textContent=`💡 ENTRE EL ${ans-1} Y EL ${ans+1} SOLO HAY UN NÚMERO.`
}
}
function resetUI(){
errors=0;answered=false;
document.getElementById('hint').textContent='';
document.getElementById('result').textContent='';
document.getElementById('result').className='';
document.getElementById('next-btn').style.display='none'
}
function loadExercise(){
resetUI();
currentExercise=getNextExercise();
renderGrid(currentExercise);
renderOptions(getAnswer(currentExercise),currentExercise)
}
function spawnStars(){
const card=document.querySelector('.game-card');
const rect=card.getBoundingClientRect();
const cx=rect.left+rect.width/2;
const cy=rect.top+rect.height/2;
for(let i=0;i<6;i++){
const el=document.createElement('div');
el.className='star-particle';
el.textContent='⭐';
el.style.left=(cx-20+Math.random()*40)+'px';
el.style.top=(cy-20+Math.random()*40)+'px';
el.style.animationDelay=(i*0.08)+'s';
document.body.appendChild(el);
setTimeout(()=>el.remove(),1500)
}
}
function spawnConfetti(){
const colors=['#ff6b6b','#feca57','#48dbfb','#ff9ff3','#54a0ff','#10b981','#f59e0b','#a78bfa'];
for(let i=0;i<48;i++){
const el=document.createElement('div');
el.className='confetti-piece';
const size=5+Math.random()*10;
el.style.width=size+'px';
el.style.height=size+'px';
el.style.background=colors[Math.floor(Math.random()*colors.length)];
el.style.left=(10+Math.random()*80)+'%';
el.style.top='-20px';
el.style.borderRadius=Math.random()>.5?'50%':'2px';
el.style.animationDuration=(1.2+Math.random()*1.2)+'s';
el.style.animationDelay=(Math.random()*0.6)+'s';
document.body.appendChild(el);
setTimeout(()=>el.remove(),2500)
}
}
document.getElementById('next-btn').addEventListener('click',loadExercise);
loadExercise();
