// -------------- TYPEWRITER + PROGRESS BAR -----------------------------
document.addEventListener("DOMContentLoaded", () => {
  const terminal   = document.getElementById("terminal");
  const promptSpan = document.getElementById("prompt");
  const boot       = document.getElementById("boot");
  const app        = document.getElementById("app");

  /* Añadimos cursor parpadeante */
  const cursor = document.createElement("span");
  cursor.className = "cursor";
  terminal.appendChild(cursor);

  /* Comando a escribir */
  const comando = "iniciarcerecer.ht";
  let i = 0;

  function escribir() {
    if (i < comando.length) {
      promptSpan.textContent += comando.charAt(i++);
      setTimeout(escribir, 80);            // velocidad de tipeo
    } else {
      cursor.remove();                     // quita cursor fijo
      iniciarCarga();
    }
  }

  /* Barra de carga 1→100 % */
  function iniciarCarga() {
    let pct = 0;
    const line = document.createElement("div");
    line.textContent = "\nCargando: 0%";
    terminal.appendChild(line);

    const int = setInterval(() => {
      pct++;
      line.textContent = `Cargando: ${pct}%`;
      if (pct >= 100) {
        clearInterval(int);
        setTimeout(() => {
          boot.style.display = "none";     // oculta pantalla arranque
          app.style.display  = "block";    // muestra UI principal
          iniciarReloj();
        }, 400);
      }
    }, 28);                                // duración total ~2,8 s
  }

  escribir();
});

// -------------- RELOJ HH:MM:SS ----------------------------------------
function iniciarReloj(){
  const reloj = document.getElementById("clock");
  function pad(n){ return n.toString().padStart(2,"0"); }
  function tick(){
    const now = new Date();
    reloj.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
}
