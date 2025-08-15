document.addEventListener("DOMContentLoaded", () => {
  // Terminal typing (igual a tu implementación)
  const terminal = document.getElementById("terminal");
  const mainUI   = document.getElementById("main-ui");
  const loading  = document.getElementById("loading-screen");

  const fullText = `Terminal Cerecer
Copyright (C) Corporación Cerecer | Todos los derechos reservados

¡No olvides contactarnos por cualquier error que encuentres en la página!

PS D:\\Usuarios\\invitado> iniciarcerecer.ht`;

  const TYPE_SPEED = 35;
  const PROGRESS_SPEED = 10;
  const HIGHLIGHT = "iniciarcerecer.ht";

  let displayHTML = "";
  let idx = 0;

  const cursor = document.createElement("span");
  cursor.className = "cursor";
  cursor.textContent = "█";
  if (terminal) terminal.appendChild(cursor);

  setInterval(() => {
    cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
  }, 500);

  function type() {
    if (idx < fullText.length) {
      let char = fullText[idx];
      if (char === "\n") {
        displayHTML += "<br>";
      } else {
        if (
          idx >= fullText.indexOf(HIGHLIGHT) &&
          idx < fullText.indexOf(HIGHLIGHT) + HIGHLIGHT.length
        ) {
          displayHTML += `<span class="command">${char}</span>`;
        } else {
          displayHTML += char;
        }
      }
      if (terminal) terminal.innerHTML = displayHTML;
      if (terminal) terminal.appendChild(cursor);
      idx++;
      setTimeout(type, TYPE_SPEED);
    } else {
      startProgress();
    }
  }

  function startProgress() {
    let percent = 1;
    const baseContent = displayHTML;

    const progressInterval = setInterval(() => {
      if (terminal) terminal.innerHTML = `${baseContent}<br>cargando... ${percent}%`;
      if (terminal) terminal.appendChild(cursor);
      percent++;

      if (percent > 100) {
        clearInterval(progressInterval);
        if (terminal) terminal.style.display = "none";
        if (loading) loading.style.display = "none";
        if (mainUI) {
          mainUI.classList.remove("hidden");
          requestAnimationFrame(() => mainUI.classList.add("visible"));
        }
      }
    }, PROGRESS_SPEED);
  }

  // Datos de servicios (manténlos sincronizados con data-service)
  const serviceData = {
    mantenimiento: [
      "Instalación/Activación de Windows",
      "Limpieza profunda",
      "Cambio de pasta térmica"
    ],
    mejora: [
      "Mejora de RAM",
      "Mejora de Almacenamiento",
      "Cambio de componentes"
    ],
    diagnostico: [
      "Detección de fallos",
      "Pruebas de hardware",
      "Asesoría técnica"
    ]
  };

  // Helpers
  function createOrGetListContainer(card) {
    let container = card.querySelector('.service-list');
    if (!container) {
      container = document.createElement('div');
      container.className = 'service-list';
      container.style.display = 'none';
      card.appendChild(container);
    }
    return container;
  }

  function closeAllExcept(openCard) {
    document.querySelectorAll('[data-service]').forEach(c => {
      if (c !== openCard) {
        c.classList.remove('active');
        const cont = c.querySelector('.service-list');
        if (cont) {
          cont.classList.remove('visible');
          setTimeout(()=> { cont.style.display = 'none'; cont.innerHTML = ''; }, 220);
        }
      }
    });
  }

  function typeLinesInContainer(container, items) {
    container.innerHTML = '';
    let i = 0;

    function typeLine() {
      if (i >= items.length) return;
      const line = document.createElement('div');
      container.appendChild(line);
      let j = 0;
      const text = `> ${items[i]}`;

      function typeChar() {
        if (j <= text.length) {
          line.textContent = text.slice(0, j);
          j++;
          setTimeout(typeChar, 15);
        } else {
          i++;
          setTimeout(typeLine, 120);
        }
      }
      typeChar();
    }
    typeLine();
  }

  // Attach listeners a tarjetas
  document.querySelectorAll('[data-service]').forEach(card => {
    const key = (card.dataset.service || "").trim().toLowerCase();
    if (!key || !serviceData[key]) return; // si no hay key o datos, skip

    card.addEventListener('click', (ev) => {
      // no toggles si se hace click en un link
      if (ev.target.tagName.toLowerCase() === 'a' || ev.target.closest('a')) return;

      closeAllExcept(card);

      const container = createOrGetListContainer(card);
      const isActive = card.classList.toggle('active');

      if (!isActive) {
        // hiding
        container.classList.remove('visible');
        setTimeout(()=> { container.style.display = 'none'; container.innerHTML = ''; }, 220);
        return;
      }

      // showing
      container.style.display = 'block';
      // small timeout so transition (opacity) can animate
      setTimeout(() => container.classList.add('visible'), 20);

      // escribe las líneas con efecto terminal
      typeLinesInContainer(container, serviceData[key]);
    });
  });

  // start terminal animation
  type();

  // optional menu toggle (si existe)
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
});

// ---------- GALERÍA: desplazamiento por píxeles, alineado en móvil ----------
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.querySelector('.qs-carousel');
  if (!carousel) return;

  const viewport = carousel.querySelector('.qs-viewport');
  const track    = carousel.querySelector('.qs-track');
  const slides   = Array.from(track.querySelectorAll('.qs-slide'));
  const prevBtn  = carousel.querySelector('.qs-prev');
  const nextBtn  = carousel.querySelector('.qs-next');
  const thumbs   = Array.from(document.querySelectorAll('.qs-thumb'));

  if (!viewport || !track || slides.length === 0) return;

  let idx = 0;
  let slideW = 0;

  function measure() {
    // Ancho exacto visible del carrusel
    slideW = viewport.getBoundingClientRect().width;
  }

  function update(animate = true) {
    if (!animate) track.style.transition = 'none';
    track.style.transform = `translateX(${-idx * slideW}px)`;
    if (!animate) {
      // re-enable transition sin parpadeo
      void track.offsetHeight;
      track.style.transition = '';
    }
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
    thumbs.forEach((t, i) => t.setAttribute('aria-selected', i === idx ? 'true' : 'false'));
  }

  function goTo(i) {
    if (i < 0) i = slides.length - 1;
    if (i >= slides.length) i = 0;
    idx = i;
    update(true);
  }

  // Controles
  prevBtn?.addEventListener('click', () => goTo(idx - 1));
  nextBtn?.addEventListener('click', () => goTo(idx + 1));
  thumbs.forEach(t => t.addEventListener('click', () => {
    const i = Number(t.dataset.index);
    if (!isNaN(i)) goTo(i);
  }));

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(idx - 1);
    if (e.key === 'ArrowRight') goTo(idx + 1);
  });

  // Recalcular en resize/orientation change y corregir posición sin animación
  const onResize = () => { measure(); update(false); };
  window.addEventListener('resize', onResize);
  window.addEventListener('orientationchange', onResize);

  // Init
  measure();
  update(false);
});
