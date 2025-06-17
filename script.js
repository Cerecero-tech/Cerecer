const terminal = document.getElementById("terminal");
const main     = document.getElementById("main");

// Texto completo, incluyendo el comando al final
const fullText = `Terminal Cerecer
Copyright (C) Corporación Cerecer | Todos los derechos reservados

¡No olvides contactarnos por cualquier error que encuentres en la página!

PS D:\\Usuarios\\invitado> iniciarcerecer.ht`;

const TYPE_SPEED = 35;
const PROGRESS_SPEED = 30;
const SPECIAL_COLOR_START = fullText.indexOf("iniciarcerecer.ht");
const SPECIAL_COLOR_END = SPECIAL_COLOR_START + "iniciarcerecer.ht".length;

let idx = 0;

function typeAll() {
  if (idx < fullText.length) {
    const char = fullText[idx];

    // Si estamos dentro del texto coloreado
    if (idx === SPECIAL_COLOR_START) terminal.innerHTML += `<span class="command">`;

    if (char === "\n") {
      terminal.innerHTML += "<br>";
    } else {
      terminal.innerHTML += char;
    }

    if (idx === SPECIAL_COLOR_END - 1) terminal.innerHTML += `</span>`;

    idx++;
    setTimeout(typeAll, TYPE_SPEED);
  } else {
    startProgress();
  }
}

function startProgress() {
  let pct = 1;
  const id = setInterval(() => {
    terminal.innerHTML += `<br>cargando... ${pct}%`;
    pct++;
    if (pct > 100) {
      clearInterval(id);
      finishIntro();
    }
  }, PROGRESS_SPEED);
}

function finishIntro() {
  terminal.style.display = "none";
  main.classList.remove("hidden");
}

// Iniciar la animación
typeAll();
