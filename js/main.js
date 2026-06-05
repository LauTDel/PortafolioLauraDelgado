/* ============================================================
   PORTAFOLIO LAURA DELGADO — main.js
   Funcionalidades: carruseles, nav activo, formulario
   ============================================================ */

'use strict';

/* ── Utilidad: esperar DOM ── */
document.addEventListener('DOMContentLoaded', () => {

  /* ========================================================
     1. MARCAR PESTAÑA ACTIVA EN EL MENÚ
     Detecta la página actual y añade clase "active" al link
     correspondiente.
  ======================================================== */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-tab').forEach(link => {
    const href = link.getAttribute('href').split('/').pop();
    if (href === currentPage) {
      link.classList.add('active');
    }
  });

  /* ========================================================
     2. CARRUSELES DE PROYECTOS
     Cada carrusel es independiente; se identifica por su
     data-carousel="id" en el contenedor.
  ======================================================== */
  const carousels = document.querySelectorAll('[data-carousel]');

  carousels.forEach(carouselEl => {
    const id = carouselEl.dataset.carousel;
    const track = carouselEl.querySelector('.carousel-track');
    const cards = carouselEl.querySelectorAll('.proj-card');
    const btnPrev = carouselEl.querySelector('.btn-prev');
    const btnNext = carouselEl.querySelector('.btn-next');
    const dotsWrap = carouselEl.querySelector('.carousel-dots');

    if (!track || cards.length === 0) return;

    let current = 0;
    const total = cards.length;

    /* Crear puntos indicadores */
    cards.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Ir a imagen ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      if (dotsWrap) dotsWrap.appendChild(dot);
    });

    function goTo(index) {
      current = (index + total) % total;
      track.style.transform = `translateX(${-current * 100}%)`;

      /* Actualizar dots */
      if (dotsWrap) {
        dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    }

    if (btnPrev) btnPrev.addEventListener('click', () => goTo(current - 1));
    if (btnNext) btnNext.addEventListener('click', () => goTo(current + 1));

    /* Soporte swipe en móvil */
    let startX = 0;
    track.addEventListener('touchstart', e => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    track.addEventListener('touchend', e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) {
        diff > 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });
  });

  /* ========================================================
     3. FORMULARIO DE CONTACTO — validación simple
  ======================================================== */
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();

      const nombre = form.querySelector('#nombre').value.trim();
      const correo = form.querySelector('#correo').value.trim();
      const mensaje = form.querySelector('#mensaje').value.trim();

      /* Validación básica */
      if (!nombre || !correo || !mensaje) {
        showFormMsg('Por favor completa todos los campos.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
        showFormMsg('Ingresa un correo electrónico válido.', 'error');
        return;
      }

      /* Éxito (demo — aquí conectarías tu backend o EmailJS) */
      showFormMsg('¡Mensaje enviado! Me pondré en contacto pronto 🙂', 'success');
      form.reset();
    });
  }

  function showFormMsg(text, type) {
    let msg = document.getElementById('form-msg');
    if (!msg) {
      msg = document.createElement('p');
      msg.id = 'form-msg';
      msg.style.cssText =
        'margin-top:10px;font-size:.88rem;font-family:var(--font-body);' +
        'text-align:center;padding:6px 10px;border-radius:6px;';
      document.getElementById('contact-form').appendChild(msg);
    }
    msg.textContent = text;
    msg.style.background = type === 'error'
      ? 'rgba(180,60,60,.15)'
      : 'rgba(60,140,80,.18)';
    msg.style.color = type === 'error' ? '#8b2020' : '#1a5c30';
  }

  const modal = document.getElementById("videoModal");
  const modalVideo = document.getElementById("modalVideo");
  const closeBtn = document.querySelector(".close");

  // abrir modal
  document.querySelectorAll(".proj-card img").forEach(img => {
    img.addEventListener("click", () => {

      const videoSrc = img.getAttribute("data-video");
      if (!videoSrc) return;

      modal.classList.add("show");
      modalVideo.src = videoSrc;
      modalVideo.currentTime = 0;
      modalVideo.play();
    });
  });

  // cerrar modal
  function cerrar() {
    modal.classList.remove("show");
    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";
  }

  closeBtn.addEventListener("click", cerrar);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) cerrar();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") cerrar();
  });

});
