window.addEventListener('scroll',()=>{document.getElementById('progress-bar').style.width=(window.scrollY/(document.body.scrollHeight-window.innerHeight))*100+'%'});
window.addEventListener('scroll',()=>{document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>60)});
document.getElementById('ham').addEventListener('click',()=>{document.getElementById('mob-menu').classList.toggle('open')});
const glow=document.getElementById('cursor-glow');
document.addEventListener('mousemove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
const obs=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('on');obs.unobserve(e.target);}});},{threshold:0.1,rootMargin:'0px 0px -30px 0px'});
document.querySelectorAll('.r').forEach(el=>obs.observe(el));
const cObs=new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(!e.isIntersecting)return;
    const t=+e.target.dataset.target,pre=e.target.dataset.prefix||'',suf=e.target.dataset.suffix||'';
    let c=0,step=Math.ceil(t/60);
    const ti=setInterval(()=>{c=Math.min(c+step,t);e.target.textContent=pre+c+suf;if(c>=t)clearInterval(ti);},20);
    cObs.unobserve(e.target);
  });
},{threshold:.5});
document.querySelectorAll('[data-target]').forEach(el=>cObs.observe(el));

document.getElementById('lead-form').addEventListener('submit',function(e){
  e.preventDefault();
  const name=document.getElementById('cf-name').value;
  const email=document.getElementById('cf-email').value;
  const target=document.getElementById('cf-target').value;
  const phone=document.getElementById('cf-phone').value;
  
  let msg = '';
  if (document.querySelector('.kids-logo')) {
    msg=`Hola, soy ${name} (acudiente), mi contacto es ${email} y ${phone}. Me interesa el programa One Talk Kids para un menor de ${target}, solicito una evaluación gratuita.`;
  } else {
    msg=`Hola One Talk, mi nombre es ${name}, mi correo es ${email} (${phone}). Me interesa aplicar al programa general orientado a: ${target}, solicitando mi evaluación de cortesía.`;
  }
  
  document.getElementById('btn-wa-success').href=`https://wa.me/573107927335?text=${encodeURIComponent(msg)}`;
  this.style.display='none';
  document.getElementById('success-box').style.display='block';
});
function scroll2Form(){document.getElementById('form-section').scrollIntoView({behavior:'smooth'});}

(function(){
  const canvas=document.getElementById('particles-canvas');
  const ctx=canvas.getContext('2d');
  let W,H,pts=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<55;i++)pts.push({x:Math.random()*1400,y:Math.random()*800,r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,a:Math.random()*.5+.15});
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(26,188,156,${p.a})`;ctx.fill();
    });
    pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
      const d=Math.hypot(a.x-b.x,a.y-b.y);
      if(d<130){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle=`rgba(26,188,156,${.08*(1-d/130)})`;ctx.lineWidth=.5;ctx.stroke();}
    }));
    requestAnimationFrame(draw);
  }
  draw();
})();

// Privacy Modal Logic
const privacyLinks = document.querySelectorAll('.open-privacy-btn, #open-privacy-modal');
const modalBackdrop = document.getElementById('privacy-modal');
const closeModalBtn = document.getElementById('close-modal');

if(modalBackdrop && closeModalBtn) {
  privacyLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      modalBackdrop.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });
  
  closeModalBtn.addEventListener('click', () => {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  modalBackdrop.addEventListener('click', (e) => {
    if(e.target === modalBackdrop) {
      modalBackdrop.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}
