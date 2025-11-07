/**
 * Estructura para gestionar el estado de municipios
 */
const estadoMunicipios = {
    municipiosCargados: [],
    municipiosSeleccionados: new Set(),
    propiedad: "NOMBRE", // Propiedad usada para agrupar municipios
};

/**
 * Carga y lista todos los municipios únicos
 * @returns {array} Array de municipios agrupados
 */
function cargarYListarMunicipios() {
    const datosMunicipios = obtenerDatosMunicipios();

    if (datosMunicipios.length === 0) {
        console.warn("No hay datos de municipios disponibles");
        return [];
    }

    // Agrupar municipios por propiedad
    estadoMunicipios.municipiosCargados = agruparMunicipiosPorPropiedad(
        estadoMunicipios.propiedad
    );

    return estadoMunicipios.municipiosCargados;
}

/**
 * Alterna la selección de un municipio específico
 * @param {string} nombreMunicipio - Nombre del municipio
 */
function alternarSeleccionMunicipio(nombreMunicipio) {
    if (estadoMunicipios.municipiosSeleccionados.has(nombreMunicipio)) {
        estadoMunicipios.municipiosSeleccionados.delete(nombreMunicipio);
    } else {
        estadoMunicipios.municipiosSeleccionados.add(nombreMunicipio);
    }

    aplicarFiltroMunicipios();
}

/**
 * Selecciona múltiples municipios
 * @param {array} nombresMunicipios - Array de nombres de municipios
 */
function seleccionarMultiplesMunicipios(nombresMunicipios) {
    estadoMunicipios.municipiosSeleccionados.clear();

    nombresMunicipios.forEach((nombre) => {
        estadoMunicipios.municipiosSeleccionados.add(nombre);
    });

    aplicarFiltroMunicipios();
}

/**
 * Selecciona todos los municipios
 */
function seleccionarTodosMunicipios() {
    estadoMunicipios.municipiosSeleccionados.clear();
    estadoMunicipios.municipiosCargados.forEach((municipio) => {
        estadoMunicipios.municipiosSeleccionados.add(municipio.nombre);
    });

    aplicarFiltroMunicipios();
}

/**
 * Deselecciona todos los municipios
 */
function deseleccionarTodosMunicipios() {
    estadoMunicipios.municipiosSeleccionados.clear();
    aplicarFiltroMunicipios();
}

/**
 * Aplica el filtro actual de municipios
 */
function aplicarFiltroMunicipios() {
    const datosMunicipios = obtenerDatosMunicipios();

    if (estadoMunicipios.municipiosSeleccionados.size === 0) {
        const nuevaCapa = crearCapaMunicipios(datosMunicipios);
        actualizarCapaMunicipios(nuevaCapa);
        actualizarContadorMunicipios(
            datosMunicipios.length,
            "Todos los municipios"
        );

        // Si el filtro por municipio de establecimientos está activo, limpiar
        if (filtroMunicipioActivo && filtroMunicipioActivo()) {
            const cbFiltro = document.getElementById("cbFiltrarPorMunicipio");
            if (cbFiltro) cbFiltro.checked = false;
            alternarFiltroEstablecimientosPorMunicipio();
        }
        return;
    }

    const municipiosFiltrados = datosMunicipios.filter((feature) => {
        const nombreMunicipio =
            feature.properties?.[estadoMunicipios.propiedad] || "";
        return estadoMunicipios.municipiosSeleccionados.has(nombreMunicipio);
    });

    const nuevaCapa = crearCapaMunicipios(municipiosFiltrados);
    actualizarCapaMunicipios(nuevaCapa);

    const nombreMunicipios = Array.from(
        estadoMunicipios.municipiosSeleccionados
    ).join(", ");
    actualizarContadorMunicipios(municipiosFiltrados.length, nombreMunicipios);

    // Si el filtro por municipio de establecimientos está activo, reaplica el filtro
    if (filtroMunicipioActivo && filtroMunicipioActivo()) {
        aplicarFiltroEstablecimientosPorMunicipio();
    }
}

/**
 * Obtiene los municipios actualmente seleccionados
 * @returns {Set} Set de nombres de municipios seleccionados
 */
function obtenerMunicipiosSeleccionados() {
    return new Set(estadoMunicipios.municipiosSeleccionados);
}

/**
 * Comprueba si un municipio está seleccionado
 * @param {string} nombreMunicipio - Nombre del municipio
 * @returns {boolean}
 */
function municipioEstaSeleccionado(nombreMunicipio) {
    return estadoMunicipios.municipiosSeleccionados.has(nombreMunicipio);
}

/**
 * Actualiza el contador de municipios mostrados
 * @param {number} cantidad - Cantidad de municipios
 * @param {string} descripcion - Descripción de lo mostrado
 */
function actualizarContadorMunicipios(cantidad, descripcion) {
    const contador = document.getElementById("contadorMunicipios");

    if (!contador) {
        console.warn("Elemento contadorMunicipios no encontrado");
        return;
    }

    if (cantidad === 0) {
        contador.textContent = "(0)";
    } else {
        contador.textContent = `(${cantidad})`;
    }
}

/**
 * Limpia todos los filtros de municipios
 */
function limpiarFiltrosMunicipios() {
    deseleccionarTodosMunicipios();
    actualizarCheckboxesMunicipios();
}

/**
 * Actualiza el estado de los checkboxes de municipios en el UI
 */
function actualizarCheckboxesMunicipios() {
    const checkboxes = document.querySelectorAll(
        'input[name="filtro-municipio"]'
    );
    checkboxes.forEach((checkbox) => {
        checkbox.checked = municipioEstaSeleccionado(checkbox.value);
    });
}

/**
 * Genera el HTML de los checkboxes de municipios dinámicamente
 * @returns {string} HTML de los checkboxes
 */
function generarCheckboxesMunicipios() {
    const municipiosCargados = cargarYListarMunicipios();
    let html = "";

    municipiosCargados.forEach((municipio, index) => {
        const id = `fMunicipio${index}`;
        html += `
      <div class="form-check">
        <input class="form-check-input" type="checkbox" name="filtro-municipio" 
               value="${municipio.nombre}" id="${id}" 
               onchange="alternarSeleccionMunicipio('${municipio.nombre}')">
        <label class="form-check-label fs-sm" for="${id}">
          ${municipio.nombre}
        </label>
      </div>
    `;
    });

    return html;
}

/**
 * Inicializa los checkboxes de municipios en el contenedor especificado
 * @param {string} contenedorId - ID del contenedor donde insertar los checkboxes
 */
function inicializarCheckboxesMunicipios(
    contenedorId = "contenedor-filtros-municipios"
) {
    const contenedor = document.getElementById(contenedorId);

    if (!contenedor) {
        console.warn(`Contenedor con ID "${contenedorId}" no encontrado`);
        return;
    }

    const html = generarCheckboxesMunicipios();
    contenedor.innerHTML = html;
}

/**
 * Filtra municipios por nombre (búsqueda)
 * @param {string} termino - Término de búsqueda
 */
function filtrarMunicipiosPorNombre(termino) {
    const datosOriginales = obtenerDatosMunicipios();

    if (!datosOriginales || datosOriginales.length === 0) {
        console.warn("No hay datos de municipios para filtrar");
        return;
    }

    let datosFiltrados = datosOriginales;

    if (termino.trim() !== "") {
        datosFiltrados = datosOriginales.filter((feature) => {
            const nombreMunicipio = feature.properties?.NOMBRE || "";
            return nombreMunicipio
                .toLowerCase()
                .includes(termino.toLowerCase());
        });
    }

    const nuevaCapa = crearCapaMunicipios(datosFiltrados);
    actualizarCapaMunicipios(nuevaCapa);

    actualizarContadorMunicipios(
        datosFiltrados.length,
        termino.trim() !== "" ? `"${termino}"` : "Todos los municipios"
    );
}

/**
 * Limpia el filtro de búsqueda de municipios
 */
function limpiarFiltroMunicipios() {
    const inputBusquedaMunicipio = document.getElementById("busquedaMunicipio");
    if (inputBusquedaMunicipio) {
        inputBusquedaMunicipio.value = "";
        filtrarMunicipiosPorNombre("");
    }
}
