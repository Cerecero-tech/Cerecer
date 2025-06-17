/* ------- Reloj en vivo -------- */
function updateClock() {
  const clock = document.getElementById("clock");
  const now   = new Date();
  const pad   = n => n.toString().padStart(2, "0");
  clock.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}
 ${pad(now.getDate())}/${pad(now.getMonth()+1)}/${now.getFullYear()}`;
}
setInterval(updateClock, 1000);
updateClock();

/* ------- Pantalla de arranque + efecto máquina de escribir -------- */
const bootLines = [
  "Terminal Cerecer v1.0",
  "Corporación Cerecer (C) Todos los derechos reservados.",
  "",
  "PS D:\\Usuarios\\invitado> iniciarcerecer.ht",
  "",
  "Iniciando servicios...",
  "Cargando módulos...",
  "Listo.",
  ""
];

const speed = 40;      // ms entre caracteres
let i = 0, j = 0;
const pre = document.getElementById("boot-text");

function typeBoot() {
  if (i < bootLines.length) {
    if (j < bootLines[i].length) {
      pre.textContent += bootLines[i][j++];
      setTimeout(typeBoot, speed);
    } else {
      pre.textContent += "\n";
      i++; j = 0;
      setTimeout(typeBoot, speed * 3);
    }
  } else {
    // terminado: ocultar pantalla de arranque
    document.getElementById("boot").style.opacity = "0";
    setTimeout(() => document.getElementById("boot").style.display = "none", 400);
    // animar texto principal
    typeSections();
  }
}
typeBoot();

/* ------- Typewriter para secciones -------- */
function typeSections() {
  const lines = document.querySelectorAll(".line");
  let idx = 0;

  function typeLine(el) {
    const full = el.textContent;
    el.textContent = "";
    let k = 0;
    (function writer() {
      if (k < full.length) {
        el.textContent += full[k++];
        setTimeout(writer, 20);
      } else {
        idx++;
        if (idx < lines.length) typeLine(lines[idx]);
      }
    })();
  }
  if (lines.length) typeLine(lines[0]);
}
