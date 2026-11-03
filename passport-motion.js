/* Scroll-led passport details. Decorative layers never capture input. */
(() => {
  const stage=document.querySelector('#stage');
  const pages=[...document.querySelectorAll('.portal')];
  const labels=['INVITATION ISSUED','OUR LOVE STORY','ARRIVAL APPROVED','CELEBRATE WITH US','READY FOR TAKEOFF','YOUR SEAT AWAITS'];
  const ornaments=document.createElement('div');
  ornaments.className='depth-ornaments';ornaments.setAttribute('aria-hidden','true');
  ornaments.innerHTML='<div class="botanical-depth botanical-left"><img src="assets/floral-arch.png" alt=""></div><div class="botanical-depth botanical-right"><img src="assets/floral-arch.png" alt=""></div><div class="floating-postage"><span>POSTAGE OF LOVE</span><b>A ♡ R</b><small>MAURITIUS · 2027</small></div><div class="compass-depth"><span>N</span><i>✧</i><span>S</span></div><div class="gold-motes"></div>';
  stage.append(ornaments);
  pages.forEach((page,i)=>{
    page.classList.add('passport-page');
    const bed=document.createElement('div');bed.className='passport-bed';bed.setAttribute('aria-hidden','true');
    bed.innerHTML='<div class="page-grain"></div><div class="page-spine"></div><div class="guilloche"></div><div class="passport-topline"><span>THE WEDDING PASSPORT</span><span>A & R / REPUBLIC OF LOVE</span></div><div class="passport-bottomline"><span>P&lt;LOVE&lt;AMELIA&lt;&lt;RYAN&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</span><b>'+String(i+1).padStart(2,'0')+'</b></div><div class="page-edge"></div>';
    page.prepend(bed);
    const stamp=document.createElement('div');stamp.className='travel-seal seal-'+i;stamp.setAttribute('aria-hidden','true');stamp.innerHTML='<span>'+labels[i]+'</span><strong>18 SEP 2027</strong><small>MAURITIUS · FOREVER</small>';page.append(stamp);
    const leaf=document.createElement('div');leaf.className='turning-leaf';leaf.setAttribute('aria-hidden','true');leaf.innerHTML='<span>❧</span>';page.append(leaf);
    page.querySelectorAll('.note-row,.evening-events>div,.ticket-route>div,.love-letter>p').forEach((item,j)=>{item.classList.add('stagger-detail');item.style.setProperty('--order',j);});
  });
  const flight=document.createElement('div');flight.className='flight-thread';flight.setAttribute('aria-hidden','true');flight.innerHTML='<svg viewBox="0 0 1000 700" preserveAspectRatio="none"><path class="route-line" d="M70 610 C 140 410, 420 700, 560 480 S 660 200, 910 120" pathLength="1"/></svg><span class="travelling-plane">✈</span>';stage.append(flight);
  const motionQuery=matchMedia('(prefers-reduced-motion: reduce)');
  const clamp=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
  const ease=n=>n*n*(3-2*n);
  let frame=0,mx=0,my=0;
  function update(){frame=0;const still=document.body.classList.contains('still');const amount=clamp(scrollY/Math.max(1,document.querySelector('#story').offsetHeight-innerHeight));const t=amount*8.6;
    stage.style.setProperty('--pointer-x',still?'0':mx.toFixed(3));stage.style.setProperty('--pointer-y',still?'0':my.toFixed(3));
    stage.style.setProperty('--drift',still?'0px':(-amount*140)+'px');stage.style.setProperty('--reverse-drift',still?'0px':(amount*90)+'px');
    ornaments.style.opacity=t<1.5?'.65':'.9';flight.style.opacity=t>1.8&&t<7?'.4':'0';flight.style.setProperty('--flight-progress',amount);flight.style.setProperty('--flight-x',(8+amount*80)+'%');flight.style.setProperty('--flight-y',(87-amount*70)+'%');
    pages.forEach((page,i)=>{const d=(t-2)-i*1.12;const entering=ease(clamp((d+.55)/.55));const departing=i===5?0:ease(clamp((d-.4)/.6));page.style.setProperty('--page-enter',still?'1':entering.toFixed(4));page.style.setProperty('--page-leave',still?'0':departing.toFixed(4));page.style.setProperty('--seal-progress',still?'1':ease(clamp((d+.07)/.24)).toFixed(4));page.classList.toggle('in-view',d>-.2&&d<.85||i===5&&d>-.2);page.style.setProperty('--scene-drift',still?'0px':(clamp(d,-1,1)*48)+'px');});
  }
  function request(){if(!frame)frame=requestAnimationFrame(update)}
  addEventListener('scroll',request,{passive:true});addEventListener('resize',request);motionQuery.addEventListener('change',request);document.querySelector('#motion').addEventListener('click',request);
  stage.addEventListener('pointermove',event=>{if(event.pointerType==='touch')return;mx=clamp(event.clientX/innerWidth*2-1,-1,1);my=clamp(event.clientY/innerHeight*2-1,-1,1);request()},{passive:true});stage.addEventListener('pointerleave',()=>{mx=0;my=0;request()});
  document.addEventListener('visibilitychange',()=>{document.body.classList.toggle('tab-hidden',document.hidden)});update();
})();
