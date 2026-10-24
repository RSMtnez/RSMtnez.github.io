const journey=document.querySelector('.journey');
const scene=document.querySelector('.sticky-scene');
const floor=document.querySelector('#floor-number');
const clamp=(x,a=0,b=1)=>Math.min(b,Math.max(a,x));
const range=(x,a,b)=>clamp((x-a)/(b-a));
let queued=false;
function update(){queued=false;const rect=journey.getBoundingClientRect();const distance=Math.max(1,journey.offsetHeight-window.innerHeight);const t=clamp(-rect.top/distance);const style=scene.style;
// Opening skyline -> elevator shaft -> doors opening -> command center
const city=range(t,0,.29);
const elevator=range(t,.17,.34)*(1-range(t,.66,.79));
const lab=range(t,.59,.75);
style.setProperty('--progress',city.toFixed(4));
style.setProperty('--elevator-opacity',elevator.toFixed(4));
style.setProperty('--lab-opacity',lab.toFixed(4));
style.setProperty('--shaft-shift',`${Math.round(t*2600)}px`);
style.setProperty('--door-open',range(t,.48,.67).toFixed(4));
floor.textContent=t>.71?'B1':String(Math.max(1,Math.round(40-t*55))).padStart(2,'0');}
function onScroll(){if(!queued){queued=true;requestAnimationFrame(update)}}
window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);update();
document.querySelector('#year').textContent=new Date().getFullYear();
if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){document.querySelector('.journey').style.height='160vh';}
