// header.js
function updateHeader() {
  const now = new Date();

  // Hora en formato 24 h
  const timeOpts = { hour: '2-digit', minute: '2-digit', second: '2-digit',
                     hour12: false, timeZone: 'America/Mexico_City' };
  document.getElementById('clock').textContent =
    now.toLocaleTimeString('es-MX', timeOpts);

  // Fecha DD/MM/AAAA
  const dateOpts = { day: '2-digit', month: '2-digit', year: 'numeric',
                     timeZone: 'America/Mexico_City' };
  document.getElementById('date').textContent =
    now.toLocaleDateString('es-MX', dateOpts);

  // Estado de servicio
  const day  = now.getDay();   // 0=Domingo, 1=Lunes, …, 6=Sábado
  const hour = now.getHours(); // 0‑23

  const inSchedule = (day >= 1 && day <= 5) && (hour >= 9 && hour < 20);
  document.getElementById('service-status').textContent =
    inSchedule ? '¡Estamos de servicio!' : 'Fuera de servicio.';
}

// Actualizar cada segundo
updateHeader();
setInterval(updateHeader, 1000);
