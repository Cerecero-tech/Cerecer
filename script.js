// ---------- ARRANQUE CON BARRA DE PROGRESO 1‒100 % ----------
document.addEventListener("DOMContentLoaded", () => {
  const bootEl   = document.getElementById("boot");
  const textEl   = document.getElementById("bootText");
  const appEl    = document.getElementById("app");

  const header   = "Terminal Cerecer 1.0.0 — Corporación Cerecer (C) 2025\n";
  let percent    = 0;

  function updateBoot() {
    textEl.textContent = header + `Cargando… ${percent}%`;
    if (percent < 100) {
      percent++;
      setTimeout(updateBoot, 40); /* velocidad de llenado */
    } else {
      // terminar: quitar boot y mostrar la UI
      bootEl.style.display = "none";
      appEl.style.display  = "block";
      startClock();
    }
  }
  updateBoot();
});

// ---------- RELOJ EN CABECERA (HH:MM:SS) ----------
function startClock(){
  const clock = document.getElementById("clock");
  function pad(n){ return n.toString().padStart(2,"0"); }
  function tick(){
    const d = new Date();
    clock.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }
  tick();
  setInterval(tick, 1000);
}
