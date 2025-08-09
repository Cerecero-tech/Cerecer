document.addEventListener("DOMContentLoaded", () => {
  // -----------------------
  // Terminal typing block (sin cambios funcionales)
  // -----------------------
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

  // -----------------------
  // Datos de servicios (edítalos según necesites)
  // -----------------------
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

  // -----------------------
  // Helpers para abrir/cerrar y escribir líneas con 'efecto terminal'
  // -----------------------
  function createOrGetListContainer(card) {
    let container = card.querySelector('.service-list');
    if (!container) {
      container = document.createElement('div');
      container.className = 'service-list';
      // si prefieres <ul> cambia aquí y adapta CSS
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
          cont.innerHTML = '';
          cont.style.display = 'none';
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

  // -----------------------
  // Attach listeners a tarjetas que tengan data-service="key"
  // -----------------------
  document.querySelectorAll('[data-service]').forEach(card => {
    // safety: skip if no dataset value or no matching data
    const key = (card.dataset.service || "").trim().toLowerCase();
    if (!key || !serviceData[key]) {
      // no hay datos, no asignamos comportamiento
      return;
    }

    card.addEventListener('click', (ev) => {
      // evita que clicks en links internos (p.ej WhatsApp) activen el toggle
      const tag = ev.target.tagName.toLowerCase();
      if (tag === 'a' || ev.target.closest && ev.target.closest('a')) return;

      closeAllExcept(card);

      const container = createOrGetListContainer(card);
      const isActive = card.classList.toggle('active');

      if (!isActive) {
        container.innerHTML = '';
        container.style.display = 'none';
        return;
      }

      container.style.display = 'block';
      // animación tipo terminal
      typeLinesInContainer(container, serviceData[key]);
    });
  });

  // -----------------------
  // start the terminal typing
  // -----------------------
  type();

  // -----------------------
  // menu-toggle: solo si existe
  // -----------------------
  const menuToggle = document.getElementById('menu-toggle');
  if (menuToggle) {
    menuToggle.addEventListener('click', () => {
      const menu = document.getElementById('menu');
      if (menu) menu.classList.toggle('hidden');
    });
  }
}); // DOMContentLoaded end
