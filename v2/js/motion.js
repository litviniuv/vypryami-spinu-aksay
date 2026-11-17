(function(){
var d=document,H=d.documentElement,on=H.classList.contains('m-on'),w=window;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
var top=d.getElementById('top-fixed');
function th(){H.style.setProperty('--top-h',top.offsetHeight+'px')}
th();if(w.ResizeObserver)new ResizeObserver(th).observe(top);
var nav=d.getElementById('menu'),bur=d.querySelector('.hd__burger');
function setNav(o){nav.classList.toggle('open',o);bur.setAttribute('aria-expanded',o?'true':'false')}
bur.addEventListener('click',function(){setNav(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setNav(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape')setNav(false)});
d.querySelectorAll('[data-map]').forEach(function(b){b.addEventListener('click',function(){var m=b.closest('.map'),f=d.createElement('iframe');f.src=b.dataset.map;f.title='Карта: Аксай, ул. Мира, 1Б';f.loading='lazy';f.setAttribute('allowfullscreen','');m.innerHTML='';m.appendChild(f)})});
d.querySelectorAll('[data-words]').forEach(function(el){var t=el.textContent.trim().replace(/\s+/g,' ');el.setAttribute('aria-label',t);var ws=t.split(' ');el.textContent='';
 ws.forEach(function(x,k){var o=d.createElement('span');o.className='w';o.setAttribute('aria-hidden','true');var i=d.createElement('span');i.className='wi';i.style.setProperty('--k',k);i.textContent=x;o.appendChild(i);el.appendChild(o);if(k<ws.length-1)el.appendChild(d.createTextNode(' '))})});
d.querySelectorAll('[data-rv-g]').forEach(function(g){g.querySelectorAll('[data-rv],[data-cur]').forEach(function(x,i){x.style.setProperty('--i',i%6)})});
/* captions assemble from marks: real text stays, noise twin aria-hidden */
if(on){var NZ='+×/·|#=:';d.querySelectorAll('[data-mk]').forEach(function(m){var t=m.textContent;m.textContent='';var a=d.createElement('span');a.className='mk__t';a.textContent=t;var n=d.createElement('span');n.className='mk__n';n.setAttribute('aria-hidden','true');n.textContent=t.replace(/\S/g,function(){return NZ[Math.random()*NZ.length|0]});m.appendChild(a);m.appendChild(n);m._n=n;m._t=t})}
var all=[].slice.call(d.querySelectorAll('[data-words],[data-rv],[data-line],[data-cur],[data-mk]'));
function show(el){if(el.classList.contains('in'))return;el.classList.add('in');
 if(el._n){var n=el._n,t=el._t,s=0;var iv=setInterval(function(){s++;n.textContent=t.split('').map(function(c,i){return i<s*2||c===' '?c:'+×/·|#=:'[Math.random()*8|0]}).join('');if(s*2>=t.length)clearInterval(iv)},40)}
 if(el.hasAttribute('data-cur')){var f=function(e){if(e.target!==el)return;el.classList.add('done');el.removeEventListener('transitionend',f)};el.addEventListener('transitionend',f);setTimeout(function(){el.classList.add('done')},2200)}}
if(!on){all.forEach(show);H.classList.add('m-ready');return}
var hero=d.querySelector('.hero');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
 if(el.matches('.cell[data-rv]')){var l=el.querySelector('[data-line]');if(l)show(l);setTimeout(function(){show(el)},200)}else show(el)})},{rootMargin:'0px 0px -6% 0px',threshold:0.01});
all.forEach(function(el){if(!hero.contains(el))io.observe(el)});
function sweep(){var vh=innerHeight;all.forEach(function(el){if(el.classList.contains('in')||(hero.contains(el)&&!intro.done))return;var r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>-vh*6)show(el)})}
function intro(){intro.done=1;hero.querySelectorAll('[data-words],[data-mk]').forEach(show)}
setTimeout(intro,300);
H.classList.add('m-ready');
var st=0;addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(sweep,120)},{passive:true});
addEventListener('load',sweep);addEventListener('hashchange',function(){setTimeout(sweep,60)});addEventListener('beforeprint',function(){all.forEach(function(e){show(e);e.classList.add('done')})});
setTimeout(sweep,500);
/* scroll-linked: glow, panel, reviews lane */
var g=d.querySelector('[data-glow]'),pn=d.querySelector('.panel'),rev=d.querySelector('.rev'),lane=d.querySelector('.rev__lane'),prog=d.querySelector('.rev__prog'),raf=0,laneOn=false,laneMax=0;
var mq=matchMedia('(min-width:900px)');
function laneSet(){laneOn=mq.matches;H.classList.toggle('lane-on',laneOn);lane.style.transform='';
 if(laneOn){laneMax=Math.max(0,lane.scrollWidth-innerWidth);var cap=Math.round(1.3*innerHeight);if(laneMax>cap)laneMax=cap;rev.style.height=(innerHeight-top.offsetHeight+laneMax)+'px';}
 else rev.style.height='';tick()}
function laneDist(){return Math.max(0,lane.scrollWidth-innerWidth)}
function tick(){raf=0;var vh=innerHeight;
 if(g){var r=g.getBoundingClientRect(),c=r.top+r.height/2,p=1-Math.min(1,Math.abs(c-vh*.5)/(vh*.5));g.style.opacity=(0.3+0.7*p).toFixed(3)}
 if(pn){var r2=pn.getBoundingClientRect(),s=(r2.top-vh*.4)/(vh*.6);s=Math.max(0,Math.min(1,s));pn.style.setProperty('--fx',(48*s).toFixed(1)+'px')}
 if(laneOn){var gr=rev.getBoundingClientRect(),tot=rev.offsetHeight-(vh-top.offsetHeight),p2=tot>0?Math.max(0,Math.min(1,(top.offsetHeight-gr.top)/tot)):0;lane.style.transform='translate3d('+(-laneDist()*p2).toFixed(1)+'px,0,0)';prog.style.setProperty('--p',p2.toFixed(4))}}
addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick)},{passive:true});
var rz=0,lw=innerWidth;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(innerWidth!==lw||!fine){lw=innerWidth;laneSet()}},150)});
addEventListener('load',laneSet);laneSet();
if(fine){var sp=d.querySelector('.spot'),wk=d.querySelector('.turn'),mx=0,my=0,q=0;
 addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!q)q=requestAnimationFrame(function(){q=0;sp.classList.add('on');sp.style.transform='translate('+mx+'px,'+my+'px)';
  var r=wk.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){var dx=(mx-(r.left+r.width/2))/innerWidth,dy=(my-(r.top+r.height/2))/innerHeight;wk.style.transform='perspective(900px) rotateY('+(dx*7).toFixed(2)+'deg) rotateX('+(-dy*7).toFixed(2)+'deg)'}})},{passive:true})}
})();
