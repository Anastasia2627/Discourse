(function(){
 "use strict";
 const projectList=window.DISCOURSE_CASES||[];
 const bySlug=Object.fromEntries(projectList.map(x=>[x.slug,x]));
 const assetBase=document.body.classList.contains("case-document")?"../public/assets/":"./public/assets/";
 const folder=document.body.classList.contains("case-document")?"":"cases/";
 function esc(value){return String(value).replace(/[&<>"']/g,s=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[s]));}
 function artwork(c){
  const skin=esc(c.skin),title=esc(c.title.toUpperCase());
  const open='<div class="portfolio-art portfolio-art--'+skin+' bespoke-art bespoke-art--'+skin+'" aria-hidden="true">';
  const end='</div>';
  if(c.skin==="sport")return open+
    '<span class="bespoke-art__grid"></span><span class="bespoke-art__small">PERSONAL BRAND / SPORT</span>'+
    '<strong class="sport-art__headline">MER<br>KUSHY<br>NA</strong>'+
    '<span class="sport-art__track sport-art__track--one"></span><span class="sport-art__track sport-art__track--two"></span>'+
    '<div class="sport-art__athlete"><span></span></div>'+
    '<div class="sport-art__metric"><strong>+74%</strong><small>АУДИТОРІЯ</small></div>'+end;
  if(c.skin==="active")return open+
    '<span class="bespoke-art__small">ACTIVEWEAR / CANADA</span>'+
    '<div class="active-art__poster"><span>SIZE</span><strong>EVOLUTION</strong><em>activewear that evolves with you</em>'+
    '<div class="active-art__sizes"><span>60</span><span>80</span><span>100</span></div></div>'+
    '<div class="active-art__secondary">not a size.<br><strong>a journey.</strong></div>'+end;
  if(c.skin==="fashion")return open+
    '<span class="bespoke-art__small">YURCHAK / E-COMMERCE</span><div class="fashion-art__window">'+
    '<span class="fashion-art__brand">YURCHAK</span><span class="fashion-art__menu">SHOP&nbsp;&nbsp;&nbsp; STORY&nbsp;&nbsp;&nbsp; FIT</span>'+
    '<div class="fashion-art__products"><span>01 / NEW EDIT</span><span>02 / MOVEMENT</span><span>03 / THE FIT</span></div>'+
    '<span class="fashion-art__bottom">DESIGNED TO MOVE</span></div><div class="fashion-art__label">CIRCLE<br><b>Bestie / Muse / Icon</b></div>'+end;
  if(c.skin==="beauty")return open+
    '<span class="bespoke-art__small">FACE ATELIER / BARCELONA</span><div class="beauty-art__tiles">'+
    '<div class="beauty-art__tile beauty-art__tile--a"><em>FA</em><small>Atelier</small></div>'+
    '<div class="beauty-art__tile beauty-art__tile--b"><b>CARE<br>COLLECTION</b><span>01 / SKIN</span></div>'+
    '<div class="beauty-art__tile beauty-art__tile--c"><b>WONDER<br>FACE</b><span>02 / EXPERIENCE</span></div>'+
    '<div class="beauty-art__tile beauty-art__tile--d"><em>BCN</em><span>BEAUTY SPACE</span></div></div>'+end;
  if(c.skin==="security")return open+
    '<span class="bespoke-art__small">BEZPEKA SHOP / SECURITY</span><span class="security-art__headline">ПІД<br>КОНТРОЛЕМ.</span>'+
    '<div class="security-art__device"><div class="security-art__lens"><span></span></div></div>'+
    '<span class="security-art__guide">01 / VIDEO&nbsp;&nbsp; 02 / ACCESS&nbsp;&nbsp; 03 / ALARM</span>'+end;
  if(c.skin==="crm")return open+
    '<span class="bespoke-art__small">B2B / CLEANING SYSTEM</span><div class="crm-art__dashboard">'+
    '<div class="crm-art__top"><span>CLEANERS</span><strong>CRM</strong></div><div class="crm-art__columns"><div><strong>BOOKINGS</strong><span></span><span></span><span></span></div><div><strong>WORKFLOW</strong><span></span><span></span><span></span></div></div>'+
    '<div class="crm-art__foot">ONE SYSTEM. LESS CHAOS.</div></div><span class="crm-art__floating">GROWTH<br>NEEDS<br><b>STRUCTURE</b></span>'+end;
  return open+
    '<span class="bespoke-art__small">DIGITAL / EDITORIAL DESIGN</span><div class="materials-art__sheet materials-art__sheet--a"><b>AUDIT</b><span>PROFILE / ANALYSIS</span></div>'+
    '<div class="materials-art__sheet materials-art__sheet--b"><b>WORKBOOK</b><span>SALES / FRAMEWORK</span></div>'+
    '<div class="materials-art__sheet materials-art__sheet--c"><b>DECK</b><span>STRATEGY / PRESENTATION</span></div>'+end;
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
  '<h2>'+((current.slug==="merkushyna"||current.slug==="evolving-prowess")?'Проєкт у цифрах.':'Що увійшло в роботу.')+'</h2>'+
  '<div class="case-metrics" data-motion>'+metrics+'</div></div></section>'+
  '<section class="case-section case-process"><div class="wide"><span class="case-section__eyebrow">03 / РІШЕННЯ</span><h2>Від задачі<br>до реалізації.</h2>'+phases+'</div></section>'+
  '<section class="case-section case-gallery"><div class="wide"><span class="case-section__eyebrow">04 / ВІЗУАЛЬНА СИСТЕМА</span>'+
  '<div class="case-gallery__heading"><h2>Контент має<br>свій характер.</h2><p>Приклади тем, форматів і візуальних рішень, на яких тримається комунікація.</p></div>'+
  '<div class="case-fragments">'+fragments+'</div></div></section>'+comparison+
  '<section class="case-next"><div class="wide case-next__inner"><div><span class="case-section__eyebrow">НАСТУПНИЙ ПРОЄКТ</span><h2>'+esc(next.title)+'</h2><a href="'+esc(next.slug)+'.html">Переглянути кейс <span aria-hidden="true">↗</span></a></div>'+
  '<a href="index.html" style="background:#eef3ff;color:#1741d8">Усі кейси <span aria-hidden="true">↗</span></a></div></section>';
 document.dispatchEvent(new Event("discourse:content-ready"));
})();
