const nivelesEstablecimiento = {
  "1er": { nombre: "1er nivel", color: "success" },
  "2do": { nombre: "2do nivel", color: "warning" },
  "3er": { nombre: "3er nivel", color: "danger" },
};

const estadoFiltroRed = {
  activo: false,
  redesSeleccionadas: new Set(),
};

const estadoFiltroMunicipio = {
  activo: false,
  municipiosSeleccionados: new Set(),
};

/**
 * Aplica un filtro de búsqueda a los establecimientos
 * @param {string} termino - Término de búsqueda
 */
function filtrarEstablecimientos(termino) {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  // Filtrar datos
  let datosFiltrados = datosOriginales;

  if (termino.trim() !== "") {
    datosFiltrados = datosOriginales.filter((feature) => {
      const propiedades = feature.properties || {};
      const textoProperties = JSON.stringify(propiedades).toLowerCase();
      return textoProperties.includes(termino.toLowerCase());
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);

  // Actualizar la capa en el mapa
  actualizarCapaEstablecimientos(nuevaCapa);

  // Actualizar contador
  actualizarContador(datosFiltrados.length, termino);
}

/**
 * Actualiza el contador de resultados
 * @param {number} cantidad - Cantidad de resultados
 * @param {string} termino - Término de búsqueda
 */
function actualizarContador(cantidad, termino) {
  const contador = document.getElementById("contador");

  if (!contador) {
    console.warn("Elemento contador no encontrado");
    return;
  }

  if (termino.trim() !== "") {
    const plural = cantidad !== 1 ? "s" : "";
    contador.textContent = `${cantidad} resultado${plural}`;
  } else {
    contador.textContent = "Mostrando todos";
  }
}

/**
 * Limpia el filtro de búsqueda de establecimientos
 */
function limpiarFiltroEstablecimientos() {
  const inputBusqueda = document.getElementById("busqueda");

  if (inputBusqueda) {
    inputBusqueda.value = "";
    filtrarEstablecimientos("");
  }
}

/**
 * Configuración de tipos de establecimientos
 */
const tiposEstablecimiento = {
  H3: { nombre: "Hospital de 3er nivel", color: "danger" },
  IE: { nombre: "Institución especializada", color: "info" },
  H2: { nombre: "Hospital de segundo nivel", color: "warning" },
  CSCI: { nombre: "Centro de Salud con Internación", color: "success" },
  CSA: { nombre: "Centro de Salud Ambulatorio", color: "primary" },
  PS: { nombre: "Puesto de Salud", color: "secondary" },
};

/**
 * Filtra establecimientos por uno o múltiples tipos
 * @param {array|string} tipos - Array de códigos de tipo o código individual
 */
function filtrarEstablecimientosPorTipo(tipos) {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  // Normalizar tipos a array
  const tiposArray = Array.isArray(tipos) ? tipos : [tipos];

  // Filtrar datos por tipo
  let datosFiltrados = datosOriginales;

  if (tiposArray.length > 0 && tiposArray[0] !== "") {
    datosFiltrados = datosOriginales.filter((feature) => {
      const tipoEstablecimiento = feature.properties?.TIPO || "";
      return tiposArray.includes(tipoEstablecimiento);
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);

  // Actualizar la capa en el mapa
  actualizarCapaEstablecimientos(nuevaCapa);

  // Actualizar contador
  const nombresTipos = tiposArray
    .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
    .join(", ");
  actualizarContador(datosFiltrados.length, `Tipo: ${nombresTipos}`);
}

/**
 * Obtiene los tipos seleccionados en los checkboxes
 * @returns {array} Array con códigos de tipos seleccionados
 */
function obtenerTiposSeleccionados() {
  const checkboxes = document.querySelectorAll(
    'input[name="filtro-tipo"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

/**
 * Aplica filtro combinado: búsqueda por nombre/código + tipos seleccionados
 * @param {string} termino - Término de búsqueda (opcional)
 * @param {array} tipos - Array de tipos a filtrar (opcional)
 */
function aplicarFiltrosCombinados(termino = "", tipos = []) {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  let datosFiltrados = datosOriginales;

  // Filtrar por término de búsqueda
  if (termino.trim() !== "") {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const propiedades = feature.properties || {};
      const textoProperties = JSON.stringify(propiedades).toLowerCase();
      return textoProperties.includes(termino.toLowerCase());
    });
  }

  // Filtrar por tipos seleccionados
  if (tipos.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const tipoEstablecimiento = feature.properties?.TIPO || "";
      return tipos.includes(tipoEstablecimiento);
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);

  // Actualizar la capa en el mapa
  actualizarCapaEstablecimientos(nuevaCapa);

  // Actualizar contador con información descriptiva
  let descripcionFiltro = "";
  if (termino.trim() !== "" && tipos.length > 0) {
    const nombresTipos = tipos
      .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
      .join(", ");
    descripcionFiltro = `"${termino}" en ${nombresTipos}`;
  } else if (termino.trim() !== "") {
    descripcionFiltro = `"${termino}"`;
  } else if (tipos.length > 0) {
    const nombresTipos = tipos
      .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
      .join(", ");
    descripcionFiltro = nombresTipos;
  }

  actualizarContador(datosFiltrados.length, descripcionFiltro);
}

/**
 * Filtra establecimientos por uno o múltiples niveles
 * @param {array|string} niveles - Array de niveles o nivel individual
 */
function filtrarEstablecimientosPorNivel(niveles) {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  // Normalizar niveles a array
  const nivelesArray = Array.isArray(niveles) ? niveles : [niveles];

  // Filtrar datos por nivel
  let datosFiltrados = datosOriginales;

  if (nivelesArray.length > 0 && nivelesArray[0] !== "") {
    datosFiltrados = datosOriginales.filter((feature) => {
      const nivelEstablecimiento = feature.properties?.NIVELRES || "";
      return nivelesArray.includes(nivelEstablecimiento.toString());
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);

  // Actualizar la capa en el mapa
  actualizarCapaEstablecimientos(nuevaCapa);

  // Actualizar contador
  const nombresNiveles = nivelesArray
    .map((nivel) => nivelesEstablecimiento[nivel]?.nombre || nivel)
    .join(", ");
  actualizarContador(datosFiltrados.length, `Nivel: ${nombresNiveles}`);
}

/**
 * Obtiene los niveles seleccionados en los checkboxes
 * @returns {array} Array con niveles seleccionados
 */
function obtenerNivelesSeleccionados() {
  const checkboxes = document.querySelectorAll(
    'input[name="filtro-nivel"]:checked'
  );
  return Array.from(checkboxes).map((cb) => cb.value);
}

/**
 * Aplica filtro combinado: búsqueda + tipos + niveles seleccionados
 * @param {string} termino - Término de búsqueda (opcional)
 * @param {array} tipos - Array de tipos a filtrar (opcional)
 * @param {array} niveles - Array de niveles a filtrar (opcional)
 */
function aplicarFiltrosAvanzados(termino = "", tipos = [], niveles = []) {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  let datosFiltrados = datosOriginales;

  // Filtrar por término de búsqueda
  if (termino.trim() !== "") {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const propiedades = feature.properties || {};
      const textoProperties = JSON.stringify(propiedades).toLowerCase();
      return textoProperties.includes(termino.toLowerCase());
    });
  }

  // Filtrar por tipos seleccionados
  if (tipos.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const tipoEstablecimiento = feature.properties?.TIPO || "";
      return tipos.includes(tipoEstablecimiento);
    });
  }

  // Filtrar por niveles seleccionados
  if (niveles.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const nivelEstablecimiento = feature.properties?.NIVELRES || "";
      return niveles.includes(nivelEstablecimiento.toString());
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);

  // Actualizar la capa en el mapa
  actualizarCapaEstablecimientos(nuevaCapa);

  // Actualizar contador con información descriptiva
  let descripcionFiltro = "";
  const partes = [];

  if (termino.trim() !== "") {
    partes.push(`"${termino}"`);
  }

  if (tipos.length > 0) {
    const nombresTipos = tipos
      .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
      .join(", ");
    partes.push(nombresTipos);
  }

  if (niveles.length > 0) {
    const nombresNiveles = niveles
      .map((nivel) => nivelesEstablecimiento[nivel]?.nombre || nivel)
      .join(", ");
    partes.push(nombresNiveles);
  }

  descripcionFiltro = partes.join(" - ");

  actualizarContador(
    datosFiltrados.length,
    descripcionFiltro || "Mostrando todos"
  );
}

function obtenerCodigosRedesSeleccionadas() {
  const codigosRedes = [];

  datos.redes.forEach((feature) => {
    const nombreRed = feature.properties?.NOMBRERED || "";
    const codigoRed = feature.properties?.CODREDSAL || "";

    if (estadoRedes.redesSeleccionadas.has(nombreRed) && codigoRed) {
      codigosRedes.push(codigoRed);
    }
  });

  return codigosRedes;
}

function alternarFiltroEstablecimientosPorRed() {
  estadoFiltroRed.activo = !estadoFiltroRed.activo;
  const checkbox = document.getElementById("cbFiltrarPorRed");

  if (checkbox) {
    estadoFiltroRed.activo = checkbox.checked;
  }

  if (estadoFiltroRed.activo) {
    aplicarFiltroEstablecimientosPorRed();
  } else {
    // Si se desactiva, aplicar filtros normales sin restricción de red
    const inputBusqueda = document.getElementById("busqueda");
    const termino = inputBusqueda ? inputBusqueda.value : "";
    const tiposSeleccionados = obtenerTiposSeleccionados();
    const nivelesSeleccionados = obtenerNivelesSeleccionados();
    aplicarFiltrosAvanzados(termino, tiposSeleccionados, nivelesSeleccionados);
  }
}

function aplicarFiltroEstablecimientosPorRed() {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  // Obtener códigos de redes seleccionadas
  const codigosRedes = obtenerCodigosRedesSeleccionadas();

  if (codigosRedes.length === 0) {
    console.warn("No hay redes seleccionadas");
    actualizarCapaEstablecimientos(crearCapaEstablecimientos([]));
    actualizarContador(0, "Sin redes seleccionadas");
    return;
  }

  let datosFiltrados = datosOriginales;

  // Filtrar establecimientos por código de red
  datosFiltrados = datosFiltrados.filter((feature) => {
    const codRedEstablecimiento = feature.properties?.CODREDSAL || "";
    return codigosRedes.includes(codRedEstablecimiento);
  });

  // Aplicar otros filtros (búsqueda, tipo, nivel)
  const inputBusqueda = document.getElementById("busqueda");
  const termino = inputBusqueda ? inputBusqueda.value : "";
  const tiposSeleccionados = obtenerTiposSeleccionados();
  const nivelesSeleccionados = obtenerNivelesSeleccionados();

  // Filtrar por término de búsqueda
  if (termino.trim() !== "") {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const propiedades = feature.properties || {};
      const textoProperties = JSON.stringify(propiedades).toLowerCase();
      return textoProperties.includes(termino.toLowerCase());
    });
  }

  // Filtrar por tipos
  if (tiposSeleccionados.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const tipoEstablecimiento = feature.properties?.TIPO || "";
      return tiposSeleccionados.includes(tipoEstablecimiento);
    });
  }

  // Filtrar por niveles
  if (nivelesSeleccionados.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const nivelEstablecimiento = feature.properties?.NIVEL || "";
      return nivelesSeleccionados.includes(nivelEstablecimiento.toString());
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);
  actualizarCapaEstablecimientos(nuevaCapa);

  // Construir descripción del filtro
  let descripcionFiltro = "Por red";
  if (termino.trim() !== "") {
    descripcionFiltro += ` - "${termino}"`;
  }
  if (tiposSeleccionados.length > 0) {
    const nombresTipos = tiposSeleccionados
      .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
      .join(", ");
    descripcionFiltro += ` - ${nombresTipos}`;
  }
  if (nivelesSeleccionados.length > 0) {
    const nombresNiveles = nivelesSeleccionados
      .map((nivel) => nivelesEstablecimiento[nivel]?.nombre || nivel)
      .join(", ");
    descripcionFiltro += ` - ${nombresNiveles}`;
  }

  actualizarContador(datosFiltrados.length, descripcionFiltro);
}

function filtroRedActivo() {
  return estadoFiltroRed.activo;
}

function obtenerCodigosMunicipiosSeleccionados() {
  const codigosMunicipios = [];

  datos.municipios.forEach((feature) => {
    const nombreMunicipio = feature.properties?.NOMBRE || "";
    const codigoMunicipio = feature.properties?.CODMUNI || "";

    if (
      estadoMunicipios.municipiosSeleccionados.has(nombreMunicipio) &&
      codigoMunicipio
    ) {
      codigosMunicipios.push(codigoMunicipio);
    }
  });

  return codigosMunicipios;
}

function alternarFiltroEstablecimientosPorMunicipio() {
  estadoFiltroMunicipio.activo = !estadoFiltroMunicipio.activo;
  const checkbox = document.getElementById("cbFiltrarPorMunicipio");

  if (checkbox) {
    estadoFiltroMunicipio.activo = checkbox.checked;
  }

  if (estadoFiltroMunicipio.activo) {
    aplicarFiltroEstablecimientosPorMunicipio();
  } else {
    // Si se desactiva, aplicar filtros normales sin restricción de municipio
    const inputBusqueda = document.getElementById("busqueda");
    const termino = inputBusqueda ? inputBusqueda.value : "";
    const tiposSeleccionados = obtenerTiposSeleccionados();
    const nivelesSeleccionados = obtenerNivelesSeleccionados();
    aplicarFiltrosAvanzados(termino, tiposSeleccionados, nivelesSeleccionados);
  }
}

function aplicarFiltroEstablecimientosPorMunicipio() {
  const datosOriginales = obtenerDatosEstablecimientos();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de establecimientos para filtrar");
    return;
  }

  // Obtener nombres de municipios seleccionados
  const codigosMunicipios = obtenerCodigosMunicipiosSeleccionados();

  if (codigosMunicipios.length === 0) {
    console.warn("No hay municipios seleccionados");
    actualizarCapaEstablecimientos(crearCapaEstablecimientos([]));
    actualizarContador(0, "Sin municipios seleccionados");
    return;
  }

  let datosFiltrados = datosOriginales;

  // Filtrar establecimientos por nombre de municipio
  datosFiltrados = datosFiltrados.filter((feature) => {
    const municipioEstablecimiento = feature.properties?.CODMUNI || "";
    return codigosMunicipios.includes(municipioEstablecimiento);
  });

  // Aplicar otros filtros (búsqueda, tipo, nivel)
  const inputBusqueda = document.getElementById("busqueda");
  const termino = inputBusqueda ? inputBusqueda.value : "";
  const tiposSeleccionados = obtenerTiposSeleccionados();
  const nivelesSeleccionados = obtenerNivelesSeleccionados();

  // Filtrar por término de búsqueda
  if (termino.trim() !== "") {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const propiedades = feature.properties || {};
      const textoProperties = JSON.stringify(propiedades).toLowerCase();
      return textoProperties.includes(termino.toLowerCase());
    });
  }

  // Filtrar por tipos
  if (tiposSeleccionados.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const tipoEstablecimiento = feature.properties?.TIPO || "";
      return tiposSeleccionados.includes(tipoEstablecimiento);
    });
  }

  // Filtrar por niveles
  if (nivelesSeleccionados.length > 0) {
    datosFiltrados = datosFiltrados.filter((feature) => {
      const nivelEstablecimiento = feature.properties?.NIVEL || "";
      return nivelesSeleccionados.includes(nivelEstablecimiento.toString());
    });
  }

  // Crear nueva capa con datos filtrados
  const nuevaCapa = crearCapaEstablecimientos(datosFiltrados);
  actualizarCapaEstablecimientos(nuevaCapa);

  // Construir descripción del filtro
  let descripcionFiltro = "Por municipio";
  if (termino.trim() !== "") {
    descripcionFiltro += ` - "${termino}"`;
  }
  if (tiposSeleccionados.length > 0) {
    const nombresTipos = tiposSeleccionados
      .map((tipo) => tiposEstablecimiento[tipo]?.nombre || tipo)
      .join(", ");
    descripcionFiltro += ` - ${nombresTipos}`;
  }
  if (nivelesSeleccionados.length > 0) {
    const nombresNiveles = nivelesSeleccionados
      .map((nivel) => nivelesEstablecimiento[nivel]?.nombre || nivel)
      .join(", ");
    descripcionFiltro += ` - ${nombresNiveles}`;
  }

  actualizarContador(datosFiltrados.length, descripcionFiltro);
}

function filtroMunicipioActivo() {
  return estadoFiltroMunicipio.activo;
}
