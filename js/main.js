/* ============================================================
   GLIDE — main.js
   Sem dependências. Funções:
   - Navbar: estado sólido ao rolar
   - Menu overlay fullscreen (abrir / fechar / acessibilidade)
   - Reveal de seções no scroll (IntersectionObserver) + stagger
   - Lightbox de galerias com navegação por setas + teclado
   - Filtros da galeria de projetos
   - Formulário de contato → mensagem no WhatsApp
   ============================================================ */
(function () {
  'use strict';

  /* --------------------------------------------------------
     0. Config — número de WhatsApp (substituir antes de publicar)
     -------------------------------------------------------- */
  // Trocar SEU_NUMERO_AQUI pelo número real, ex: 5562999999999
  // (somente dígitos, com DDI + DDD). Os links no HTML usam o
  // mesmo placeholder e podem ser substituídos por find & replace.

  /* --------------------------------------------------------
     1. NAVBAR — estado sólido
     -------------------------------------------------------- */
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    var solidAt = 60;
    var setNav = function () {
      if (window.scrollY > solidAt) navbar.classList.add('is-solid');
      else navbar.classList.remove('is-solid');
    };
    setNav();
    window.addEventListener('scroll', setNav, { passive: true });
  }

  /* --------------------------------------------------------
     2. MENU OVERLAY
     -------------------------------------------------------- */
  var menu = document.querySelector('.menu');
  var openBtn = document.querySelector('.nav-toggle');
  var closeBtn = document.querySelector('.menu__close');
  var lastFocus = null;

  function openMenu() {
    if (!menu) return;
    lastFocus = document.activeElement;
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    if (closeBtn) closeBtn.focus();
  }
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  if (openBtn) openBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  if (menu) {
    // fechar ao clicar num link
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* --------------------------------------------------------
     3. REVEAL no scroll
     -------------------------------------------------------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });

    revealEls.forEach(function (el) {
      // stagger automático para filhos de [data-stagger]
      io.observe(el);
    });

    // aplicar delays a grupos com data-stagger
    document.querySelectorAll('[data-stagger]').forEach(function (group) {
      var step = parseFloat(group.getAttribute('data-stagger')) || 0.1;
      var items = group.querySelectorAll('.reveal');
      items.forEach(function (item, i) {
        item.style.setProperty('--reveal-delay', (i * step) + 's');
      });
    });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* --------------------------------------------------------
     4. FILTROS DE GALERIA (projetos)
     -------------------------------------------------------- */
  var filterBtns = document.querySelectorAll('.filter-btn');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var f = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('is-active'); });
        btn.classList.add('is-active');
        document.querySelectorAll('.js-gallery .gallery-item').forEach(function (item) {
          var cat = item.getAttribute('data-category') || '';
          var show = (f === 'all' || cat === f);
          item.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* --------------------------------------------------------
     5. LIGHTBOX
     -------------------------------------------------------- */
  var galleries = document.querySelectorAll('.js-gallery');
  if (galleries.length) {
    // construir DOM do lightbox uma vez
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Galeria de imagens');
    lb.innerHTML =
      '<button class="lightbox__close" aria-label="Fechar">&times;</button>' +
      '<button class="lightbox__btn lightbox__prev" aria-label="Anterior">&#8249;</button>' +
      '<img class="lightbox__img" alt="">' +
      '<button class="lightbox__btn lightbox__next" aria-label="Próxima">&#8250;</button>' +
      '<div class="lightbox__counter"></div>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('.lightbox__img');
    var lbCounter = lb.querySelector('.lightbox__counter');
    var current = [];     // lista ativa de itens
    var idx = 0;

    function visibleItemsOf(gallery) {
      return Array.prototype.filter.call(
        gallery.querySelectorAll('.gallery-item'),
        function (it) { return !it.classList.contains('is-hidden'); }
      );
    }
    function srcOf(item) {
      var img = item.querySelector('img');
      return item.getAttribute('data-full') || (img ? img.getAttribute('src') : '');
    }
    function altOf(item) {
      var img = item.querySelector('img');
      return img ? (img.getAttribute('alt') || '') : '';
    }
    function show(i) {
      if (!current.length) return;
      idx = (i + current.length) % current.length;
      var item = current[idx];
      lbImg.setAttribute('src', srcOf(item));
      lbImg.setAttribute('alt', altOf(item));
      lbCounter.textContent = (idx + 1) + ' / ' + current.length;
    }
    function openLb(gallery, item) {
      current = visibleItemsOf(gallery);
      var start = current.indexOf(item);
      show(start < 0 ? 0 : start);
      lb.classList.add('is-open');
      document.body.classList.add('menu-open');
    }
    function closeLb() {
      lb.classList.remove('is-open');
      document.body.classList.remove('menu-open');
    }

    galleries.forEach(function (gallery) {
      gallery.addEventListener('click', function (e) {
        var item = e.target.closest('.gallery-item');
        if (!item || !gallery.contains(item)) return;
        e.preventDefault();
        openLb(gallery, item);
      });
    });

    lb.querySelector('.lightbox__close').addEventListener('click', closeLb);
    lb.querySelector('.lightbox__prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lightbox__next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) {
      if (e.target === lb) closeLb();
    });

    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLb();
      else if (e.key === 'ArrowLeft') show(idx - 1);
      else if (e.key === 'ArrowRight') show(idx + 1);
    });

    // swipe básico no mobile
    var touchX = null;
    lb.addEventListener('touchstart', function (e) { touchX = e.changedTouches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(dx > 0 ? idx - 1 : idx + 1);
      touchX = null;
    }, { passive: true });
  }

  /* --------------------------------------------------------
     6. ESC fecha o menu (global)
     -------------------------------------------------------- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu && menu.classList.contains('is-open')) closeMenu();
  });

  /* --------------------------------------------------------
     7. FORMULÁRIO DE CONTATO → WhatsApp
     -------------------------------------------------------- */
  var form = document.querySelector('.js-contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var nome = (data.get('nome') || '').toString().trim();
      var email = (data.get('email') || '').toString().trim();
      var tel = (data.get('telefone') || '').toString().trim();
      var tipo = (data.get('tipo') || '').toString().trim();
      var msg = (data.get('mensagem') || '').toString().trim();

      var linhas = [
        'Olá, Glide! Gostaria de falar sobre um projeto.',
        '',
        'Nome: ' + nome,
        'E-mail: ' + email,
        'Telefone: ' + tel,
        'Tipo de projeto: ' + tipo,
        '',
        'Mensagem:',
        msg
      ];
      var texto = encodeURIComponent(linhas.join('\n'));
      var numero = form.getAttribute('data-whatsapp') || 'SEU_NUMERO_AQUI';
      window.open('https://wa.me/' + numero + '?text=' + texto, '_blank');

      var note = form.querySelector('.form__feedback');
      if (note) note.hidden = false;
      form.reset();
    });
  }

  /* --------------------------------------------------------
     8. Ano atual no rodapé
     -------------------------------------------------------- */
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
