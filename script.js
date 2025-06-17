// script.js
const terminal = document.getElementById("terminal");
const main     = document.getElementById("main");

// Texto a escribir (línea por línea)
const lines = [
  "Terminal Cerecer",
  "Copyright (C) Corporación Cerecer | Todos los derechos reservados",
  "",
  "¡No olvides contactarnos por cualquier error que encuentres en la página!",
  "",
  "PS D:\\Usuarios\\invitado> "
];

// Comando que va en naranja
const command = "iniciarcerecer.ht";

// Velocidades (en ms)
const TYPE_SPEED      = 35;   // cada carácter
const LINE_PAUSE      = 350;  // entre líneas
const PROGRESS_SPEED  = 30;   // % de carga

let line = 0;
let char = 0;

/* ---------- Typewriter principal ---------- */
function typeLine() {
  if (line < lines.length) {
    if (char < lines[line].length) {
      terminal.textContent += lines[line][char++];
      setTimeout(typeLine, TYPE_SPEED);
    } else {
      terminal.textContent += "\n";
      line++; char = 0;
      setTimeout(typeLine, LINE_PAUSE);
    }
  } else {
    // terminamos las líneas fijas; ahora el comando en color
    typeCommand(0);
  }
}

/* ---------- Comando coloreado ---------- */
function typeCommand(idx) {
  if (idx < command.length) {
    // Abrimos span en el primer carácter, cerramos al final
    if (idx === 0) terminal.innerHTML += '<span class="command">';
    terminal.innerHTML += command[idx];
    if (idx === command.length - 1) terminal.innerHTML += "</span>";
    setTimeout(() => typeCommand(idx + 1), TYPE_SPEED);
  } else {
    terminal.innerHTML += "\n";
    startProgress();
  }
}

/* ---------- Barra de carga 1 → 100 ---------- */
function startProgress() {
  let pct = 1;
  const id = setInterval(() => {
    terminal.textContent += `cargando... ${pct}%\r`;
    pct++;
    if (pct > 100) {
      clearInterval(id);
      finishIntro();
    }
  }, PROGRESS_SPEED);
}

/* ---------- Transición a la página real ---------- */
function finishIntro() {
  terminal.style.display = "none";  // o usa fade‑out si deseas
  main.classList.remove("hidden");
}

// Arrancamos todo
typeLine();
