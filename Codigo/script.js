window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 800);
    }

    // Funcionalidad para resetear el formulario (Enviar otra respuesta)
    const btnResetForm = document.getElementById('btn-reset-form');
    if(btnResetForm) {
        btnResetForm.addEventListener('click', () => {
            const form = document.getElementById('lead-form');
            if (form) {
              form.reset(); // Vacía los campos del formulario
              document.getElementById('success-box').style.display = 'none'; // Oculta estado éxito
              form.style.display = 'block'; // Muestra nuevamente el formulario
              
              // Restaurar estado del botón de envío
              const submitBtn = form.querySelector('button[type="submit"]');
              submitBtn.innerText = "📅 Contactar Vía WhatsApp";
              submitBtn.disabled = false;
            }
        });
    }

    // Funcionalidad para autocompletar el indicativo según el país
    const countrySelect = document.getElementById('cf-country');
    const countryCodeInput = document.getElementById('cf-country-code');
    if (countrySelect && countryCodeInput) {
        countrySelect.addEventListener('change', (e) => {
            const selectedOption = e.target.options[e.target.selectedIndex];
            const code = selectedOption.getAttribute('data-code');
            if (code !== null) {
                countryCodeInput.value = code;
            } else {
                countryCodeInput.value = '';
            }
        });
    }
});

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

// Configuración de URLs
const scriptURL = 'https://script.google.com/macros/s/AKfycbwHMlEtjEmuM4a77fRauY8GcmypjwqGZLojfHkLPZc2iI54_6s94J-1YLB2YNJPBvsd/exec';
const form = document.getElementById('lead-form');

if (form) {
  form.addEventListener('submit', e => {
      e.preventDefault();
      
      // Mostramos un estado de carga opcional en el botón (buena práctica)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = "Enviando...";
      submitBtn.disabled = true;

      // Recolectamos los datos de los inputs del HTML
      const formData = new FormData();
      formData.append('nombre', document.getElementById('cf-name').value);
      formData.append('email', document.getElementById('cf-email').value);
      
      const pais = document.getElementById('cf-country').value;
      if (pais) {
          formData.append('pais', pais);
      }
      
      // Concatenamos indicativo + teléfono y agregamos la comilla simple para evitar el #ERROR!
      const countryCode = document.getElementById('cf-country-code').value;
      const phone = document.getElementById('cf-phone').value;
      formData.append('telefono', "'" + countryCode + " " + phone);
      
      formData.append('interes', document.getElementById('cf-target').value);

      // 1. Enviamos los datos a Google Sheets
      fetch(scriptURL, { 
          method: 'POST', 
          body: formData,
          mode: 'no-cors' // Esto evita errores de redirección en algunos navegadores
      })
      .then(() => {
          // 2. Ocultar formulario y mostrar caja de éxito
          document.getElementById('lead-form').style.display = 'none';
          document.getElementById('success-box').style.display = 'block';
          
          // 3. Ejecutar la función para preparar el enlace de WhatsApp
          prepararWhatsApp(); 
      })
      .catch(error => {
          console.error('Error!', error.message);
          submitBtn.innerText = "Reintentar";
          submitBtn.disabled = false;
          prepararWhatsApp(); // Intentamos preparar WhatsApp de todos modos
      });
  });
}

function prepararWhatsApp() {
    const nombre = document.getElementById('cf-name').value;
    const interes = document.getElementById('cf-target').value;
    
    let mensaje = '';
    // Mensaje adaptado según si es la página de Kids o Principal
    if (document.querySelector('.kids-logo')) {
      mensaje = `Hola One Talk, mi nombre es ${nombre}. Me interesa el programa Kids (${interes}) para un menor y me gustaría agendar su diagnóstico gratuito.`;
    } else {
      mensaje = `Hola One Talk, mi nombre es ${nombre}. Me interesa el programa de ${interes} y me gustaría agendar mi diagnóstico gratuito.`;
    }
    
    // Generamos el enlace con tu número: 573107927335
    const waLink = `https://wa.me/573107927335?text=${encodeURIComponent(mensaje)}`;
    
    // Asignamos el enlace al botón de éxito
    const btnWhatsApp = document.getElementById('btn-wa-success');
    if (btnWhatsApp) {
        btnWhatsApp.href = waLink;
    }
}
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
