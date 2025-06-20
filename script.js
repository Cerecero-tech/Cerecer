const terminal = document.getElementById("terminal");
const main = document.getElementById("main");

const fullText = `Terminal Cerecer
Copyright (C) Corporación Cerecer | Todos los derechos reservados

¡No olvides contactarnos por cualquier error que encuentres en la página!

PS D:\\Usuarios\\invitado> iniciarcerecer.ht`;

const TYPE_SPEED = 35;
const PROGRESS_SPEED = 10;
const HIGHLIGHT = "iniciarcerecer.ht";

let displayHTML = "";
let idx = 0;

// Añadir cursor parpadeante
const cursor = document.createElement("span");
cursor.className = "cursor";
cursor.textContent = "█";
terminal.appendChild(cursor);

// Parpadeo
setInterval(() => {
  cursor.style.visibility = cursor.style.visibility === "hidden" ? "visible" : "hidden";
}, 500);

function type() {
  if (idx < fullText.length) {
    let char = fullText[idx];

    // Agrega salto de línea como <br>
    if (char === "\n") {
      displayHTML += "<br>";
    } else {
      // Detectar y colorear "iniciarcerecer.ht"
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
      setTimeout(() => {
        terminal.style.display = "none";
        main.classList.remove("hidden");
      }, 500);
    }
  }, PROGRESS_SPEED);
}

// Iniciar escritura
type();
