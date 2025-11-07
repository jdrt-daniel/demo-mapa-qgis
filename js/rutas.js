// Estado de rutas
const rutasState = {
  activa: false,
  startPoint: null,
  startPointName: null,
  endPoint: null,
  endPointName: null,
  routingControl: null,
  startMarker: null,
  endMarker: null,
};

/**
 * Crea un botón personalizado para el popup de rutas
 * @param {string} label - Texto del botón
 * @param {HTMLElement} container - Contenedor del botón
 * @param {string} color - Color de Bootstrap (primary, warning, danger, etc.)
 * @returns {HTMLElement} Elemento del botón
 */
function crearBotonRuta(label, container, color) {
  const btn = L.DomUtil.create("button", "", container);
  btn.setAttribute("type", "button");
  btn.className = `btn btn-${color} btn-sm`;
  btn.innerHTML = label;
  return btn;
}

/**
 * Establece un punto como inicio de ruta desde un establecimiento
 * @param {L.LatLng} latlng - Coordenadas del punto
 * @param {string} nombreEstablecimiento - Nombre del establecimiento
 */
function establecerPuntoInicio(latlng, nombreEstablecimiento) {
  rutasState.startPoint = latlng;
  rutasState.startPointName = nombreEstablecimiento;
  map.closePopup();
  actualizarRuta();
  mostrarNotificacion(
    `Inicio establecido: ${nombreEstablecimiento}`,
    "success"
  );
}

/**
 * Establece un punto como destino de ruta desde un establecimiento
 * @param {L.LatLng} latlng - Coordenadas del punto
 * @param {string} nombreEstablecimiento - Nombre del establecimiento
 */
function establecerPuntoDestino(latlng, nombreEstablecimiento) {
  rutasState.endPoint = latlng;
  rutasState.endPointName = nombreEstablecimiento;
  map.closePopup();
  actualizarRuta();
  mostrarNotificacion(
    `Destino establecido: ${nombreEstablecimiento}`,
    "success"
  );
}

/**
 * Muestra una notificación al usuario
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} tipo - Tipo de alerta (success, warning, danger, info)
 */
function mostrarNotificacion(mensaje, tipo = "info") {
  const alertDiv = document.createElement("div");
  alertDiv.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
  alertDiv.style.bottom = "20px";
  alertDiv.style.right = "20px";
  alertDiv.style.zIndex = "9999";
  alertDiv.style.minWidth = "300px";
  alertDiv.innerHTML = `
    ${mensaje}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  `;
  document.body.appendChild(alertDiv);

  setTimeout(() => {
    alertDiv.remove();
  }, 4000);
}

/**
 * Inicializa el control de enrutamiento de Leaflet Routing Machine
 */
function inicializarControlEnrutamiento() {
  // Remover control anterior si existe
  if (rutasState.routingControl) {
    map.removeControl(rutasState.routingControl);
  }

  const waypoints = [];
  if (rutasState.startPoint) waypoints.push(rutasState.startPoint);
  if (rutasState.endPoint) waypoints.push(rutasState.endPoint);

  // Solo crear control si hay al menos 2 puntos
  if (waypoints.length < 2) {
    return;
  }

  rutasState.routingControl = L.Routing.control({
    waypoints: waypoints,
    routeWhileDragging: true,
    lineOptions: {
      styles: [{ color: "#FF3A33FF", opacity: 1, weight: 5 }],
    },
    show: true,
    addWaypoints: false,
    draggableWaypoints: false,
    formatter: new L.Routing.Formatter({ roundingSensitivity: 0.1 }),
  });

  rutasState.routingControl.addTo(map);
}

/**
 * Actualiza la ruta y los marcadores en el mapa
 */
function actualizarRuta() {
  inicializarControlEnrutamiento();

  // Remover marcadores anteriores
  if (rutasState.startMarker) {
    map.removeLayer(rutasState.startMarker);
  }
  if (rutasState.endMarker) {
    map.removeLayer(rutasState.endMarker);
  }

  // Crear marcador de inicio
  if (rutasState.startPoint) {
    const popupContent = `
      <div style="text-align: center;">
        <strong>Inicio</strong><br>
        ${rutasState.startPointName || "Punto de inicio"}
        <br><br>
        <button class="btn btn-danger btn-sm" onclick="limpiarPuntoInicio()">
          Limpiar
        </button>
      </div>
    `;

    rutasState.startMarker = L.marker(rutasState.startPoint, {
      icon: L.divIcon({
        className: "custom-icon jumping-marker",
        html: '<i class="fas fa-map-marker-alt" style="color: #0d6efd; font-size: 50px;"></i>',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      }),
    })
      .bindPopup(popupContent)
      .addTo(map);
  }

  // Crear marcador de destino
  if (rutasState.endPoint) {
    const popupContent = `
      <div style="text-align: center;">
        <strong>Destino</strong><br>
        ${rutasState.endPointName || "Punto de destino"}
        <br><br>
        <button class="btn btn-danger btn-sm" onclick="limpiarPuntoDestino()">
          Limpiar
        </button>
      </div>
    `;

    rutasState.endMarker = L.marker(rutasState.endPoint, {
      icon: L.divIcon({
        className: "custom-icon jumping-marker",
        html: '<i class="fas fa-map-marker-alt" style="color: #ffc107; font-size: 50px;"></i>',
        iconSize: [50, 50],
        iconAnchor: [25, 50],
      }),
    })
      .bindPopup(popupContent)
      .addTo(map);
  }
}

/**
 * Limpia el punto de inicio
 */
function limpiarPuntoInicio() {
  rutasState.startPoint = null;
  rutasState.startPointName = null;
  if (rutasState.startMarker) {
    map.removeLayer(rutasState.startMarker);
    rutasState.startMarker = null;
  }
  if (rutasState.routingControl) {
    map.removeControl(rutasState.routingControl);
    rutasState.routingControl = null;
  }
  map.closePopup();
  mostrarNotificacion("Punto de inicio eliminado", "warning");
}

/**
 * Limpia el punto de destino
 */
function limpiarPuntoDestino() {
  rutasState.endPoint = null;
  rutasState.endPointName = null;
  if (rutasState.endMarker) {
    map.removeLayer(rutasState.endMarker);
    rutasState.endMarker = null;
  }
  if (rutasState.routingControl) {
    map.removeControl(rutasState.routingControl);
    rutasState.routingControl = null;
  }
  map.closePopup();
  mostrarNotificacion("Punto de destino eliminado", "warning");
}

/**
 * Desactiva la interacción de rutas en el mapa
 */
function desactivarInteraccionRutas() {
  rutasState.activa = false;
  limpiarRuta();
  console.log("Interacción de rutas desactivada");
}

/**
 * Alterna la interacción de rutas (activar/desactivar)
 */
function alternarInteraccionRutas() {
  if (rutasState.activa) {
    desactivarInteraccionRutas();
    document.getElementById("limpiarRuta").style.display = "none";
  } else {
    rutasState.activa = true;
    document.getElementById("limpiarRuta").style.display = "block";
    console.log(
      "Interacción de rutas activada - Selecciona establecimientos en el mapa"
    );
  }
}

/**
 * Limpia completamente la ruta y sus elementos visuales
 */
function limpiarRuta() {
  rutasState.startPoint = null;
  rutasState.startPointName = null;
  rutasState.endPoint = null;
  rutasState.endPointName = null;

  // Remover marcadores
  if (rutasState.startMarker) {
    map.removeLayer(rutasState.startMarker);
    rutasState.startMarker = null;
  }
  if (rutasState.endMarker) {
    map.removeLayer(rutasState.endMarker);
    rutasState.endMarker = null;
  }

  // Remover control de enrutamiento
  if (rutasState.routingControl) {
    map.removeControl(rutasState.routingControl);
    rutasState.routingControl = null;
  }
}

/**
 * Obtiene el estado actual de la interacción de rutas
 * @returns {boolean} True si las rutas están activas
 */
function rutasActivas() {
  return rutasState.activa;
}

/**
 * Obtiene los datos actuales de la ruta
 * @returns {object} Objeto con startPoint, endPoint y estado
 */
function obtenerDatosRuta() {
  return {
    startPoint: rutasState.startPoint,
    startPointName: rutasState.startPointName,
    endPoint: rutasState.endPoint,
    endPointName: rutasState.endPointName,
    activa: rutasState.activa,
  };
}
