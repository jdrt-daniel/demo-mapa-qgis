/**
 * Estado del filtro de localidades por establecimiento
 */
const estadoFiltroLocalidad = {
  activo: false,
  establecimientoSeleccionado: null,
  codigoEstablecimientoSeleccionado: null,
};

/**
 * Alterna el estado del filtro por establecimiento
 */
function alternarFiltroLocalidadesPorEstablecimiento() {
  estadoFiltroLocalidad.activo = !estadoFiltroLocalidad.activo;
  const checkbox = document.getElementById("cbFiltrarLocalidadesPorEst");

  if (checkbox) {
    estadoFiltroLocalidad.activo = checkbox.checked;
  }

  if (estadoFiltroLocalidad.activo) {
    aplicarFiltroLocalidadesPorEstablecimiento();
  } else {
    // Si se desactiva, mostrar todas las localidades y áreas de influencia
    const todasLocalidades = obtenerDatosLocalidades();
    if (todasLocalidades && todasLocalidades.length > 0) {
      const nuevaCapa = crearCapaLocalidades(todasLocalidades);
      actualizarCapaLocalidades(nuevaCapa);
      actualizarContadorLocalidades(todasLocalidades.length, "");
    }

    // Mostrar todas las áreas de influencia
    const todasAreaInfluencia = obtenerDatosAreaInfluencia();
    if (todasAreaInfluencia && todasAreaInfluencia.length > 0) {
      const nuevaCapa = crearCapaAreaInfluencia(todasAreaInfluencia);
      actualizarCapaAreaInfluencia(nuevaCapa);
    }
  }
}

/**
 * Establece el establecimiento seleccionado para filtrar localidades
 * @param {string} codigoEstablecimiento - Código del establecimiento
 * @param {string} nombreEstablecimiento - Nombre del establecimiento
 */
function establecerEstablecimientoParaLocalidades(
  codigoEstablecimiento,
  nombreEstablecimiento
) {
  estadoFiltroLocalidad.codigoEstablecimientoSeleccionado =
    codigoEstablecimiento;
  estadoFiltroLocalidad.establecimientoSeleccionado = nombreEstablecimiento;

  // Si el filtro está activo, aplicar filtro
  if (estadoFiltroLocalidad.activo) {
    aplicarFiltroLocalidadesPorEstablecimiento();
  }
}

/**
 * Aplica el filtro de localidades por establecimiento seleccionado
 */
function aplicarFiltroLocalidadesPorEstablecimiento() {
  const datosOriginalesLocalidades = obtenerDatosLocalidades();

  if (!datosOriginalesLocalidades || datosOriginalesLocalidades.length === 0) {
    console.warn("No hay datos de localidades para filtrar");
    return;
  }

  // Validar que hay un establecimiento seleccionado
  if (!estadoFiltroLocalidad.codigoEstablecimientoSeleccionado) {
    console.warn("No hay establecimiento seleccionado");
    const nuevaCapa = crearCapaLocalidades([]);
    actualizarCapaLocalidades(nuevaCapa);
    actualizarContadorLocalidades(0, "Sin establecimiento seleccionado");
    return;
  }

  // Filtrar áreas de influencia por el mismo código de establecimiento
  const datosOriginalesAreaInfluencia = obtenerDatosAreaInfluencia();
  const areaInfluenciaFiltrada = datosOriginalesAreaInfluencia.filter(
    (feature) => {
      const codEstAreaInfluencia =
        feature.properties?.CODESTSAL || feature.properties?.CODESTSAL || "";
      return (
        codEstAreaInfluencia ===
        estadoFiltroLocalidad.codigoEstablecimientoSeleccionado
      );
    }
  );

  // Crear nueva capa con datos filtrados de área de influencia
  const nuevaCapaAreaInfluencia = crearCapaAreaInfluencia(
    areaInfluenciaFiltrada
  );
  actualizarCapaAreaInfluencia(nuevaCapaAreaInfluencia);

  // Filtrar localidades por código de establecimiento
  const localidadesFiltradas = datosOriginalesLocalidades.filter((feature) => {
    const codEstRefLocalidad = feature.properties?.CODESALREF || "";
    return (
      codEstRefLocalidad ===
      estadoFiltroLocalidad.codigoEstablecimientoSeleccionado
    );
  });

  // Crear nueva capa con datos filtrados de localidades
  const nuevaCapaLocalidades = crearCapaLocalidades(localidadesFiltradas);
  actualizarCapaLocalidades(nuevaCapaLocalidades);

  // Actualizar contador
  const descripcionFiltro = `${
    estadoFiltroLocalidad.establecimientoSeleccionado ||
    "Establecimiento seleccionado"
  }`;
  actualizarContadorLocalidades(localidadesFiltradas.length, descripcionFiltro);

  console.log(
    `Mostrando ${localidadesFiltradas.length} localidades y ${areaInfluenciaFiltrada.length} área(s) de influencia del establecimiento: ${estadoFiltroLocalidad.establecimientoSeleccionado}`
  );
}

/**
 * Obtiene el estado del filtro de localidades
 * @returns {boolean}
 */
function filtroLocalidadActivo() {
  return estadoFiltroLocalidad.activo;
}

/**
 * Obtiene los datos de localidades
 * @returns {array} Array de features de localidades
 */
function obtenerDatosLocalidades() {
  return datos.localidades;
}

/**
 * Actualiza el contador de localidades mostradas
 * @param {number} cantidad - Cantidad de localidades
 * @param {string} descripcion - Descripción de lo mostrado
 */
function actualizarContadorLocalidades(cantidad, descripcion) {
  const contador = document.getElementById("contadorLocalidades");

  if (!contador) {
    console.warn("Elemento contadorLocalidades no encontrado");
    return;
  }

  if (cantidad === 0) {
    contador.textContent = "(0)";
  } else {
    contador.textContent = `(${cantidad})`;
  }
}

/**
 * Crea la capa visual de localidades
 * @param {array} features - Array de features GeoJSON
 * @returns {L.geoJSON}
 */
function crearCapaLocalidades(features) {
  return L.geoJSON(
    {
      type: "FeatureCollection",
      features: features,
    },
    {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: 4,
          fillColor: "#ff7800",
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 1,
        });
      },
      onEachFeature: function (feature, layer) {
        if (feature.properties) {
          layer.bindPopup(
            crearPopupContenido(feature.properties, "Localidad", [
              {
                key: "NOMBRE",
                label: "Nombre",
              },
              {
                key: "ESTSALREF",
                label: "Establecimiento ref",
              },
            ])
          );
        }
      },
    }
  );
}

/**
 * Actualiza la capa de localidades en el mapa
 * @param {L.geoJSON} nuevaCapa - Nueva capa de localidades
 */
function actualizarCapaLocalidades(nuevaCapa) {
  if (capas.localidades && map.hasLayer(capas.localidades)) {
    map.removeLayer(capas.localidades);
  }
  capas.localidades = nuevaCapa;
  if (capasVisibles.localidades) {
    capas.localidades.addTo(map);
  }
}
