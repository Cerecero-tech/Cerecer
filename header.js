function updateHeader() {
  const now = new Date();

  // Hora en formato 12h con a.m./p.m.
  const hour = now.getHours();
  const minute = now.getMinutes();
  const period = hour >= 12 ? "p.m." : "a.m.";
  const formattedHour = ((hour + 11) % 12 + 1); // convierte 0–23 en 1–12

  const paddedMinute = String(minute).padStart(2, '0');
  document.getElementById('clock').textContent = `${formattedHour}:${paddedMinute} ${period}`;

  // Fecha en formato "lunes, 17 de junio de 2025"
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'America/Mexico_City',
  };
  const dateText = now.toLocaleDateString('es-MX', options);
  document.getElementById('date').textContent = dateText;

  // Servicio: lunes a viernes de 9 a 20
  const day = now.getDay(); // 0 = domingo
  const inSchedule = (day >= 1 && day <= 5) && (hour >= 9 && hour < 20);
  document.getElementById('service-status').textContent = inSchedule
    ? "¡Estamos de servicio!"
    : "Fuera de servicio.";
}

updateHeader();
setInterval(updateHeader, 1000);
