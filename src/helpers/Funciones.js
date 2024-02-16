export function createToast(toast, severity, summary, message) {
  toast.add({
    severity: severity,
    summary: summary,
    detail: message,
    life: 2000,
  });
}

export function obtenerFecha() {
  const [fecha, hora] = new Date().toLocaleString().split(", ");
  const [dia, mes, anio] = fecha.split("/");
  const fechaISO = `${anio}-${mes.padStart(2, "0")}-${dia.padStart(2, "0")}`;
  const fechaHoraFormateada = `${fechaISO}T${hora}`;
  return fechaHoraFormateada;
}

function separarDias(fecha1, fecha2) {
  const [fechaA] = fecha1.split("T");
  const [anioA, mesA, diaA] = fechaA.split("-");

  const [fechaC] = fecha2.split("T");
  const [anioC, mesC, diaC] = fechaC.split("-");

  return {
    fecha1: { anio: anioA, mes: mesA, dia: diaA },
    fecha2: { anio: anioC, mes: mesC, dia: diaC },
  };
}

export function compararDia(fechaActual, fechaComparar) {
  const { fecha1, fecha2 } = separarDias(fechaActual, fechaComparar);
 
  return (
    fecha1.anio == fecha2.anio &&
    fecha1.mes == fecha2.mes &&
    fecha1.dia == fecha2.dia
  );
}

export function compararSemana(fechaActual, fechaComparar) {
  const { fecha1, fecha2 } = separarDias(fechaActual, fechaComparar);

  if (fecha1.anio == fecha2.anio && fecha1.mes == fecha2.mes) {
    const diferencia = parseInt(fecha1.dia) - parseInt(fecha2.dia);
    return diferencia < 7;
  }
}

export function compararMes(fechaActual, fechaComparar) {
  const { fecha1, fecha2 } = separarDias(fechaActual, fechaComparar);

  return fecha1.anio == fecha2.anio && fecha1.mes == fecha2.mes;
}

export function compararAnio(fechaActual, fechaComparar) {
  const { fecha1, fecha2 } = separarDias(fechaActual, fechaComparar);

  return fecha1.anio == fecha2.anio;
}
