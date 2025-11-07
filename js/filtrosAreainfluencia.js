/**
 * Estructura para gestionar el estado de macroregiones
 */
const estadoAreaInfluencia = {
  areaInfluenciaCargadas: [],
  areaInfluenciaSeleccionadas: new Set(),
  propiedad: "ESTSALUD", // Propiedad usada para agrupar area de influencia
};

/**
 * Carga y lista todas las area de influencia únicas
 * @returns {array} Array de area de influencia agrupadas
 */
function cargarYListarAreaInfluencia() {
  const datosAreaInfluencia = obtenerDatosAreaInfluencia();

  if (datosAreaInfluencia.length === 0) {
    console.warn("No hay datos de area de influencia disponibles");
    return [];
  }

  // Agrupar macroregiones por propiedad
  estadoAreaInfluencia.areaInfluenciaCargadas =
    agruparAreaInfluenciaPorPropiedad(estadoAreaInfluencia.propiedad);

  return estadoAreaInfluencia.areaInfluenciaCargadas;
}

/**
 * Alterna la selección de una area de influencia específica
 * @param {string} nombreAreaInfluencia - Nombre de la area de influencia
 */
function alternarSeleccionAreaInfluencia(nombreAreaInfluencia) {
  if (
    estadoAreaInfluencia.areaInfluenciaSeleccionadas.has(nombreAreaInfluencia)
  ) {
    estadoAreaInfluencia.areaInfluenciaSeleccionadas.delete(
      nombreAreaInfluencia
    );
  } else {
    estadoAreaInfluencia.areaInfluenciaSeleccionadas.add(nombreAreaInfluencia);
  }

  aplicarFiltroAreaInfluencia();
}

/**
 * Selecciona múltiples area de influencia
 * @param {array} nombresAreaInfluencia - Array de nombres de area de influencia
 */
function seleccionarMultiplesAreaInfluencia(nombresAreaInfluencia) {
  estadoAreaInfluencia.areaInfluenciaSeleccionadas.clear();

  nombresAreaInfluencia.forEach((nombre) => {
    estadoAreaInfluencia.areaInfluenciaSeleccionadas.add(nombre);
  });

  aplicarFiltroAreaInfluencia();
}

/**
 * Selecciona todas las area de influencia
 */
function seleccionarTodasAreaInfluencia() {
  estadoAreaInfluencia.areaInfluenciaSeleccionadas.clear();
  estadoAreaInfluencia.areaInfluenciaCargadas.forEach((areaInfluencia) => {
    estadoAreaInfluencia.areaInfluenciaSeleccionadas.add(areaInfluencia.nombre);
  });

  aplicarFiltroAreaInfluencia();
}

/**
 * Deselecciona todas las area de influencia
 */
function deseleccionarTodasAreaInfluencia() {
  estadoAreaInfluencia.areaInfluenciaSeleccionadas.clear();
  aplicarFiltroAreaInfluencia();
}

/**
 * Aplica el filtro actual de area de influencia
 */
function aplicarFiltroAreaInfluencia() {
  const datosAreaInfluencia = obtenerDatosAreaInfluencia();

  if (estadoAreaInfluencia.areaInfluenciaSeleccionadas.size === 0) {
    // Si no hay area de influencia seleccionadas, mostrar todas
    const nuevaCapa = crearCapaAreaInfluencia(datosAreaInfluencia);
    actualizarCapaAreaInfluencia(nuevaCapa);
    actualizarContadorAreaInfluencia(
      datosAreaInfluencia.length,
      "Todas las area de influencia"
    );
    return;
  }

  // Filtrar area de influencia según la selección
  const areaInfluenciaFiltradas = datosAreaInfluencia.filter((feature) => {
    const nombreAreaInfluencia =
      feature.properties?.[estadoAreaInfluencia.propiedad] || "";
    return estadoAreaInfluencia.areaInfluenciaSeleccionadas.has(
      nombreAreaInfluencia
    );
  });

  const nuevaCapa = crearCapaAreaInfluencia(areaInfluenciaFiltradas);
  actualizarCapaAreaInfluencia(nuevaCapa);

  const nombreAreaInfluencia = Array.from(
    estadoAreaInfluencia.areaInfluenciaSeleccionadas
  ).join(", ");
  actualizarContadorAreaInfluencia(
    areaInfluenciaFiltradas.length,
    nombreAreaInfluencia
  );
}

/**
 * Obtiene las area de influencia actualmente seleccionadas
 * @returns {Set} Set de nombres de area de influencia seleccionadas
 */
function obtenerAreaInfluenciaSeleccionadas() {
  return new Set(estadoAreaInfluencia.areaInfluenciaSeleccionadas);
}

/**
 * Comprueba si una area de influencia está seleccionada
 * @param {string} nombreAreaInfluencia - Nombre de la area de influencia
 * @returns {boolean}
 */
function areaInfluenciaEstaSeleccionada(nombreAreaInfluencia) {
  return estadoAreaInfluencia.areaInfluenciaSeleccionadas.has(
    nombreAreaInfluencia
  );
}

/**
 * Actualiza el contador de area de influencia mostradas
 * @param {number} cantidad - Cantidad de area de influencia
 * @param {string} descripcion - Descripción de lo mostrado
 */
function actualizarContadorAreaInfluencia(cantidad, descripcion) {
  const contador = document.getElementById("contadorAreaInfluencia");

  if (!contador) {
    console.warn("Elemento contadorAreaInfluencia no encontrado");
    return;
  }

  if (cantidad === 0) {
    contador.textContent = "(0)";
  } else {
    contador.textContent = `(${cantidad})`;
  }
}

/**
 * Limpia todos los filtros de area de influencia
 */
function limpiarFiltrosAreaInfluencia() {
  deseleccionarTodasAreaInfluencia();
  actualizarCheckboxesAreaInfluencia();
}

/**
 * Actualiza el estado de los checkboxes de area de influencia en el UI
 */
function actualizarCheckboxesAreaInfluencia() {
  const checkboxes = document.querySelectorAll(
    'input[name="filtro-area-influencia"]'
  );
  checkboxes.forEach((checkbox) => {
    checkbox.checked = areaInfluenciaEstaSeleccionada(checkbox.value);
  });
}

/**
 * Genera el HTML de los checkboxes de area de influencia dinámicamente
 * @returns {string} HTML de los checkboxes
 */
function generarCheckboxesAreaInfluencia() {
  const areaInfluenciaCargadas = cargarYListarAreaInfluencia();
  let html = "";

  areaInfluenciaCargadas.forEach((areaInfluencia, index) => {
    const id = `fAreaInfluencia${index}`;
    html += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="filtro-area-influencia" 
               value="${areaInfluencia.nombre}" id="${id}" 
               onchange="alternarSeleccionAreaInfluencia('${areaInfluencia.nombre}')">
        <label class="form-check-label fs-sm" for="${id}">
          ${areaInfluencia.nombre}
        </label>
      </div>
    `;
  });

  return html;
}

/**
 * Inicializa los checkboxes de area de influencia en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde insertar los checkboxes
 */
function inicializarCheckboxesAreaInfluencia(
  contenedorId = "contenedor-filtros-area-influencia"
) {
  const contenedor = document.getElementById(contenedorId);

  if (!contenedor) {
    console.warn(`Contenedor con ID "${contenedorId}" no encontrado`);
    return;
  }

  const html = generarCheckboxesAreaInfluencia();
  contenedor.innerHTML = html;
}
