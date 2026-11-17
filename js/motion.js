(function(){
var d=document,H=d.documentElement,on=H.classList.contains('m-on'),w=window;
var fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
/* --top-h */
var top=d.getElementById('top-fixed');
function th(){H.style.setProperty('--top-h',top.offsetHeight+'px')}
th();if(w.ResizeObserver)new ResizeObserver(th).observe(top);
/* menu */
var nav=d.getElementById('menu'),bur=d.querySelector('.hd__burger');
function setNav(o){nav.classList.toggle('open',o);bur.setAttribute('aria-expanded',o?'true':'false')}
bur.addEventListener('click',function(){setNav(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setNav(false)});
d.addEventListener('keydown',function(e){if(e.key==='Escape')setNav(false)});
/* map on click */
d.querySelectorAll('[data-map]').forEach(function(b){b.addEventListener('click',function(){var m=b.closest('.map'),f=d.createElement('iframe');f.src=b.dataset.map;f.title='Карта: Аксай, ул. Мира, 1Б';f.loading='lazy';f.setAttribute('allowfullscreen','');m.innerHTML='';m.appendChild(f)})});
/* words */
d.querySelectorAll('[data-words]').forEach(function(el){var t=el.textContent.trim().replace(/\s+/g,' ');el.setAttribute('aria-label',t);var ws=t.split(' ');el.textContent='';
 ws.forEach(function(x,k){var o=d.createElement('span');o.className='w';o.setAttribute('aria-hidden','true');var i=d.createElement('span');i.className='wi';i.style.setProperty('--k',k);i.textContent=x;o.appendChild(i);el.appendChild(o);if(k<ws.length-1)el.appendChild(d.createTextNode(' '))})});
d.querySelectorAll('[data-rv-g]').forEach(function(g){g.querySelectorAll('[data-rv],[data-pin]').forEach(function(x,i){x.style.setProperty('--i',i%8)})});
var all=[].slice.call(d.querySelectorAll('[data-words],[data-rv],[data-pin],[data-line],.orn--about,.orn--rev'));
function show(el){el.classList.add('in')}
if(!on){all.forEach(show);H.classList.add('m-ready');return}
var hero=d.querySelector('.hero');
/* some sections: line first, row ~200ms later */
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;var el=e.target;io.unobserve(el);
 if(el.matches('.facts [data-rv]')){var l=el.querySelector('[data-line]');if(l)show(l);setTimeout(function(){show(el)},200)}else show(el)})},{rootMargin:'0px 0px -6% 0px',threshold:0.01});
all.forEach(function(el){if(!hero.contains(el)||el.closest('.facts'))io.observe(el)});
function sweep(){var vh=innerHeight;all.forEach(function(el){if(el.classList.contains('in')||(hero.contains(el)&&!el.closest('.facts')&&!intro.done))return;var r=el.getBoundingClientRect();if(r.top<vh&&r.bottom>-vh*6)show(el)})}
function intro(){intro.done=1;d.querySelectorAll('.hero [data-words]').forEach(show);
 setTimeout(function(){d.querySelectorAll('.hero [data-rv]:not(.facts [data-rv])').forEach(show)},250)}
setTimeout(intro,300);
H.classList.add('m-ready');
var st=0;addEventListener('scroll',function(){clearTimeout(st);st=setTimeout(sweep,120)},{passive:true});
addEventListener('load',sweep);addEventListener('hashchange',function(){setTimeout(sweep,60)});addEventListener('beforeprint',function(){all.forEach(show)});
setTimeout(sweep,500);
/* scroll-linked: glow paragraph, panel, lane (both ways) */
var g=d.querySelector('[data-glow]'),pn=d.querySelector('.panel'),gal=d.querySelector('.gal'),lane=d.querySelector('.gal__lane'),prog=d.querySelector('.gal__prog'),raf=0,laneOn=false,laneMax=0;
var mq=matchMedia('(min-width:900px)');
function laneSet(){laneOn=mq.matches;H.classList.toggle('lane-on',laneOn);
 if(laneOn){lane.style.transform='';var vw=lane.parentNode.getBoundingClientRect().width;laneMax=Math.max(0,lane.scrollWidth-vw+40);gal.style.height=(innerHeight-top.offsetHeight+laneMax)+'px';lane.querySelectorAll('[data-pin]').forEach(show)}
 else{gal.style.height='';lane.style.transform=''}tick()}
function tick(){raf=0;var vh=innerHeight;
 if(g){var r=g.getBoundingClientRect(),c=r.top+r.height/2,p=1-Math.min(1,Math.abs(c-vh*.5)/(vh*.5));g.style.opacity=(0.3+0.7*p).toFixed(3)}
 if(pn){var r2=pn.getBoundingClientRect(),s=(r2.top-vh*.4)/(vh*.6);s=Math.max(0,Math.min(1,s));pn.style.setProperty('--fx',(48*s).toFixed(1)+'px')}
 if(laneOn){var gr=gal.getBoundingClientRect(),tot=gal.offsetHeight-(vh-top.offsetHeight),p2=tot>0?Math.max(0,Math.min(1,(top.offsetHeight-gr.top)/tot)):0;lane.style.transform='translate3d('+(-laneMax*p2).toFixed(1)+'px,0,0)';prog.style.setProperty('--p',p2.toFixed(4))}}
addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick)},{passive:true});
var rz=0,lw=innerWidth;addEventListener('resize',function(){clearTimeout(rz);rz=setTimeout(function(){if(Math.abs(innerWidth-lw)>0||!fine){lw=innerWidth;laneSet()}},150)});
addEventListener('load',laneSet);laneSet();
/* cursor: spot + polaroid tilt */
if(fine){var sp=d.querySelector('.spot'),pol=d.querySelector('.tilt'),mx=0,my=0,q=0;
 addEventListener('pointermove',function(e){mx=e.clientX;my=e.clientY;if(!q)q=requestAnimationFrame(function(){q=0;sp.classList.add('on');sp.style.transform='translate('+mx+'px,'+my+'px)';
  var r=pol.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){var dx=(mx-(r.left+r.width/2))/innerWidth,dy=(my-(r.top+r.height/2))/innerHeight;pol.style.transform='perspective(900px) rotateY('+(dx*8).toFixed(2)+'deg) rotateX('+(-dy*8).toFixed(2)+'deg)'}})},{passive:true})}
})();
