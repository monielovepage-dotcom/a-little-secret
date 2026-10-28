(()=>{
const C=CONFIG,$=(s,r=document)=>r.querySelector(s);
const R=matchMedia('(prefers-reduced-motion:reduce)').matches;
const wait=ms=>new Promise(r=>setTimeout(r,ms));
Object.entries(C.colors).forEach(([k,v])=>document.documentElement.style.setProperty('--'+k,v));
let busy=false,cur=null,selected=null,opened=false,scanning=false,scanned=false;

const d=(id,s,pos,r,c,i)=>`<svg class="deco ${i<4?'sway':i<7?'twinkle':''}" viewBox="0 0 100 100" style="width:${s}px;height:${s}px;${pos};--r:${r}deg;color:${c}"><use href="#${id}"/></svg>`;
const decor=()=>[['flower',92,'left:-20px;top:3%',-15,'#FFB3D1'],['flower',70,'right:-14px;top:24%',20,'#C9B7F5'],['flower',110,'left:-34px;bottom:11%',10,'#62C5E8'],['flower',80,'right:-18px;bottom:6%',-25,'#FFB3D1'],['star',22,'left:18%;top:12%',0,'#fff'],['star',16,'right:20%;top:8%',0,'#fff'],['star',18,'right:12%;top:46%',0,'#fff'],['paw',26,'left:12%;bottom:24%',-20,'#ffffffaa'],['paw',22,'right:16%;bottom:30%',25,'#ffffffaa']].map((a,i)=>d(...a,i)).join('');
const bg=()=>`<div class="bg"><i class="glow g1"></i><i class="glow g2"></i><i class="cloud c1"></i><i class="cloud c2"></i>${decor()}<svg class="wave" viewBox="0 0 400 60" preserveAspectRatio="none"><path d="M0 30Q50 0 100 30T200 30T300 30T400 30V60H0Z" fill="#fff" opacity=".4"/></svg></div>`;
const fp=`<svg viewBox="0 0 100 100"><g fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><circle cx="50" cy="56" r="8" stroke-dasharray="36 14" rotate="20"/><circle cx="50" cy="56" r="17" stroke-dasharray="70 22" transform="rotate(200 50 56)"/><circle cx="50" cy="56" r="26" stroke-dasharray="110 24" transform="rotate(-40 50 56)"/><circle cx="50" cy="56" r="35" stroke-dasharray="150 30" transform="rotate(130 50 56)"/><path d="M50 56v14"/></g></svg>`;

$('#app').innerHTML=`
<section class="scene" id="s1">${bg()}<div class="wrap">
 <h1 id="h1">${C.p1.heading}</h1>
 <div class="cslot" data-slot="p1"></div>
 <div class="env" id="env"><div class="paper">💗</div><div class="front"></div><div class="flap"></div></div>
 <button class="btn" id="open">${C.p1.openBtn}</button>
 <div class="letter hide" id="letter">${C.p1.paragraphs.map((t,i)=>`<p style="animation-delay:${i*.35+.2}s">${t}</p>`).join('')}<button class="btn" id="next1">${C.p1.nextBtn}</button></div>
</div></section>
<section class="scene" id="s2">${bg()}<div class="wrap"><div class="cslot over" data-slot="p2"></div><div class="glass">
 <div class="lock">🔒</div><h2>${C.p2.heading}</h2><p>${C.p2.message}</p>
 <div class="scanner" id="sc">${fp}<i class="line"></i></div>
 <div class="bar"><i id="bar"></i></div><p class="status" id="st" aria-live="polite"></p>
 <button class="btn" id="scan">${C.p2.scanBtn}</button>
 <button class="btn alt hide" id="next2">${C.p2.nextBtn}</button>
</div></div></section>
<section class="scene" id="s3">${bg()}<div class="wrap" id="w3">
 <div class="cslot p3" data-slot="p3"></div>
 <div class="frames" id="frames"></div>
 <div class="cslot card" data-slot="card"></div>
 <div class="fade" id="ask"><h2>${C.p3.question}</h2><p>${C.p3.sub}</p>
  <div class="choices">${C.answers.map((a,i)=>`<button class="btn" data-i="${i}">${a.label}</button>`).join('')}</div></div>
 <div class="card hide" id="card"></div>
 <div class="card hide" id="end"><div class="cardbox"><h2>${C.end.text}</h2></div><div class="acts"><button class="btn alt" id="back">${C.end.back}</button></div></div>
</div></section>`;

/* photos */
const FR=$('#frames');(C.recipientPhotos||[]).forEach(P=>{if(!P.src)return;const f=document.createElement('div');f.className='frame';f.style.setProperty('--ar0',P.aspect||'1 / 1');f.style.rotate=(P.rotate||0)+'deg';FR.append(f);const t=new Image();t.onload=()=>{t.alt='';t.style.cssText=`object-fit:cover;object-position:${P.position||'50% 50%'};transform:scale(${P.scale||1})`;f.append(t)};t.onerror=()=>f.remove();t.src=P.src});
/* characters: nothing is rendered unless src is set and loads */
Object.entries(C.characters).forEach(([k,c])=>{if(!c||!c.src)return;const s=document.querySelector(`.cslot[data-slot="${k}"]`);if(!s)return;const i=new Image();i.onload=()=>{i.className=c.animation||'';i.alt='';Object.assign(i.style,{width:c.width,height:c.height,position:'relative',left:c.offsetX||'0px',top:c.offsetY||'0px',rotate:(c.rotate||0)+'deg',scale:c.scale||1});s.style.justifyContent={left:'flex-start',right:'flex-end'}[c.align]||'center';s.append(i)};i.src=c.src});

/* transitions */
function swap(id){const o=cur&&$('#'+cur),n=$('#'+id);if(o){o.classList.remove('show');setTimeout(()=>o.classList.remove('on'),600)}n.classList.add('on');n.scrollTop=0;requestAnimationFrame(()=>requestAnimationFrame(()=>n.classList.add('show')));cur=id}
async function go(id,fx){if(busy)return;busy=true;if(!R&&fx){const e=document.createElement('div');e.className=fx==='heart'?'fly':'burstlight';if(fx==='heart')e.textContent='💗';document.body.append(e);await wait(fx==='heart'?550:600);swap(id);await wait(500);e.remove()}else swap(id);busy=false}

/* page 1 */
$('#open').onclick=async()=>{if(opened)return;opened=true;$('#open').classList.add('hide');$('#env').classList.add('open');await wait(C.anim.letterOpenMs);$('#env').classList.add('gone');await wait(380);$('#env').classList.add('hide');$('#h1').classList.add('hide');$('#letter').classList.remove('hide');$('#s1').classList.add('reading')};
$('#next1').onclick=()=>go('s2','heart');

/* page 2 (simulation only: no sensors, no data) */
$('#scan').onclick=async e=>{if(scanning||scanned)return;scanning=true;e.currentTarget.disabled=true;const sc=$('#sc'),n=C.p2.status.length,t=C.anim.scanMs/n,bar=$('#bar');sc.classList.add('active');bar.style.transition=`width ${t}ms ease`;
 for(let i=0;i<n;i++){$('#st').textContent=C.p2.status[i];bar.style.width=((i+1)/n*100)+'%';await wait(t)}
 sc.classList.replace('active','done');scanned=true;scanning=false;$('#scan').classList.add('hide');$('#next2').classList.remove('hide')};
$('#next2').onclick=()=>go('s3','light');

/* page 3 */
const w=$('#w3'),ask=$('#ask'),card=$('#card'),end=$('#end'),frame=$('#frames');
function burst(k){if(R)return;const bgEl=$('#s3 .bg'),o={yes:[['💗','💖','✨','🌸'],24,2800],maybe:[['✨','💙'],9,4200],no:[['🤍','✨'],7,4600]}[k];
 for(let i=0;i<o[1];i++){const s=document.createElement('i');s.className='p';s.textContent=o[0][i%o[0].length];s.style.cssText=`left:${5+Math.random()*90}%;font-size:${14+Math.random()*16}px;animation-duration:${o[2]*(.7+Math.random()*.5)}ms;animation-delay:${Math.random()*500}ms`;bgEl.append(s);setTimeout(()=>s.remove(),o[2]*2)}
 if(k==='yes')for(let i=0;i<22;i++){const s=document.createElement('i');s.className='cf';s.style.cssText=`left:${Math.random()*100}%;background:${['#62C5E8','#C9B7F5','#FFD6E7','#BDEBFA'][i%4]};--dx:${Math.random()*80-40}px;animation-duration:${2.4+Math.random()*1.6}s;animation-delay:${Math.random()*600}ms`;bgEl.append(s);setTimeout(()=>s.remove(),5000)}}
async function choose(i){if(busy||selected!==null)return;busy=true;selected=i;const k=C.answers[i].anim;frame.classList.remove('yes','maybe','no');void frame.offsetWidth;frame.classList.add(k);burst(k);await wait(k==='yes'?1300:1000);frame.classList.remove(k);showCard();busy=false}
function showCard(){const a=C.answers[selected];
 card.innerHTML=`<div class="cardbox"><h2>${C.card.heading}</h2><div class="pill">${a.label}</div><p>${a.message}</p><p class="shot">${C.card.instruction}</p></div><div class="acts"><button class="btn alt" id="chg">${C.card.change.replace('🔄','<span class="rot">🔄</span>')}</button><button class="btn alt" id="fin">${C.card.exit}</button></div>`;
 $('#chg').onclick=change;$('#fin').onclick=finish;$('#s3 .bg').classList.add('cardview');w.classList.add('cardmode');ask.classList.add('hide');end.classList.add('hide');card.classList.remove('hide','out');card.classList.remove('in');void card.offsetWidth;card.classList.add('in')}
async function change(){if(busy)return;busy=true;card.classList.add('out');await wait(350);card.classList.add('hide');card.innerHTML='';selected=null;$('#s3 .bg').classList.remove('cardview');w.classList.remove('cardmode');ask.classList.remove('hide');ask.classList.add('quick');busy=false}
function finish(){card.classList.add('hide');end.classList.remove('hide');end.classList.add('in')}
$('#back').onclick=()=>{end.classList.add('hide');if(selected!==null)showCard()};
document.querySelectorAll('.choices .btn').forEach(b=>b.onclick=()=>choose(+b.dataset.i));

/* ambient hearts */
setInterval(()=>{if(R||!cur||document.hidden)return;const h=document.createElement('i');h.className='hf';h.textContent=['💗','💙','💜','✨'][Math.random()*4|0];h.style.cssText=`left:${Math.random()*95}%;font-size:${12+Math.random()*16}px;animation-duration:${7+Math.random()*5}s`;$('#'+cur+' .bg').append(h);setTimeout(()=>h.remove(),12000)},C.anim.heartsEveryMs);
swap('s1');
})();
