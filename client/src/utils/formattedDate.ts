type Option = "formatted" | "last_modification";

function formattedDate(dateString: string, option: Option = "formatted"): string {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    throw new Error("Invalid date string");
  }

  if (option === "formatted") {
    // Usando Intl.DateTimeFormat para formatear la fecha
    const formatter = new Intl.DateTimeFormat("es-MX", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

    return formatter.format(date); // Ej: "06/10/2025 02:30:00 p.m."
  }

  // Opción last_modification: calcular días transcurridos
  const today = new Date();
  const diffMs = today.getTime() - date.getTime();
  const daysTranscurred = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (daysTranscurred === 0) return "hoy";
  if (daysTranscurred === 1) return "hace 1 día";

  return `hace ${daysTranscurred} días`;
}

export default formattedDate;
