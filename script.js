const terminal = document.getElementById("terminal");
const main     = document.getElementById("main");

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
let typingFinished = false;

// Añadir cursor parpadeante (estático al final del texto)
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "█";
terminal.appendChild(cursor);

// Parpadeo
setInterval(() => {
  cursor.style.visibility = cursorVisible ? "visible" : "hidden";
  cursorVisible = !cursorVisible;
}, 500);

function typeAll() {
  if (idx < fullText.length) {
    const char = fullText[idx];

    if (idx === SPECIAL_COLOR_START) terminal.innerHTML = terminal.innerHTML.slice(0, -1) + `<span class="command">`;

    if (char === "\n") {
      terminal.innerHTML = terminal.innerHTML.slice(0, -1) + "<br>";
    } else {
      terminal.innerHTML = terminal.innerHTML.slice(0, -1) + char;
    }

    if (idx === SPECIAL_COLOR_END - 1) terminal.innerHTML += "</span>";

    terminal.appendChild(cursor);
    idx++;
    setTimeout(typeAll, TYPE_SPEED);
  } else {
    typingFinished = true;
    startProgress();
  }
}

function startProgress() {
  let pct = 1;
  const id = setInterval(() => {
    const lines = terminal.innerHTML.split("<br>");
    lines[lines.length - 1] = `cargando... ${pct}%`;
    terminal.innerHTML = lines.join("<br>");
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
