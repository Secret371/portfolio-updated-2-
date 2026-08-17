// ═══ MATRIX RAIN ═══
(function(){
  const canvas = document.getElementById('matrixCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;
  const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン012345789ABCDEF<>{}[]()=;';
  function init(){
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 20);
    drops = Array(cols).fill(1);
  }
  function draw(){
    ctx.fillStyle = 'rgba(2,4,8,0.05)';
    ctx.fillRect(0,0,W,H);
    ctx.font = '14px JetBrains Mono, monospace';
    for(let i=0;i<drops.length;i++){
      const ch = chars[Math.floor(Math.random()*chars.length)];
      const alpha = Math.random() > 0.9 ? 1 : 0.4;
      ctx.fillStyle = `rgba(0,245,212,${alpha})`;
      ctx.fillText(ch, i*20, drops[i]*20);
      if(drops[i]*20 > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }
  init();
  window.addEventListener('resize', init);
  setInterval(draw, 50);
})();

// ═══ MOUSE TRAIL ═══
(function(){
  const container = document.getElementById('trail-container');
  const colors = ['var(--c)','var(--c2)','var(--c3)'];
  let lastX=0,lastY=0;
  document.addEventListener('mousemove', e=>{
    if(Math.abs(e.clientX-lastX)<6 && Math.abs(e.clientY-lastY)<6) return;
    lastX=e.clientX; lastY=e.clientY;
    const dot = document.createElement('div');
    dot.className='trail-dot';
    const size = 4+Math.random()*6;
    dot.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};box-shadow:0 0 ${size*2}px currentColor;`;
    container.appendChild(dot);
    setTimeout(()=>dot.remove(), 700);
  });
})();

// ═══ CLICK RIPPLE ═══
(function(){
  const container = document.getElementById('click-ripple-container');
  document.addEventListener('click', e=>{
    for(let i=0;i<2;i++){
      const r = document.createElement('div');
      r.className='click-ripple';
      const size = 30+i*20;
      r.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;width:${size}px;height:${size}px;border-color:${i===0?'var(--c)':'var(--c2)'};animation-delay:${i*0.08}s;`;
      container.appendChild(r);
      setTimeout(()=>r.remove(), 800);
    }
  });
})();

// ═══ NAV STATUS ROTATOR ═══
(function(){
  const statuses = [
    'currently_working_on: Spring Boot API',
    'status: open_to_opportunities ✔',
    'learning: Docker + Kubernetes',
    'contributing: GSSoC 2026 🏆',
    'streak: coding_every_day 🔥',
    'mood: building_something_cool ⚡',
  ];
  let idx=0;
  const el = document.getElementById('nsText');
  if(!el) return;
  setInterval(()=>{
    el.style.opacity='0';
    setTimeout(()=>{
      idx=(idx+1)%statuses.length;
      el.textContent=statuses[idx];
      el.style.opacity='1';
    },300);
  },3000);
  el.style.transition='opacity 0.3s';
})();

// ═══ SKILL BARS ANIMATE ON SCROLL ═══
(function(){
  const barObs = new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        e.target.querySelectorAll('.sk-bar').forEach(bar=>{
          bar.style.width = bar.dataset.w+'%';
        });
        barObs.unobserve(e.target);
      }
    });
  },{threshold:0.2});
  const skillsSection = document.getElementById('skills');
  if(skillsSection) barObs.observe(skillsSection);
})();

// ═══ INTRO MATRIX (inside intro screen) ═══
(function(){
  const c = document.getElementById('introMatrix');
  if(!c) return;
  const ctx = c.getContext('2d');
  let W,H,cols,drops;
  const chars='01アイウエオJAVA{}[]<>=;()#';
  function init(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;cols=Math.floor(W/18);drops=Array(cols).fill(1);}
  function draw(){
    ctx.fillStyle='rgba(1,2,5,0.06)';ctx.fillRect(0,0,W,H);
    ctx.font='13px JetBrains Mono,monospace';
    for(let i=0;i<drops.length;i++){
      ctx.fillStyle=`rgba(0,245,212,${Math.random()>0.9?0.9:0.35})`;
      ctx.fillText(chars[Math.floor(Math.random()*chars.length)],i*18,drops[i]*18);
      if(drops[i]*18>H&&Math.random()>0.97)drops[i]=0;
      drops[i]++;
    }
  }
  init();setInterval(draw,55);
})();

// ═══ INTRO AUTO-EXIT ═══
(function(){
  const screen=document.getElementById('intro-screen');
  const bar=document.getElementById('introBar');
  const pct=document.getElementById('introPct');
  const role=document.getElementById('introRole');
  const lines=['Initializing portfolio...','Loading Java modules...','Compiling Spring Boot...','Connecting to GitHub...','Ready!'];
  let p=0,li=0;
  const iv=setInterval(()=>{
    p+=1;
    if(bar)bar.style.width=p+'%';
    if(pct)pct.textContent=p+'%';
    if(p%20===0&&li<lines.length&&role){role.textContent=lines[li++];}
    if(p>=100){
      clearInterval(iv);
      setTimeout(()=>{
        screen.classList.add('intro-exit');
        setTimeout(()=>{screen.style.display='none';},700);
      },400);
    }
  },28);
})();

function enterSite(){}

// ═══ CUSTOM CURSOR ═══
const cur = document.getElementById('cur');
const curR = document.getElementById('curRing');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cur.style.left = mx - 5 + 'px';
  cur.style.top = my - 5 + 'px';
});
(function animR(){
  rx += (mx - rx) * 0.13;
  ry += (my - ry) * 0.13;
  curR.style.left = rx - 18 + 'px';
  curR.style.top = ry - 18 + 'px';
  requestAnimationFrame(animR);
})();
document.querySelectorAll('a,button,.sk,.proj,.cert,.ach,.soc-a,.chip,.enter-btn').forEach(el => {
  el.addEventListener('mouseenter', () => { curR.style.transform = 'scale(1.6)'; curR.style.borderColor = 'var(--c)'; });
  el.addEventListener('mouseleave', () => { curR.style.transform = 'scale(1)'; curR.style.borderColor = 'rgba(0,245,212,0.5)'; });
});

// ═══ TYPEWRITER ═══

// ═══ TYPEWRITER ═══
const roles = ['Java Developer','Spring Boot Dev','Backend Developer','Open Source Contributor','Future SDE'];
let ri = 0, ci = 0, del = false;
function type(){
  const el = document.getElementById('typewriter');
  const cur = roles[ri];
  if(!del){ el.textContent = cur.slice(0, ci+1); ci++; if(ci === cur.length){ del = true; setTimeout(type, 1900); return; }}
  else { el.textContent = cur.slice(0, ci-1); ci--; if(ci === 0){ del = false; ri = (ri+1) % roles.length; }}
  setTimeout(type, del ? 42 : 88);
}
type();

// ═══ COUNTER ═══
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      const el = e.target, target = +el.dataset.target;
      let n = 0, step = target / 60;
      const t = setInterval(() => {
        n = Math.min(n + step, target);
        el.textContent = Math.round(n) + '+';
        if(n >= target) clearInterval(t);
      }, 28);
      obs.unobserve(el);
    }
  });
});
document.querySelectorAll('[data-target]').forEach(c => obs.observe(c));

// ═══ ACTIVE NAV ON SCROLL ═══
(function(){
  const sections=document.querySelectorAll('section[id]');
  const links=document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll',()=>{
    let cur='';
    sections.forEach(s=>{
      if(window.scrollY>=s.offsetTop-120)cur=s.id;
    });
    links.forEach(a=>{
      a.classList.toggle('active',a.getAttribute('href')==='#'+cur);
    });
  });
})();

// ═══ COURSE PROGRESS ANIMATE ═══
(function(){
  const fill=document.getElementById('courseProgressFill');
  const pctEl=document.getElementById('courseProgressPct');
  if(!fill) return;
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const w=+fill.dataset.w;
        fill.style.width=w+'%';
        let n=0;
        const iv=setInterval(()=>{
          n=Math.min(n+1,w);
          if(pctEl)pctEl.textContent=n+'%';
          if(n>=w)clearInterval(iv);
        },18);
        obs.unobserve(e.target);
      }
    });
  },{threshold:0.3});
  obs.observe(fill);
})();

// ═══ SCROLL ═══
window.addEventListener('scroll', () => {
  document.getElementById('scrollTop').classList.toggle('show', window.scrollY > 400);
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
});

// ═══ REVEAL ═══
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('in'); revObs.unobserve(e.target); }});
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ═══ 4D TILT CARDS ═══
function initTilt(selector, maxTilt){
  document.querySelectorAll(selector).forEach(card => {
    card.classList.add('tilt');
    card.addEventListener('mouseenter', () => { card.style.transition = 'none'; });
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width;
      const py = (e.clientY - r.top) / r.height;
      const rx = (py - 0.5) * -maxTilt;
      const ry = (px - 0.5) * maxTilt;
      card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px) scale(1.02)`;
      card.style.setProperty('--mx', `${px * 100}%`);
      card.style.setProperty('--my', `${py * 100}%`);
    });
    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(.22,1,.36,1)';
      card.style.transform = '';
    });
  });
}
initTilt('.proj', 9);
initTilt('.sk', 13);
initTilt('.cert', 6);
initTilt('.ach', 6);

// ═══ PARALLAX DEPTH (hero photo + bg orbs follow cursor) ═══
(function(){
  const photoWrap = document.querySelector('.photo-ring-wrap');
  const orbs = document.querySelector('.bg-orbs');
  window.addEventListener('mousemove', e => {
    const cx = (e.clientX / window.innerWidth - 0.5);
    const cy = (e.clientY / window.innerHeight - 0.5);
    if(photoWrap) photoWrap.style.transform = `perspective(900px) rotateY(${cx * 14}deg) rotateX(${cy * -14}deg) translateZ(10px)`;
    if(orbs) orbs.style.transform = `translate(${cx * -30}px, ${cy * -30}px)`;
  });
})();

// ═══ MAGNETIC BUTTONS ═══
document.querySelectorAll('.btn-primary,.btn-secondary,.nav-cta,.form-btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * 0.25;
    const y = (e.clientY - r.top - r.height / 2) * 0.4;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});

// ═══ CONTACT FORM ═══
// Step 1: Sign up free at https://formspree.io (2 min, no card needed).
// Step 2: Create a form pointed at chandrakantabarik66@gmail.com and copy its endpoint.
// Step 3: Paste that endpoint below, replacing YOUR_FORM_ID.
// Until you do, messages fall back to opening the visitor's email app (still works, just less slick).
const FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

(function(){
  const form = document.getElementById('contactForm');
  const btn = document.getElementById('cf-btn');
  const status = document.getElementById('cf-status');
  if(!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if(!name || !email || !subject || !message){
      status.textContent = '⚠ Please fill in every field.';
      status.style.color = '#ff6b6b';
      return;
    }

    const usingFormspree = !FORM_ENDPOINT.includes('YOUR_FORM_ID');

    if(!usingFormspree){
      // Fallback: open the visitor's email client with everything pre-filled.
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:chandrakantabarik66@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
      status.textContent = '✓ Opening your email app to send this...';
      status.style.color = 'var(--c)';
      return;
    }

    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.textContent = '';

    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form)
      });
      if(res.ok){
        status.textContent = '✓ Message sent! I\'ll get back to you soon.';
        status.style.color = 'var(--c)';
        form.reset();
      } else {
        throw new Error('Send failed');
      }
    } catch(err){
      status.textContent = '⚠ Could not send right now — please email me directly instead.';
      status.style.color = '#ff6b6b';
    } finally {
      btn.disabled = false;
      btn.textContent = 'Send Message →';
    }
  });
})();
