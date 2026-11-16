(function(){
 "use strict";
 const projectList=window.DISCOURSE_CASES||[];
 const bySlug=Object.fromEntries(projectList.map(x=>[x.slug,x]));
 const assetBase=document.body.classList.contains("case-document")?"../public/assets/":"./public/assets/";
 const folder=document.body.classList.contains("case-document")?"":"cases/";
 function esc(value){return String(value).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));}
 function artwork(c){
   const tiny=c.slug==="merkushyna"?"RACE / PERSON":c.slug==="evolving-prowess"?"SIZE EVOLUTION":c.slug==="yurchak"?"THE FIT":c.slug==="face-atelier"?"SKIN SESSION":c.slug==="bezpeka-shop"?"CONTROL":c.slug==="cleaning-crm"?"FOR CLEANERS":"DESIGN SYSTEM";
   return '<div class="portfolio-art portfolio-art--'+esc(c.skin)+'" aria-hidden="true">'+
      '<span class="portfolio-art__orb"></span><span class="portfolio-art__head">'+esc(c.title.toUpperCase())+'</span><span class="portfolio-art__stripe"></span>'+
      '<span class="portfolio-art__phone portfolio-art__phone--left"><span class="portfolio-art__phone-inner"><span class="portfolio-art__mark">'+esc(tiny)+'</span><span class="portfolio-art__micro">'+esc(c.fragments[0][1])+'</span><span class="portfolio-art__line"></span><span class="portfolio-art__line portfolio-art__line--short"></span></span></span>'+
      '<span class="portfolio-art__phone portfolio-art__phone--right"><span class="portfolio-art__phone-inner"><span class="portfolio-art__mark">'+esc(c.fragments[1][0])+'</span><span class="portfolio-art__micro">'+esc(c.fragments[2][1])+'</span><span class="portfolio-art__line"></span><span class="portfolio-art__line portfolio-art__line--short"></span></span></span>'+
      '<span class="portfolio-art__mini">'+esc(c.kicker.toUpperCase())+'</span></div>';
 }
 function portfolioCard(c){
   return '<a class="portfolio-card" href="'+folder+esc(c.slug)+'.html" aria-label="Переглянути кейс '+esc(c.title)+'">'+
    '<div class="portfolio-card__media">'+artwork(c)+'</div><div class="portfolio-card__bottom"><div><span class="portfolio-card__eyebrow">'+esc(c.kicker)+' · '+esc(c.market)+'</span>'+
    '<h3>'+esc(c.title)+'</h3><p>'+esc(c.lead)+'</p></div><span class="portfolio-card__arrow" aria-hidden="true">↗</span></div></a>';
 }
 document.querySelectorAll('[data-work-list]').forEach(root=>{
   const limit=Number(root.dataset.limit)||projectList.length;
   root.innerHTML=projectList.slice(0,limit).map(portfolioCard).join("");
 });
 const page=document.getElementById("case-root");
 if(!page) return;
 const current=bySlug[document.body.dataset.case];
 if(!current){page.innerHTML='<p class="wide">Кейс не знайдено. <a href="index.html">Переглянути всі проєкти</a></p>';return;}
 document.title=current.title+" — Кейс / DISCOURSE";
 const next=projectList[(projectList.findIndex(x=>x.slug===current.slug)+1)%projectList.length];
 document.body.classList.add("case-page");
 document.body.dataset.skin=current.skin;
 const metrics=current.stats.map(s=>'<article><strong>'+esc(s.big)+'</strong><span>'+esc(s.label)+'</span><small>'+esc(s.detail)+'</small></article>').join('');
 const phases=current.phases.map(p=>'<div class="case-process__row" data-motion><span class="case-process__number">'+esc(p[0])+'</span><h3>'+esc(p[1])+'</h3><p>'+esc(p[2])+'</p></div>').join('');
 const fragments=current.fragments.map((f,i)=>'<article class="case-fragment" data-motion><span class="case-fragment__index">0'+(i+1)+' / '+esc(f[0])+'</span><div class="case-fragment__visual"><span>'+esc(f[0])+'</span></div><div><h3>'+esc(f[1])+'</h3><p>'+esc(f[2])+'</p></div></article>').join('');
 const comparison=current.bar?'<section class="case-section case-chart"><div class="wide"><span class="case-section__eyebrow">ДИНАМІКА / '+esc(current.duration)+'</span><h2>'+esc(current.bar.title)+'</h2><div class="case-chart__frame">'+
  '<div class="case-chart__row"><span>До</span><span>'+esc(current.bar.before)+'</span></div><div class="case-chart__bar"><span style="--bar-width:'+Math.round(current.bar.beforeNum/current.bar.afterNum*100)+'%"></span></div>'+
  '<div class="case-chart__row"><span>Після</span><span>'+esc(current.bar.after)+'</span></div><div class="case-chart__bar"><span style="--bar-width:100%"></span></div></div></div></section>':'';
 page.innerHTML=
  '<section class="case-hero"><div class="wide case-hero__grid"><div data-motion>'+
  '<span class="case-eyebrow">DISCOURSE / КЕЙС / '+esc(current.kicker)+'</span><h1>'+esc(current.title)+'</h1><p class="case-hero__lead">'+esc(current.lead)+'</p>'+
  '<div class="case-meta"><span>'+esc(current.market)+'</span><span>'+esc(current.duration)+'</span></div></div>'+
  '<div class="case-hero__media" data-motion>'+artwork(current)+'</div></div></section>'+
  '<div class="wide case-ticker"><span>СТРАТЕГІЯ / ДИЗАЙН / РЕАЛІЗАЦІЯ</span><span>'+esc(current.title)+'</span></div>'+
  '<section class="case-section case-context"><div class="wide"><span class="case-section__eyebrow">01 / СИТУАЦІЯ</span><h2>'+esc(current.about)+'</h2>'+
  '<div class="case-context__grid"><div data-motion><h3>ЗАДАЧА</h3><p>'+esc(current.challenge)+'</p></div><div data-motion><h3>НАШ ПІДХІД</h3><p>'+esc(current.answer)+'</p></div></div></div></section>'+
  '<section class="case-section case-impact"><div class="wide"><span class="case-section__eyebrow">02 / ЩО МОЖНА ПОКАЗАТИ</span>'+
  '<h2>'+((current.slug==="merkushyna"||current.slug==="evolving-prowess")?'Результати, які можна перевірити.':'Робота в конкретних форматах.')+'</h2>'+
  '<div class="case-metrics" data-motion>'+metrics+'</div></div></section>'+
  '<section class="case-section case-process"><div class="wide"><span class="case-section__eyebrow">03 / РІШЕННЯ</span><h2>Від задачі<br>до реалізації.</h2>'+phases+'</div></section>'+
  '<section class="case-section case-gallery"><div class="wide"><span class="case-section__eyebrow">04 / ВІЗУАЛЬНА СИСТЕМА</span>'+
  '<div class="case-gallery__heading"><h2>Контент має<br>свій характер.</h2><p>Типографічні композиції, створені для цієї сторінки на основі тем та стилістики наданих проєктних матеріалів.</p></div>'+
  '<div class="case-fragments">'+fragments+'</div><p class="case-note">'+esc(current.note)+'</p></div></section>'+comparison+
  '<section class="case-next"><div class="wide case-next__inner"><div><span class="case-section__eyebrow">НАСТУПНИЙ ПРОЄКТ</span><h2>'+esc(next.title)+'</h2><a href="'+esc(next.slug)+'.html">Переглянути кейс <span aria-hidden="true">↗</span></a></div>'+
  '<a href="index.html" style="background:#eef3ff;color:#1741d8">Усі кейси <span aria-hidden="true">↗</span></a></div></section>';
 document.dispatchEvent(new Event("discourse:content-ready"));
})();
