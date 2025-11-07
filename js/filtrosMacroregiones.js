/**
 * Estructura para gestionar el estado de macroregiones
 */
const estadoMacroregiones = {
  macroregionessCargadas: [],
  macroregionesSeleccionadas: new Set(),
  propiedad: "MACROREGIO", // Propiedad usada para agrupar macroregiones
};

/**
 * Carga y lista todas las macroregiones únicas
 * @returns {array} Array de macroregiones agrupadas
 */
function cargarYListarMacroregiones() {
  const datosMacroregiones = obtenerDatosMacroregiones();

  if (datosMacroregiones.length === 0) {
    console.warn("No hay datos de macroregiones disponibles");
    return [];
  }

  // Agrupar macroregiones por propiedad
  estadoMacroregiones.macroregionessCargadas =
    agruparMacrorregioniesPorPropiedad(estadoMacroregiones.propiedad);

  return estadoMacroregiones.macroregionessCargadas;
}

/**
 * Alterna la selección de una macroregión específica
 * @param {string} nombreMacroregion - Nombre de la macroregión
 */
function alternarSeleccionMacroregion(nombreMacroregion) {
  if (estadoMacroregiones.macroregionesSeleccionadas.has(nombreMacroregion)) {
    estadoMacroregiones.macroregionesSeleccionadas.delete(nombreMacroregion);
  } else {
    estadoMacroregiones.macroregionesSeleccionadas.add(nombreMacroregion);
  }

  aplicarFiltroMacroregiones();
}

/**
 * Selecciona múltiples macroregiones
 * @param {array} nombresMacroregiones - Array de nombres de macroregiones
 */
function seleccionarMultiplesMacroregiones(nombresMacroregiones) {
  estadoMacroregiones.macroregionesSeleccionadas.clear();

  nombresMacroregiones.forEach((nombre) => {
    estadoMacroregiones.macroregionesSeleccionadas.add(nombre);
  });

  aplicarFiltroMacroregiones();
}

/**
 * Selecciona todas las macroregiones
 */
function seleccionarTodasMacroregiones() {
  estadoMacroregiones.macroregionesSeleccionadas.clear();
  estadoMacroregiones.macroregionessCargadas.forEach((macroregion) => {
    estadoMacroregiones.macroregionesSeleccionadas.add(macroregion.nombre);
  });

  aplicarFiltroMacroregiones();
}

/**
 * Deselecciona todas las macroregiones
 */
function deseleccionarTodasMacroregiones() {
  estadoMacroregiones.macroregionesSeleccionadas.clear();
  aplicarFiltroMacroregiones();
}

/**
 * Aplica el filtro actual de macroregiones
 */
function aplicarFiltroMacroregiones() {
  const datosMacroregiones = obtenerDatosMacroregiones();

  if (estadoMacroregiones.macroregionesSeleccionadas.size === 0) {
    // Si no hay macroregiones seleccionadas, mostrar todas
    const nuevaCapa = crearCapaMacroregiones(datosMacroregiones);
    actualizarCapaMacroregiones(nuevaCapa);
    actualizarContadorMacroregiones(
      datosMacroregiones.length,
      "Todas las macroregiones"
    );
    return;
  }

  // Filtrar macroregiones según la selección
  const macroregioniesFiltradas = datosMacroregiones.filter((feature) => {
    const nombreMacroregion =
      feature.properties?.[estadoMacroregiones.propiedad] || "";
    return estadoMacroregiones.macroregionesSeleccionadas.has(
      nombreMacroregion
    );
  });

  const nuevaCapa = crearCapaMacroregiones(macroregioniesFiltradas);
  actualizarCapaMacroregiones(nuevaCapa);

  const nombreMacroregiones = Array.from(
    estadoMacroregiones.macroregionesSeleccionadas
  ).join(", ");
  actualizarContadorMacroregiones(
    macroregioniesFiltradas.length,
    nombreMacroregiones
  );
}

/**
 * Obtiene las macroregiones actualmente seleccionadas
 * @returns {Set} Set de nombres de macroregiones seleccionadas
 */
function obtenerMacroregionesSeleccionadas() {
  return new Set(estadoMacroregiones.macroregionesSeleccionadas);
}

/**
 * Comprueba si una macroregión está seleccionada
 * @param {string} nombreMacroregion - Nombre de la macroregión
 * @returns {boolean}
 */
function macroregionEstaSeleccionada(nombreMacroregion) {
  return estadoMacroregiones.macroregionesSeleccionadas.has(nombreMacroregion);
}

/**
 * Actualiza el contador de macroregiones mostradas
 * @param {number} cantidad - Cantidad de macroregiones
 * @param {string} descripcion - Descripción de lo mostrado
 */
function actualizarContadorMacroregiones(cantidad, descripcion) {
  const contador = document.getElementById("contadorMacroregiones");

  if (!contador) {
    console.warn("Elemento contadorMacroregiones no encontrado");
    return;
  }

  if (cantidad === 0) {
    contador.textContent = "(0)";
  } else {
    contador.textContent = `(${cantidad})`;
  }
}

/**
 * Limpia todos los filtros de macroregiones
 */
function limpiarFiltrosMacroregiones() {
  deseleccionarTodasMacroregiones();
  actualizarCheckboxesMacroregiones();
}

/**
 * Actualiza el estado de los checkboxes de macroregiones en el UI
 */
function actualizarCheckboxesMacroregiones() {
  const checkboxes = document.querySelectorAll(
    'input[name="filtro-macroregion"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = macroregionEstaSeleccionada(checkbox.value);
  });
}

/**
 * Genera el HTML de los checkboxes de macroregiones dinámicamente
 * @returns {string} HTML de los checkboxes
 */
function generarCheckboxesMacroregiones() {
  const macroregionessCargadas = cargarYListarMacroregiones();
  let html = "";

  macroregionessCargadas.forEach((macroregion, index) => {
    const id = `fMacroregion${index}`;
    html += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="filtro-macroregion" 
               value="${macroregion.nombre}" id="${id}" 
               onchange="alternarSeleccionMacroregion('${macroregion.nombre}')">
        <label class="form-check-label fs-sm" for="${id}">
          ${macroregion.nombre}
        </label>
      </div>
    `;
  });

  return html;
}

/**
 * Inicializa los checkboxes de macroregiones en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde insertar los checkboxes
 */
function inicializarCheckboxesMacroregiones(
  contenedorId = "contenedor-filtros-macroregiones"
) {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    console.warn(`Contenedor con ID "${contenedorId}" no encontrado`);
    return;
  }

  const html = generarCheckboxesMacroregiones();
  contenedor.innerHTML = html;
}
