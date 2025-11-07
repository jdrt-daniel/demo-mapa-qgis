/**
 * Estructura para gestionar el estado de redes
 */
const estadoRedes = {
  redesCargadas: [],
  redesSeleccionadas: new Set(),
  propiedad: "NOMBRERED", // Propiedad usada para agrupar redes
};

/**
 * Carga y lista todas las redes únicas
 * @returns {array} Array de redes agrupadas
 */
function cargarYListarRedes() {
  const datosRedes = obtenerDatosRedes();

  if (datosRedes.length === 0) {
    console.warn("No hay datos de redes disponibles");
    return [];
  }

  // Agrupar redes por propiedad
  estadoRedes.redesCargadas = agruparRedesPorPropiedad(estadoRedes.propiedad);

  return estadoRedes.redesCargadas;
}

/**
 * Alterna la selección de una red específica
 * @param {string} nombreRed - Nombre de la red
 */
function alternarSeleccionRed(nombreRed) {
  if (estadoRedes.redesSeleccionadas.has(nombreRed)) {
    estadoRedes.redesSeleccionadas.delete(nombreRed);
  } else {
    estadoRedes.redesSeleccionadas.add(nombreRed);
  }

  aplicarFiltroRedes();
}

/**
 * Selecciona múltiples redes
 * @param {array} nombresRedes - Array de nombres de redes
 */
function seleccionarMultiplesRedes(nombresRedes) {
  estadoRedes.redesSeleccionadas.clear();

  nombresRedes.forEach((nombre) => {
    estadoRedes.redesSeleccionadas.add(nombre);
  });

  aplicarFiltroRedes();
}

/**
 * Selecciona todas las redes
 */
function seleccionarTodasRedes() {
  estadoRedes.redesSeleccionadas.clear();
  estadoRedes.redesCargadas.forEach((red) => {
    estadoRedes.redesSeleccionadas.add(red.nombre);
  });

  aplicarFiltroRedes();
}

/**
 * Deselecciona todas las redes
 */
function deseleccionarTodasRedes() {
  estadoRedes.redesSeleccionadas.clear();
  aplicarFiltroRedes();
}

/**
 * Aplica el filtro actual de redes
 */
function aplicarFiltroRedes() {
  const datosRedes = obtenerDatosRedes();

  if (estadoRedes.redesSeleccionadas.size === 0) {
    const nuevaCapa = crearCapaRedes(datosRedes);
    actualizarCapaRedes(nuevaCapa);
    actualizarContadorRedes(datosRedes.length, "Todas las redes");

    // Si el filtro por red de establecimientos está activo, limpiar
    if (filtroRedActivo()) {
      const cbFiltro = document.getElementById("cbFiltrarPorRed");
      if (cbFiltro) cbFiltro.checked = false;
      alternarFiltroEstablecimientosPorRed();
    }
    return;
  }

  const redesFiltradas = datosRedes.filter((feature) => {
    const nombreRed = feature.properties?.[estadoRedes.propiedad] || "";
    return estadoRedes.redesSeleccionadas.has(nombreRed);
  });

  const nuevaCapa = crearCapaRedes(redesFiltradas);
  actualizarCapaRedes(nuevaCapa);

  const nombreRedes = Array.from(estadoRedes.redesSeleccionadas).join(", ");
  actualizarContadorRedes(redesFiltradas.length, nombreRedes);

  // Si el filtro por red de establecimientos está activo, reaplica el filtro
  if (filtroRedActivo()) {
    aplicarFiltroEstablecimientosPorRed();
  }
}
/**
 * Obtiene las redes actualmente seleccionadas
 * @returns {Set} Set de nombres de redes seleccionadas
 */
function obtenerRedesSeleccionadas() {
  return new Set(estadoRedes.redesSeleccionadas);
}

/**
 * Comprueba si una red está seleccionada
 * @param {string} nombreRed - Nombre de la red
 * @returns {boolean}
 */
function redEstaSeleccionada(nombreRed) {
  return estadoRedes.redesSeleccionadas.has(nombreRed);
}

/**
 * Actualiza el contador de redes mostradas
 * @param {number} cantidad - Cantidad de redes
 * @param {string} descripcion - Descripción de lo mostrado
 */
function actualizarContadorRedes(cantidad, descripcion) {
  const contador = document.getElementById("contadorRedes");

  if (!contador) {
    console.warn("Elemento contadorRedes no encontrado");
    return;
  }

  if (cantidad === 0) {
    contador.textContent = "(0)";
  } else {
    contador.textContent = `(${cantidad})`;
  }
}

/**
 * Limpia todos los filtros de redes
 */
function limpiarFiltrosRedes() {
  deseleccionarTodasRedes();
  actualizarCheckboxesRedes();
}

/**
 * Actualiza el estado de los checkboxes de redes en el UI
 */
function actualizarCheckboxesRedes() {
  const checkboxes = document.querySelectorAll('input[name="filtro-red"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = redEstaSeleccionada(checkbox.value);
  });
}

/**
 * Genera el HTML de los checkboxes de redes dinámicamente
 * @returns {string} HTML de los checkboxes
 */
function generarCheckboxesRedes() {
  const redesCargadas = cargarYListarRedes();
  let html = "";

  redesCargadas.forEach((red, index) => {
    const id = `fRed${index}`;
    html += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="filtro-red" 
               value="${red.nombre}" id="${id}" 
               onchange="alternarSeleccionRed('${red.nombre}')">
        <label class="form-check-label fs-sm" for="${id}">
          ${red.nombre}
        </label>
      </div>
    `;
  });

  return html;
}

/**
 * Inicializa los checkboxes de redes en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde insertar los checkboxes
 */
function inicializarCheckboxesRedes(contenedorId = "contenedor-filtros-redes") {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    console.warn(`Contenedor con ID "${contenedorId}" no encontrado`);
    return;
  }

  const html = generarCheckboxesRedes();
  contenedor.innerHTML = html;
}

/**
 * Filtra redes por nombre (búsqueda)
 * @param {string} termino - Término de búsqueda
 */
function filtrarRedesPorNombre(termino) {
  const datosOriginales = obtenerDatosRedes();

  if (!datosOriginales || datosOriginales.length === 0) {
    console.warn("No hay datos de redes para filtrar");
    return;
  }

  let datosFiltrados = datosOriginales;

  if (termino.trim() !== "") {
    datosFiltrados = datosOriginales.filter((feature) => {
      const nombreRed = feature.properties?.NOMBRERED || "";
      return nombreRed.toLowerCase().includes(termino.toLowerCase());
    });
  }

  const nuevaCapa = crearCapaRedes(datosFiltrados);
  actualizarCapaRedes(nuevaCapa);

  actualizarContadorRedes(
    datosFiltrados.length,
    termino.trim() !== "" ? `"${termino}"` : "Todas las redes"
  );
}

/**
 * Limpia el filtro de búsqueda de redes
 */
function limpiarFiltroRedes() {
  const inputBusquedaRed = document.getElementById("busquedaRed");
  if (inputBusquedaRed) {
    inputBusquedaRed.value = "";
    filtrarRedesPorNombre("");
  }
}
