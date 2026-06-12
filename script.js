// Loader
setTimeout(function(){var l=document.getElementById('loader');if(l)l.classList.add('hidden')},1200);

// Cursor
(function(){
  var dot=document.querySelector('.cursor-dot'),ring=document.querySelector('.cursor-ring');
  var mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',function(e){mx=e.clientX;my=e.clientY});
  (function anim(){rx+=(mx-rx)*.15;ry+=(my-ry)*.15;if(dot){dot.style.left=mx+'px';dot.style.top=my+'px'}if(ring){ring.style.left=rx+'px';ring.style.top=ry+'px'}requestAnimationFrame(anim)})();
  document.querySelectorAll('a,button,.proj-card,.stat-box,.skill-cat,.svc-card,.c-item').forEach(function(el){el.addEventListener('mouseenter',function(){document.body.classList.add('hover')});el.addEventListener('mouseleave',function(){document.body.classList.remove('hover')})});
})();

// Progress
(function(){
  var progress=document.getElementById('progress');
  window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-window.innerHeight;if(progress)progress.style.width=h>0?(window.scrollY/h)*100+'%':'0'});
})();

// Nav scroll
(function(){
  var nav=document.getElementById('nav');
  window.addEventListener('scroll',function(){if(nav)nav.classList.toggle('scrolled',window.scrollY>40);updateActive()});
  function updateActive(){
    var sections=document.querySelectorAll('section[id]'),links=document.querySelectorAll('.nav-links a'),current='';
    sections.forEach(function(s){if(window.scrollY>=s.offsetTop-200)current=s.id});
    links.forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+current)});
  }
})();

// Mobile menu
function toggleMenu(){var m=document.getElementById('mobile-menu'),h=document.getElementById('hamburger');if(m)m.classList.toggle('open');if(h)h.classList.toggle('open')}
function closeMenu(){var m=document.getElementById('mobile-menu'),h=document.getElementById('hamburger');if(m)m.classList.remove('open');if(h)h.classList.remove('open')}

// Typewriter
(function(){
  var roles=['Python Developer','Automation Engineer','Telegram Bot Builder','OSINT Researcher','Cybersecurity Enthusiast'];
  var ri=0,ci=0,del=false,tw=document.getElementById('typewriter');
  function type(){
    if(!tw)return;var p=roles[ri];
    if(!del){ci++;tw.textContent=p.slice(0,ci);if(ci===p.length){del=true;setTimeout(type,2000);return}setTimeout(type,80)}
    else{ci--;tw.textContent=p.slice(0,ci);if(ci===0){del=false;ri=(ri+1)%roles.length;setTimeout(type,300);return}setTimeout(type,40)}
  }
  setTimeout(type,1200);
})();

// Interactive terminal
(function(){
  var termOut=document.getElementById('term-output'),termIn=document.getElementById('term-input'),termLine=document.getElementById('term-input-line');
  if(!termOut||!termIn||!termLine)return;
  var termLines=['<span class="panel-cm"># Developer profile loaded</span>','&nbsp;','{','&nbsp;&nbsp;<span class="panel-json">"name"</span>: <span class="panel-str">"Steve lee"</span>,','&nbsp;&nbsp;<span class="panel-json">"role"</span>: <span class="panel-str">"Python Developer"</span>,','&nbsp;&nbsp;<span class="panel-json">"location"</span>: <span class="panel-str">"Nigeria"</span>,','&nbsp;&nbsp;<span class="panel-json">"stack"</span>: [<span class="panel-str">"Python"</span>, <span class="panel-str">"Automation"</span>, <span class="panel-str">"OSINT"</span>],','&nbsp;&nbsp;<span class="panel-json">"available"</span>: <span class="panel-bool">true</span>,','&nbsp;&nbsp;<span class="panel-json">"remote"</span>: <span class="panel-bool">true</span>','}','&nbsp;'];
  var cmds={
    help:'Available commands:<br>&nbsp;&nbsp;<span class="panel-kw">about</span> — About me<br>&nbsp;&nbsp;<span class="panel-kw">skills</span> — My skills<br>&nbsp;&nbsp;<span class="panel-kw">projects</span> — My projects<br>&nbsp;&nbsp;<span class="panel-kw">contact</span> — Contact info<br>&nbsp;&nbsp;<span class="panel-kw">whoami</span> — Who I am<br>&nbsp;&nbsp;<span class="panel-kw">github</span> — GitHub link<br>&nbsp;&nbsp;<span class="panel-kw">theme</span> — Toggle theme<br>&nbsp;&nbsp;<span class="panel-kw">clear</span> — Clear terminal',
    about:"Self-taught Python developer from Nigeria building automation tools, bots, and OSINT systems. Open to remote work worldwide.",
    skills:'<span class="panel-json">Python</span>, <span class="panel-json">Automation</span>, <span class="panel-json">Scraping</span>, <span class="panel-json">Telegram Bots</span>, <span class="panel-json">OSINT</span>, <span class="panel-json">Cybersecurity</span>, <span class="panel-json">Linux</span>, <span class="panel-json">Git</span>',
    projects:'See my work: <a href="#projects" style="color:var(--cyan)">scroll to projects</a> or <a href="https://github.com/Adeyanju-Adeola24" style="color:var(--cyan)" target="_blank">github.com/Adeyanju-Adeola24</a>',
    contact:'<span class="panel-json">Email</span>: yemiadeyanju20@gmail.com<br><span class="panel-json">GitHub</span>: @Adeyanju-Adeola24<br><span class="panel-json">Location</span>: Nigeria (Remote)',
    whoami:'<span class="panel-str">"Steve lee — Python Developer & Automation Engineer"</span>',
    github:'<a href="https://github.com/Adeyanju-Adeola24" style="color:var(--cyan)" target="_blank">github.com/Adeyanju-Adeola24</a>',
    theme:'Toggling theme... ☀/🌙',
    ls:'<span class="panel-json">about/</span> <span class="panel-json">skills/</span> <span class="panel-json">projects/</span> <span class="panel-json">services/</span> <span class="panel-json">contact/</span>'
  };

  // Enhanced commands
  var newCmds={
    date:'<span class="panel-json">'+new Date().toLocaleString('en-US',{weekday:'long',year:'numeric',month:'long',day:'numeric',hour:'2-digit',minute:'2-digit',second:'2-digit',timeZoneName:'shortOffset'})+'</span>',
    neofetch:(function(){try{var up=Math.floor((Date.now()-performance.timing.navigationStart)/1000)}catch(e){up=0}return '<span class="panel-json">OS</span>: Linux<br><span class="panel-json">Host</span>: lee.dev<br><span class="panel-json">Kernel</span>: 6.2.0-cyber<br><span class="panel-json">Uptime</span>: '+up+'s<br><span class="panel-json">Shell</span>: bash 5.2<br><span class="panel-json">CPU</span>: Steve\'s Brain @ 3.4GHz<br><span class="panel-json">Memory</span>: <span class="panel-str">Unlimited</span>' })(),
    calendar:'<pre style="color:var(--text2);font-size:11px;line-height:1.5">'+function(){var d=new Date(),m=d.getMonth(),y=d.getFullYear();var h=function(n){var r='';for(var i=0;i<n;i++)r+='&nbsp;';return r};var s='<span class="panel-kw">'+['January','February','March','April','May','June','July','August','September','October','November','December'][m]+' '+y+'</span>\n<span class="panel-cm">Su Mo Tu We Th Fr Sa</span>\n';var f=new Date(y,m,1).getDay(),ld=new Date(y,m+1,0).getDate();s+=h(f*3);for(var i=1;i<=ld;i++){var t=i===d.getDate()?'<span class="panel-kw" style="text-shadow:0 0 10px rgba(0,240,255,.5)">'+(i<10?'&nbsp;'+i:i)+'</span>':(i<10?'&nbsp;'+i:i);s+=t+' ';if((i+f)%7===0||i===ld)s+='\n'}return s+'</pre>',
    banner:'<pre style="color:var(--cyan);font-size:10px;line-height:1.2">  &#x2554;&#x2550;&#x2557;&#x2566;&#x2550;&#x2566;&#x2554;&#x2550;&#x2557;&#x2566;&#x2554;&#x2550;&#x2557;\n  &#x255A;&#x2550;&#x255D;&#x2569;&#x2550;&#x2569;&#x2550;&#x2569;&#x2563;&#x2559;\n  &#x255A;&#x2550;&#x255D;&#x255A;&#x2550;&#x255D;&#x255A;&#x2550;&#x255D;&#x2569;&#x255A;&#x2550;&#x255D;</pre><span class="panel-cm">Type <span class="panel-kw">help</span> for commands</span>',
    repo:'<a href="https://github.com/Adeyanju-Adeola24" style="color:var(--cyan)" target="_blank">github.com/Adeyanju-Adeola24</a>'
  };
  for(var k in newCmds)cmds[k]=newCmds[k];
  cmds.help+='<br>&nbsp;&nbsp;<span class="panel-kw">'+Object.keys(newCmds).filter(function(k){return k!=='banner'}).join('</span><br>&nbsp;&nbsp;<span class="panel-kw">')+'</span>';

  (function typeTerm(i){
    if(i>=termLines.length){termLine.style.display='flex';termIn.removeAttribute('readonly');var p=document.querySelector('.hero-panel');if(p){p.style.cursor='text';p.addEventListener('click',function(){termIn.focus()})}termIn.focus();return}
    var l=document.createElement('span');l.className='panel-line';l.innerHTML=termLines[i];termOut.appendChild(l);
    setTimeout(function(){typeTerm(i+1)},i===0?400:i===1?250:80);
  })(0);

  termIn.addEventListener('keydown',function(e){
    if(e.key==='Enter'){var v=this.value;this.value='';runCmd(v);setTimeout(function(){termIn.focus()},10)}
  });
  document.addEventListener('click',function(e){if(e.target.closest('.hero-panel')&&termIn)termIn.focus()});

  function runCmd(cmd){
    cmd=cmd.trim().toLowerCase();addLn('<span class="panel-kw">$</span> '+cmd);
    if(cmd==='clear'){termOut.innerHTML='';return}
    if(cmd==='theme'){var t=document.getElementById('theme-toggle');if(t)t.click();addLn('<span class="panel-cm">Theme toggled</span>');return}
    if(cmd===''||cmd===' '){addLn('<span class="panel-cm">Type <span class="panel-kw">help</span> for commands</span>');return}
    if(cmds[cmd]){addLn(cmds[cmd])}else{addLn('<span class="panel-cm">Command not found: '+cmd+'. Type <span class="panel-kw">help</span></span>')}
  }
  function addLn(h){var l=document.createElement('span');l.className='panel-line';l.innerHTML=h;termOut.appendChild(l);termOut.parentElement.scrollTop=termOut.parentElement.scrollHeight}
})();

// Scroll reveal
(function(){
  var revealed=new Set(),obs=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting&&!revealed.has(entry.target)){revealed.add(entry.target);entry.target.classList.add('visible');if(entry.target.querySelector('#skill-bars')||entry.target.id==='skill-bars')animBars();entry.target.querySelectorAll('[data-target]').forEach(cUp)}})},{threshold:.12});
  document.querySelectorAll('.reveal,.reveal-l,.reveal-r,.stagger,#skill-bars').forEach(function(el){obs.observe(el)});
})();

// Timeline
document.querySelectorAll('.tl-item').forEach(function(el,i){new IntersectionObserver(function(e){if(e[0].isIntersecting){setTimeout(function(){el.classList.add('visible')},i*150)}},{threshold:.2}).observe(el)});

// Skill bars
var barsDone=false;
function animBars(){if(barsDone)return;barsDone=true;document.querySelectorAll('.skill-bar-fill').forEach(function(b,i){setTimeout(function(){b.style.width=b.dataset.w+'%'},i*120)})}
function cUp(el){var t=+el.dataset.target,c=0,s=t/40;var iv=setInterval(function(){c+=s;if(c>=t){c=t;clearInterval(iv)}el.textContent=Math.floor(c)},35)}

// Project filter
document.querySelectorAll('.filter-btn').forEach(function(btn){btn.addEventListener('click',function(){document.querySelectorAll('.filter-btn').forEach(function(b){b.classList.remove('active')});this.classList.add('active');var f=this.dataset.filter;document.querySelectorAll('.proj-card').forEach(function(c){c.classList.toggle('hidden',f!=='all'&&c.dataset.category!==f)})})});

// Theme toggle
(function(){
  var toggle=document.getElementById('theme-toggle');
  if(!toggle)return;
  toggle.addEventListener('click',function(){
    var html=document.documentElement;
    if(html.getAttribute('data-theme')==='light'){html.removeAttribute('data-theme');toggle.textContent='\u2600'}
    else{html.setAttribute('data-theme','light');toggle.textContent='\uD83C\uDF19'}
  });
})();

// 3D tilt on project cards
document.querySelectorAll('[data-tilt]').forEach(function(card){
  card.addEventListener('mousemove',function(e){
    var r=card.getBoundingClientRect(),x=e.clientX-r.left,y=e.clientY-r.top;
    var cx=r.width/2,cy=r.height/2,dx=(x-cx)/cx,dy=(y-cy)/cy;
    card.style.transform='perspective(600px) rotateY('+(dx*6)+'deg) rotateX('+(-dy*6)+'deg) translateY(-6px)';
    card.style.boxShadow=(-dx*20)+'px '+(-dy*20)+'px 40px rgba(0,0,0,.4)';
  });
  card.addEventListener('mouseleave',function(){card.style.transform='';card.style.boxShadow=''});
});

// Canvas particles
(function(){
  var canvas=document.getElementById('particles-canvas');
  if(!canvas)return;
  var ctx=canvas.getContext('2d');
  var W,H,particles=[];
  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
  window.addEventListener('resize',resize);resize();
  function Particle(){this.reset()}
  Particle.prototype.reset=function(){this.x=Math.random()*W;this.y=Math.random()*H;this.vx=(Math.random()-.5)*.5;this.vy=(Math.random()-.5)*.5;this.r=Math.random()*2+1};
  Particle.prototype.update=function(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>W||this.y<0||this.y>H)this.reset()};
  Particle.prototype.draw=function(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle='rgba(0,240,255,.25)';ctx.fill()};
  for(var i=0;i<80;i++)particles.push(new Particle());
  var mouse={x:null,y:null};
  document.addEventListener('mousemove',function(e){mouse.x=e.clientX;mouse.y=e.clientY});
  document.addEventListener('mouseleave',function(){mouse.x=null;mouse.y=null});
  (function animP(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(function(p){p.update();p.draw()});
    for(var i=0;i<particles.length;i++){for(var j=i+1;j<particles.length;j++){var dx=particles[i].x-particles[j].x,dy=particles[i].y-particles[j].y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<120){ctx.beginPath();ctx.moveTo(particles[i].x,particles[i].y);ctx.lineTo(particles[j].x,particles[j].y);ctx.strokeStyle='rgba(0,240,255,'+(.12*(1-dist/120))+')';ctx.lineWidth=.5;ctx.stroke()}}}
    if(mouse.x!==null){particles.forEach(function(p){var dx=mouse.x-p.x,dy=mouse.y-p.y,dist=Math.sqrt(dx*dx+dy*dy);if(dist<150){ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(mouse.x,mouse.y);ctx.strokeStyle='rgba(0,240,255,'+(.08*(1-dist/150))+')';ctx.lineWidth=.5;ctx.stroke()}})}
    requestAnimationFrame(animP);
  })();
})();

// Confetti system
(function(){
  var cC=document.getElementById('confetti-canvas');
  if(!cC)return;
  var cCtx=cC.getContext('2d'),cW,cH,cPc=[];
  function cRs(){cW=cC.width=window.innerWidth;cH=cC.height=window.innerHeight}
  window.addEventListener('resize',cRs);cRs();
  window.fireC=function(){
    var cs=['#00f0ff','#00ff88','#ff00aa','#ffaa00','#8844ff','#fff'];
    for(var i=0;i<150;i++)cPc.push({x:cW/2+(Math.random()-.5)*300,y:cH/2-80,w:Math.random()*8+4,h:Math.random()*6+3,c:cs[Math.floor(Math.random()*cs.length)],vx:(Math.random()-.5)*14,vy:Math.random()*-16-4,r:Math.random()*360,rv:Math.random()*10-5,d:.95+Math.random()*.03,g:.12+Math.random()*.1,l:1});
    if(!cPc.length)return;
    !function a(){cCtx.clearRect(0,0,cW,cH);var n=0;cPc.forEach(function(p){p.x+=p.vx;p.vy+=p.g;p.vx*=p.d;p.vy*=p.d;p.r+=p.rv;p.l-=.005;if(p.l>0){n++;cCtx.save();cCtx.translate(p.x,p.y);cCtx.rotate(p.r*Math.PI/180);cCtx.globalAlpha=p.l;cCtx.fillStyle=p.c;cCtx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cCtx.restore()}});if(n)requestAnimationFrame(a);else{cPc=[];cCtx.clearRect(0,0,cW,cH)}}();
  };
})();

// Click explosion
document.addEventListener('click',function(e){
  for(var i=0;i<24;i++){
    var p=document.createElement('div'),s=Math.random()*4+2,a=Math.random()*Math.PI*2,d=Math.cos(a)*(Math.random()*100+40),dy=Math.sin(a)*(Math.random()*100+40);
    p.style.cssText='position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;width:'+s+'px;height:'+s+'px;border-radius:50%;background:'+['#00f0ff','#00ff88','#ff00aa','#fff'][Math.floor(Math.random()*4)]+';pointer-events:none;z-index:9999;transition:all .7s cubic-bezier(.2,0,.2,1);opacity:1';
    document.body.appendChild(p);
    requestAnimationFrame(function(){p.style.transform='translate('+d+'px,'+dy+'px) scale(0)';p.style.opacity='0'});
    setTimeout(function(){p.remove()},750);
  }
});

// Contact form with confetti
(function(){
  var form=document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit',function(e){
      e.preventDefault();var btn=document.getElementById('submit-text'),msg=document.getElementById('form-msg'),data=new FormData(this);
      if(btn)btn.textContent='Sending...';if(msg){msg.style.color='var(--text2)';msg.textContent=''}
      fetch('https://formspree.io/f/xjkyqyqg',{method:'POST',body:data,headers:{Accept:'application/json'}}).then(function(r){if(r.ok){if(btn)btn.textContent='✓ Sent!';if(msg){msg.textContent='✓ Thanks! I\'ll reply within 24 hours.';msg.style.color='var(--green)'}e.target.reset();if(window.fireC)window.fireC()}else throw Error()}).catch(function(){if(btn)btn.textContent='Send Message →';if(msg){msg.innerHTML='✗ Send failed. Email me directly: yemiadeyanju20@gmail.com';msg.style.color='var(--pink)'}});
      if(btn&&msg)setTimeout(function(){btn.textContent='Send Message →';msg.textContent=''},5000);
    });
  }
})();

// Back to top
(function(){
  var bt=document.getElementById('back-top');
  if(!bt)return;
  window.addEventListener('scroll',function(){bt.classList.toggle('show',window.scrollY>400)});
  bt.addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
})();

// Scramble text effect
(function(){
  var el=document.getElementById('scramble-name');
  if(!el)return;
  var chars='!@#$%^&*()_+-=[]{}|;:,.<>?/`~0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ',interval;
  el.addEventListener('mouseenter',function(){
    var original=this.textContent,runs=0;clearInterval(interval);
    interval=setInterval(function(){
      var r='';for(var i=0;i<original.length;i++){if(runs>10&&i<runs-10)r+=original[i];else if(Math.random()>.5&&runs<15)r+=chars[Math.floor(Math.random()*chars.length)];else r+=original[i]}
      el.textContent=r;runs++;if(runs>20){clearInterval(interval);el.textContent=original}
    },50);
  });
  el.addEventListener('mouseleave',function(){clearInterval(interval);el.textContent='Steve lee'});
})();

// Copy to clipboard
document.querySelectorAll('[data-copy]').forEach(function(el){
  el.addEventListener('click',function(e){
    var txt=this.dataset.copy;
    if(navigator.clipboard&&navigator.clipboard.writeText){e.preventDefault();navigator.clipboard.writeText(txt).then(function(){var t=document.getElementById('toast');if(t){t.textContent='✓ Copied: '+txt;t.classList.add('show');setTimeout(function(){t.classList.remove('show')},2000)}}).catch(function(){window.open(this.href,'_blank')})}
  });
});
