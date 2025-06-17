const terminal = document.getElementById("terminal");
const main     = document.getElementById("main");

// Texto con todo incluido
const fullText = `Terminal Cerecer
Copyright (C) Corporación Cerecer | Todos los derechos reservados

¡No olvides contactarnos por cualquier error que encuentres en la página!

PS D:\\Usuarios\\invitado> iniciarcerecer.ht`;

const TYPE_SPEED = 35;
const PROGRESS_SPEED = 30;

const SPECIAL_COLOR_START = fullText.indexOf("iniciarcerecer.ht");
const SPECIAL_COLOR_END = SPECIAL_COLOR_START + "iniciarcerecer.ht".length;

let idx = 0;
let cursorVisible = true;
let typedHTML = "";

// Crear cursor
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "█";
terminal.appendChild(cursor);

// Parpadeo del cursor
setInterval(() => {
  cursor.style.visibility = cursorVisible ? "visible" : "hidden";
  cursorVisible = !cursorVisible;
}, 500);

// Escribe texto completo con coloreado
function typeAll() {
  if (idx < fullText.length) {
    const char = fullText[idx];

    if (idx === SPECIAL_COLOR_START) typedHTML += `<span class="command">`;

    if (char === "\n") {
      typedHTML += "<br>";
    } else {
      typedHTML += char;
    }

    if (idx === SPECIAL_COLOR_END - 1) typedHTML += "</span>";

    terminal.innerHTML = typedHTML;
    terminal.appendChild(cursor);

    idx++;
    setTimeout(typeAll, TYPE_SPEED);
  } else {
    startProgress();
  }
}

// Carga del 1% al 100% sobre una sola línea
function startProgress() {
  let pct = 1;
  const staticContent = typedHTML; // Guardamos el texto ya escrito

  const id = setInterval(() => {
    terminal.innerHTML = `${staticContent}<br>cargando... ${pct}%`;
    terminal.appendChild(cursor);
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

typeAll();
