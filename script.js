// ---------- ARRANQUE ----------
document.addEventListener("DOMContentLoaded", () => {
  const typeTarget  = document.getElementById("typewriter");
  const bootScreen  = document.getElementById("screen");
  const mainUI      = document.getElementById("mainUI");
  const cmd         = "iniciarcerecer.ht";
  const speed       = 100; // ms por letra
  let idx = 0;

  function type() {
    if (idx < cmd.length) {
      typeTarget.textContent += cmd[idx++];
      requestAnimationFrame(() => setTimeout(type, speed));
    } else {
      // Pequeña pausa y luego mostrar UI
      setTimeout(() => {
        bootScreen.style.display = "none";
        mainUI.style.display = "block";
        initClock();              // Inicia reloj cuando la UI está visible
      }, 800);
    }
  }
  type();
});

// ---------- RELOJ + ESTADO DE SERVICIO ----------
function initClock() {
  const clockEl   = document.getElementById("clock");
  const msgEl     = document.getElementById("serviceMsg");

  function pad(n){ return n.toString().padStart(2,"0"); }

  function update() {
    const now   = new Date();
    const time  = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    const date  = now.toLocaleDateString("es-MX", { weekday:"long", day:"numeric", month:"long", year:"numeric" });
    clockEl.textContent = `${time}\n${date}`;

    // Servicio: lunes‑viernes 09‑20
    const day    = now.getDay();            // 0 = domingo
    const hour   = now.getHours();
    const open   = (day>=1 && day<=5) && (hour>=9 && hour<20);
    msgEl.textContent = open ? "¡Estamos de servicio!" : "Fuera de servicio.";
  }

  update();
  setInterval(update, 1000);
}
