document.addEventListener("DOMContentLoaded", () => {
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
  terminal.appendChild(cursor);

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

      terminal.innerHTML = displayHTML;
      terminal.appendChild(cursor);
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
      terminal.innerHTML = `${baseContent}<br>cargando... ${percent}%`;
      terminal.appendChild(cursor);
      percent++;

      if (percent > 100) {
        clearInterval(progressInterval);
        terminal.style.display = "none";
        if (loading) loading.style.display = "none";
        mainUI.classList.remove("hidden");
        requestAnimationFrame(() => mainUI.classList.add("visible"));
      }
    }, PROGRESS_SPEED);
  }
  function toggleList(card) {
  const allCards = document.querySelectorAll(".card");
  allCards.forEach(c => {
    if (c !== card) c.classList.remove("active");
  });

  card.classList.toggle("active");
}
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
    "Revisión de tu dispositivo"
  ]
};

function toggleList(card) {
  const allCards = document.querySelectorAll(".card");
  const targetService = card.dataset.service;

  // Cierra las demás
  allCards.forEach(c => {
    if (c !== card) {
      c.classList.remove("active");
      const container = c.querySelector(".service-list");
      if (container) container.innerHTML = "";
    }
  });

  const isActive = card.classList.toggle("active");
  const container = card.querySelector(".service-list");

  if (!isActive || !container) {
    container.innerHTML = "";
    return;
  }

  container.innerHTML = ""; // limpia anterior

  const items = serviceData[targetService];
  let i = 0;

  function typeLine() {
    if (i >= items.length) return;
    const line = document.createElement("div");
    container.appendChild(line);
    let j = 0;
    const text = `> ${items[i]}`;

    function typeChar() {
      if (j <= text.length) {
        line.textContent = text.slice(0, j);
        j++;
        setTimeout(typeChar, 15); // velocidad por letra
      } else {
        i++;
        setTimeout(typeLine, 100); // tiempo entre líneas
      }
    }

    typeChar();
  }

  typeLine();
}



  type();
    // Asignar clic a todas las tarjetas después de que cargue la página
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => toggleList(card));
  });

document.querySelectorAll('[data-service]').forEach(card => {
  card.addEventListener('click', () => {
    const list = card.querySelector('.service-list');
    const isOpen = list.style.display === 'block';
    document.querySelectorAll('.service-list').forEach(el => el.style.display = 'none');
    if (!isOpen) {
      list.style.display = 'block';
    }
  });
});


