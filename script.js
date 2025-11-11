// animate the scribble stroke (SVG path)
(function(){
  const path = document.getElementById('scrib');
  if(!path) return;
  const length = path.getTotalLength();
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;
  path.style.transition = 'stroke-dashoffset 2s cubic-bezier(.2,.9,.2,1)';
  // animate repeatedly with pauses
  const run = ()=>{
    path.style.strokeDashoffset = '0';
    setTimeout(()=> path.style.strokeDashoffset = length, 2200);
  }
  setInterval(run, 3000);
  // start first time
  setTimeout(run, 300);
})();

// small login animation on submit
document.getElementById('loginForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = this.querySelector('.login-btn');
  btn.disabled = true;
  btn.style.transform = 'scale(.96)';
  btn.querySelector('.btn-text').textContent = 'Connecting...';
  // flicker lamp glow for dramatic effect
  const lampGlow = document.querySelector('.lamp-glow');
  if(lampGlow){
    lampGlow.style.transition = 'opacity 0.12s ease';
    lampGlow.style.opacity = '1';
  }

  setTimeout(()=>{
    // success "hack" animation
    btn.querySelector('.btn-text').textContent = 'Access Granted';
    btn.style.transform = 'scale(1.02)';
    btn.style.boxShadow = '0 12px 40px rgba(255,60,60,0.25)';
    // tiny confetti effect: create red streaks
    createFlash();
  }, 1600);

  setTimeout(()=>{
    btn.disabled = false;
    btn.querySelector('.btn-text').textContent = 'Login';
    btn.style.transform = '';
    if(lampGlow) lampGlow.style.opacity = '';
  }, 3600);
});

// simple flash effect inside canvas
function createFlash(){
  const area = document.querySelector('.canvas-area');
  const flash = document.createElement('div');
  flash.style.position = 'absolute';
  flash.style.inset = '0';
  flash.style.background = 'radial-gradient(closest-side, rgba(255,200,150,0.12), transparent 50%)';
  flash.style.pointerEvents = 'none';
  flash.style.zIndex = 20;
  flash.style.opacity = '0';
  flash.style.transition = 'opacity .18s ease';
  area.appendChild(flash);
  requestAnimationFrame(()=> flash.style.opacity = '1');
  setTimeout(()=>{ flash.style.opacity = '0'; setTimeout(()=> flash.remove(), 220) }, 200);
}