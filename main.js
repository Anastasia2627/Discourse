(function () {
  'use strict';

  var services = {
    strategy: {
      title: 'Стратегія',
      description: 'Досліджуємо контекст, аудиторію та конкурентне поле. Формуємо позиціонування й чіткий маркетинговий напрям, на який можна спиратися в рішеннях.'
    },
    identity: {
      title: 'Брендинг',
      description: 'Будуємо характер бренду: від ідеї та вербальної мови до впізнаваної візуальної системи, яка послідовно працює в кожній точці контакту.'
    },
    digital: {
      title: 'Digital',
      description: 'Поєднуємо сайт, комунікацію, рекламні канали й аналітику в цілісний досвід, а не набір розрізнених інструментів.'
    },
    creative: {
      title: 'Креатив',
      description: 'Шукаємо сміливі, але обґрунтовані рішення для кампаній, контенту та дизайну. Креатив має не лише привертати увагу, а й працювати на задачу.'
    },
    support: {
      title: 'Супровід',
      description: 'Допомагаємо довести рішення до реалізації: планування, запуск, координація та аналіз. Дивимося на роботу системно й коригуємо курс за результатами.'
    }
  };

  var modal = document.getElementById('service-dialog');
  var modalTitle = document.getElementById('service-title');
  var modalDescription = document.getElementById('service-description');

  document.querySelectorAll('[data-service]').forEach(function (card) {
    card.addEventListener('click', function () {
      var service = services[card.dataset.service];
      if (!service || !modal) return;
      modalTitle.textContent = service.title;
      modalDescription.textContent = service.description;
      if (typeof modal.showModal === 'function') modal.showModal();
    });
  });

  if (modal) {
    document.getElementById('close-service').addEventListener('click', function () { modal.close(); });
    document.getElementById('service-contact').addEventListener('click', function () { modal.close(); });
    modal.addEventListener('click', function (event) {
      if (event.target === modal) modal.close();
    });
  }

  var motionReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hero');
  var glass = document.getElementById('hero-glass');
  if (hero && glass && !motionReduced && window.matchMedia('(pointer:fine)').matches) {
    var frame = 0;
    var pos = null;
    hero.addEventListener('pointermove', function (event) {
      var rect = hero.getBoundingClientRect();
      pos = {
        x: ((event.clientX - rect.left) / rect.width - .5) * 2,
        y: ((event.clientY - rect.top) / rect.height - .5) * 2
      };
      if (!frame) {
        frame = requestAnimationFrame(function () {
          frame = 0;
          if (!pos) return;
          glass.style.setProperty('--panel-rotate-x', (-pos.y * 1.5).toFixed(2) + 'deg');
          glass.style.setProperty('--panel-rotate-y', (pos.x * 2).toFixed(2) + 'deg');
          hero.style.setProperty('--hero-shift-x', (pos.x * 14).toFixed(1) + 'px');
          hero.style.setProperty('--hero-shift-y', (pos.y * 10).toFixed(1) + 'px');
          hero.style.setProperty('--hero-shift-x2', (-pos.x * 13).toFixed(1) + 'px');
          hero.style.setProperty('--hero-shift-y2', (-pos.y * 8).toFixed(1) + 'px');
        });
      }
    }, { passive:true });
    hero.addEventListener('pointerleave', function () {
      pos = null;
      glass.style.setProperty('--panel-rotate-x', '0deg');
      glass.style.setProperty('--panel-rotate-y', '0deg');
      hero.style.setProperty('--hero-shift-x', '0px');
      hero.style.setProperty('--hero-shift-y', '0px');
      hero.style.setProperty('--hero-shift-x2', '0px');
      hero.style.setProperty('--hero-shift-y2', '0px');
    });
  }

  var brief = document.getElementById('brief-text');
  var copy = document.getElementById('copy-brief');
  var toast = document.getElementById('toast');
  var toastTimer = null;
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('is-visible'); }, 2600);
  }

  if (copy && brief) {
    copy.addEventListener('click', async function () {
      var message = brief.value.trim();
      if (!message) {
        brief.focus();
        showToast('Напишіть кілька слів про проєкт');
        return;
      }
      var output = 'Вітаю, DISCOURSE! Хочу обговорити проєкт.\n\n' + message;
      try {
        await navigator.clipboard.writeText(output);
        showToast('Запит скопійовано');
      } catch (error) {
        brief.focus();
        brief.select();
        showToast('Виділіть та скопіюйте текст');
      }
    });
  }

  var year = document.getElementById('copyright-year');
  if (year) year.textContent = new Date().getFullYear();
})();
