// Estado global de las capas
const capasVisibles = {
    establecimientos: true,
    red: false,
    municipios: false,
    localidades: false,
    redvial: false,
    macroregiones: false,
    areaInfluencia: false,
};

// Almacenamiento de capas y datos
const capas = {
    establecimientos: null,
    red: null,
    municipios: null,
    localidades: null,
    bolivia: null,
    cochabamba: null,
    redvial: null,
    macroregiones: null,
    areaInfluencia: null,
};

// Almacenamiento de datos
const datos = {
    establecimientos: [],
    redes: [],
    municipios: [],
    macroregiones: [],
    localidades: [],
    areaInfluencia: [],
    datosEstablecimientos: [],
    serviciosEstablecimientos: [],
};

// Configuración de iconos por tipo de establecimiento
const configuracionIconos = {
    H3: { icon: "hospital", color: "red" },
    IE: { icon: "hospital", color: "red" },
    H2: { icon: "hospital", color: "red" },
    CSCI: { icon: "bed-pulse", color: "orange" },
    CSA: { icon: "person-cane", color: "blue" },
    PS: { icon: "plus", color: "purple" },
    CSIN: { icon: "heart-pulse", color: "pink" },
};

// Función para obtener el icono
function obtenerIcono(tipo) {
    return configuracionIconos[tipo] || { icon: "hospital", color: "gray" };
}

// Función para cargar la capa de Bolivia
function cargarBolivia() {
    if (capas.bolivia) {
        return Promise.resolve(capas.bolivia);
    }

    return fetch("data/bolivia.geojson")
        .then((response) => response.json())
        .then((data) => {
            capas.bolivia = L.geoJSON(data, {
                style: function () {
                    return {
                        fill: false,
                        color: "#000000",
                        weight: 3,
                        opacity: 1,
                        fillOpacity: 0,
                    };
                },
            });
            capas.bolivia.addTo(map);
            return capas.bolivia;
        })
        .catch((error) => console.error("Error cargando Bolivia:", error));
}

// Función para cargar la capa de Cochabamba
function cargarCochabamba() {
    if (capas.cochabamba) {
        return Promise.resolve(capas.cochabamba);
    }

    return fetch("data/cochabamba.geojson")
        .then((response) => response.json())
        .then((data) => {
            capas.cochabamba = L.geoJSON(data, {
                style: function () {
                    return {
                        fill: false,
                        color: "#000000",
                        weight: 2,
                        opacity: 1,
                        fillOpacity: 0,
                    };
                },
            });
            capas.cochabamba.addTo(map);
            return capas.cochabamba;
        })
        .catch((error) => console.error("Error cargando Cochabamba:", error));
}

// Función para cargar la capa de Redes
function cargarRed() {
    if (capas.red) {
        toggle_layer("red");
        return Promise.resolve();
    }

    return fetch("data/redes.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.redes = data.features || [];
            capas.red = crearCapaRedes(datos.redes);

            if (capasVisibles.red) {
                capas.red.addTo(map);
            }
        })
        .catch((error) => console.error("Error cargando Red:", error));
}

// Función para cargar la capa de Municipios
function cargarMunicipios() {
    if (capas.municipios) {
        toggle_layer("municipios");
        return Promise.resolve();
    }

    return fetch("data/municipios.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.municipios = data.features || [];
            capas.municipios = L.geoJSON(data, {
                style: function () {
                    return {
                        color: "red",
                        weight: 2,
                        opacity: 0.7,
                        fillOpacity: 0.1,
                    };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {
                        layer.bindPopup(
                            crearPopupContenido(
                                feature.properties,
                                "Municipio",
                                [
                                    {
                                        key: "NOMBRE",
                                        label: "Nombre",
                                    },
                                    {
                                        key: "NOMREDSAL",
                                        label: "Red Ref",
                                    },
                                ]
                            )
                        );
                    }
                },
            });

            if (capasVisibles.municipios) {
                capas.municipios.addTo(map);
            }
        })
        .catch((error) => console.error("Error cargando Municipios:", error));
}

// Función para cargar la capa de Localidades
function cargarLocalidades() {
    if (capas.localidades) {
        toggle_layer("localidades");
        return Promise.resolve();
    }

    return fetch("data/localidades.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.localidades = data.features || [];
            capas.localidades = L.geoJSON(data, {
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
                            crearPopupContenido(
                                feature.properties,
                                "Localidad",
                                [
                                    {
                                        key: "NOMBRE",
                                        label: "Nombre",
                                    },
                                    {
                                        key: "ESTSALREF",
                                        label: "Establecimiento ref",
                                    },
                                ]
                            )
                        );
                    }
                },
            });

            if (capasVisibles.localidades) {
                capas.localidades.addTo(map);
            }
        })
        .catch((error) => console.error("Error cargando Localidades:", error));
}

// Función para cargar la capa de Red Vial
function cargarRedVial() {
    if (capas.redvial) {
        toggle_layer("redvial");
        return Promise.resolve();
    }

    return fetch("data/redvial_fundamental.geojson")
        .then((response) => response.json())
        .then((data) => {
            capas.redvial = L.geoJSON(data, {
                style: function () {
                    return {
                        color: "brown",
                        weight: 3,
                        opacity: 1,
                        fillOpacity: 0,
                    };
                },
                onEachFeature: function (feature, layer) {
                    if (feature.properties) {
                        layer.bindPopup(
                            crearPopupContenido(
                                feature.properties,
                                "Red Vial",
                                ["NOMLOC", "ESTSALREF"]
                            )
                        );
                    }
                },
            });

            if (capasVisibles.redvial) {
                capas.redvial.addTo(map);
            }
        })
        .catch((error) => console.error("Error cargando Red Vial:", error));
}

// Función para cargar la capa de Macroregiones
function cargarMacroregiones() {
    if (capas.macroregiones) {
        toggle_layer("macroregiones");
        return Promise.resolve();
    }

    return fetch("data/macroregiones.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.macroregiones = data.features || [];
            capas.macroregiones = crearCapaMacroregiones(datos.macroregiones);

            if (capasVisibles.macroregiones) {
                capas.macroregiones.addTo(map);
            }
        })
        .catch((error) =>
            console.error("Error cargando Macroregiones:", error)
        );
}

// Función para cargar la capa de Area de Influencia
function cargarAreaInfluencia() {
    if (capas.areaInfluencia) {
        toggle_layer("areaInfluencia");
        return Promise.resolve();
    }

    return fetch("data/areainfluencia.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.areaInfluencia = data.features || [];
            capas.areaInfluencia = crearCapaAreaInfluencia(
                datos.areaInfluencia
            );

            if (capasVisibles.areaInfluencia) {
                capas.areaInfluencia.addTo(map);
            }
        })
        .catch((error) =>
            console.error("Error cargando Area de Influencia:", error)
        );
}

// Función para cargar la capa de Establecimientos
function cargarEstablecimientos() {
    if (capas.establecimientos) {
        toggle_layer("establecimientos");
        return Promise.resolve();
    }

    return fetch("data/establecimientos.geojson")
        .then((response) => response.json())
        .then((data) => {
            datos.establecimientos = data.features || [];
            capas.establecimientos = crearCapaEstablecimientos(
                datos.establecimientos
            );

            if (capasVisibles.establecimientos) {
                capas.establecimientos.addTo(map);
            }
        })
        .catch((error) =>
            console.error("Error cargando Establecimientos:", error)
        );
}

// Función para cargar los datos de establecimientos
function cargarDatosExtraEstablecimiento() {
    return fetch("data/datosgenerales_eess.geojson")
        .then((response) => response.json())
        .then((data) => {
            const nuevoDatos = data.features.map((feature) => {
                return feature.properties;
            });

            datos.datosEstablecimientos = nuevoDatos || [];
        })
        .catch((error) =>
            console.error("Error cargando Establecimientos:", error)
        );
}

// Funcion para cargar los datos de servicios de establecimientos
function cargarDatosServicios() {
    return fetch("data/servicios.geojson")
        .then((response) => response.json())
        .then((data) => {
            const nuevoDatos = data.features.map((feature) => {
                return feature.properties;
            });
            datos.serviciosEstablecimientos = nuevoDatos || [];
        })
        .catch((error) =>
            console.error("Error cargando Establecimientos:", error)
        );
}

function crearCapaEstablecimientos(features) {
    return L.geoJSON(
        {
            type: "FeatureCollection",
            features: features,
        },
        {
            pointToLayer: function (feature, latlng) {
                const tipo = feature.properties?.TIPO || "UNKNOWN";
                const iconConfig = obtenerIcono(tipo);
                return L.marker(latlng, {
                    icon: L.AwesomeMarkers.icon({
                        icon: iconConfig.icon,
                        markerColor: iconConfig.color,
                        markerType: "circle",
                        prefix: "fa",
                    }),
                });
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    try {
                        layer.bindPopup("", {
                            maxWidth: 350,
                            className: "popup-establecimiento",
                        });

                        layer.on("click", function (e) {
                            L.DomEvent.stopPropagation(e);

                            // Crear contenido fresco cada vez que se abre
                            const popupContent = crearPopupEstablecimiento(
                                feature.properties,
                                e.latlng
                            );
                            // Usar setPopupContent en lugar de bindPopup
                            layer.setPopupContent(popupContent);
                            layer.openPopup(e.latlng);
                        });
                    } catch (error) {
                        console.error(
                            "Error al procesar establecimiento:",
                            error
                        );
                    }
                }
            },
        }
    );
}

function toggle_layer(tipo) {
    capasVisibles[tipo] = !capasVisibles[tipo];

    if (capas[tipo]) {
        if (capasVisibles[tipo]) {
            capas[tipo].addTo(map);
        } else {
            map.removeLayer(capas[tipo]);
        }
    }
}

function crearPopupContenido(
    propiedades,
    titulo = "Información",
    show = [
        {
            key: "NOMBRE",
            label: "Nombre",
        },
        {
            key: "CODIGO",
            label: "Código",
        },
    ]
) {
    let contenido = `<div> <div class="mb-1 font-weight-bold"> <strong>${titulo}</strong> </div>`;
    for (let key in propiedades) {
        for (let item of show) {
            if (item.key === key) {
                contenido += `<div > <strong>${item.label}</strong>: ${propiedades[key]}</div>`;
            }
        }
    }
    contenido += "</div>";
    return contenido;
}

function crearPopupEstablecimiento(propiedades, latlng) {
    try {
        const datosExtra = obtenerDatosPorEstablecimientoId(
            propiedades.CODESTSAL
        );

        const contenedor = document.createElement("div");
        contenedor.className = "min-width-250";
        contenedor.style.minWidth = "300px";

        // Título del establecimiento
        const titulo = document.createElement("h6");
        titulo.className = "mb-1 font-weight-bold";
        titulo.textContent = propiedades.ESTSALUD || "Establecimiento";
        contenedor.appendChild(titulo);

        const hr1 = document.createElement("hr");
        hr1.className = "my-2";
        contenedor.appendChild(hr1);

        // Información de Red
        const red = document.createElement("div");
        red.className = "mb-1 fs-sm";
        red.innerHTML = `<strong>Red:</strong> ${
            propiedades.REDSALUD || "N/A"
        }`;
        contenedor.appendChild(red);

        // Información de Municipio
        const municipio = document.createElement("div");
        municipio.className = "mb-1 fs-sm";
        municipio.innerHTML = `<strong>Municipio:</strong> ${
            propiedades.MUNICIPIO || "N/A"
        }`;
        contenedor.appendChild(municipio);

        // Tipo de establecimiento
        const tipo = document.createElement("div");
        tipo.className = "mb-1 fs-sm";
        tipo.innerHTML = `<strong>Tipo:</strong> ${
            propiedades.TIPOEST || "N/A"
        }`;
        contenedor.appendChild(tipo);

        // Nivel
        const nivel = document.createElement("div");
        nivel.className = "mb-1 fs-sm";
        nivel.innerHTML = `<strong>Nivel:</strong> ${
            propiedades.NIVELRES || "N/A"
        } nivel`;
        contenedor.appendChild(nivel);

        // Población
        const poblacion = document.createElement("div");
        poblacion.className = "mb-1 fs-sm";
        poblacion.innerHTML = `<strong>Población:</strong> ${
            datosExtra.POB_ASIG || "N/A"
        }`;
        contenedor.appendChild(poblacion);

        const hr2 = document.createElement("hr");
        hr2.className = "my-2";
        contenedor.appendChild(hr2);

        // Sección de rutas (siempre creada, solo visible si activo)
        const seccionRutas = document.createElement("div");
        seccionRutas.className = "mb-2";
        seccionRutas.style.display = rutasActivas() ? "block" : "none";

        const tituloRutas = document.createElement("div");
        tituloRutas.className = "font-weight-bold mb-2 fs-sm";
        tituloRutas.textContent = "Establecer como punto de ruta";
        seccionRutas.appendChild(tituloRutas);

        // Botón inicio
        const btnInicio = document.createElement("button");
        btnInicio.type = "button";
        btnInicio.className = "btn btn-primary btn-sm btn-block mb-1";
        btnInicio.style.width = "100%";
        btnInicio.innerHTML = '<i class="fas fa-map-marker-alt"></i> Inicio';
        btnInicio.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            establecerPuntoInicio(
                latlng,
                propiedades.ESTSALUD || "Punto de inicio"
            );
        };
        seccionRutas.appendChild(btnInicio);

        // Botón destino
        const btnDestino = document.createElement("button");
        btnDestino.type = "button";
        btnDestino.className = "btn btn-warning btn-sm btn-block";
        btnDestino.style.width = "100%";
        btnDestino.innerHTML = '<i class="fas fa-flag"></i> Destino';
        btnDestino.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            establecerPuntoDestino(
                latlng,
                propiedades.ESTSALUD || "Punto de destino"
            );
        };
        seccionRutas.appendChild(btnDestino);

        contenedor.appendChild(seccionRutas);

        const hr3 = document.createElement("hr");
        hr3.className = "my-2";
        hr3.style.display = rutasActivas() ? "block" : "none";
        contenedor.appendChild(hr3);

        // Sección para filtrar localidades (siempre creada, solo visible si activo)
        const seccionLocalidades = document.createElement("div");
        seccionLocalidades.className = "mb-2";
        seccionLocalidades.style.display = filtroLocalidadActivo()
            ? "block"
            : "none";

        const tituloLocalidades = document.createElement("div");
        tituloLocalidades.className = "font-weight-bold mb-2 fs-sm";
        tituloLocalidades.textContent = "Localidades";
        seccionLocalidades.appendChild(tituloLocalidades);

        // Botón para mostrar localidades
        const btnLocalidades = document.createElement("button");
        btnLocalidades.type = "button";
        btnLocalidades.className = "btn btn-info btn-sm btn-block";
        btnLocalidades.style.width = "100%";
        btnLocalidades.innerHTML =
            '<i class="fas fa-map-pin"></i> Ver area y localidades';
        btnLocalidades.onclick = function (e) {
            e.preventDefault();
            e.stopPropagation();
            // Obtener código del establecimiento
            const codigoEst = propiedades.CODESTSAL || propiedades.CODEST || "";

            console.log(codigoEst);
            if (codigoEst) {
                establecerEstablecimientoParaLocalidades(
                    codigoEst,
                    propiedades.ESTSALUD
                );
            } else {
                mostrarNotificacion(
                    "No se pudo obtener el código del establecimiento",
                    "warning"
                );
            }
        };
        seccionLocalidades.appendChild(btnLocalidades);

        contenedor.appendChild(seccionLocalidades);

        const hr4 = document.createElement("hr");
        hr4.className = "my-2";
        hr4.style.display = filtroLocalidadActivo() ? "block" : "none";
        contenedor.appendChild(hr4);

        // Sección de más información
        const masInfo = document.createElement("div");
        masInfo.className = "mb-2 font-weight-bold fs-sm";
        masInfo.textContent = "Más información";
        contenedor.appendChild(masInfo);

        // Enlaces
        const linksContainer = document.createElement("div");

        const link1 = document.createElement("a");
        link1.className = "d-block mb-1 fs-sm";
        link1.href = `http://localhost:8000/establecimiento/${propiedades.CODESTSAL}/detalle`;
        link1.target = "_blank"; // This makes it open in a new tab
        link1.rel = "noopener noreferrer"; // Security best practice when using target="_blank"
        link1.textContent = "Ver más información";
        linksContainer.appendChild(link1);

        const link2 = document.createElement("a");
        link2.className = "d-block mb-1 fs-sm";
        link2.href = "javascript:void(0);";
        link2.textContent = "Ver servicios";
        link2.onclick = function (e) {
            e.preventDefault();
            obtenerServiciosPorEstablecimientoId(propiedades.CODESTSAL);
            $("#modalServicios").modal("show");
        };
        linksContainer.appendChild(link2);

        const link3 = document.createElement("a");
        link3.className = "d-block mb-1 fs-sm";
        link3.href = "javascript:void(0);";
        link3.textContent = "Ver localidades";
        link3.onclick = function (e) {
            e.preventDefault();
            obtenerLocalidadesPorEstablecimientoId(propiedades.CODESTSAL);
            $("#modalLocalidades").modal("show");
        };
        linksContainer.appendChild(link3);

        const link4 = document.createElement("a");
        link4.className = "d-block mb-1 fs-sm";
        link4.href = "javascript:void(0);";
        link4.textContent = "Ver referencias";
        link4.onclick = function (e) {
            e.preventDefault();
            obtenerReferenciasPorEstablecimientoId(datosExtra);
            $("#modalReferencias").modal("show");
        };
        linksContainer.appendChild(link4);

        contenedor.appendChild(linksContainer);

        return contenedor;
    } catch (error) {
        console.error("Error creando popup de establecimiento:", error);

        // Fallback en caso de error
        const fallbackDiv = document.createElement("div");
        fallbackDiv.innerHTML = `
      <div style="padding: 10px;">
        <strong>${propiedades.ESTSALUD || "Establecimiento"}</strong>
        <p style="margin: 10px 0 0 0; font-size: 12px;">
          Red: ${propiedades.REDSALUD || "N/A"}<br>
          Municipio: ${propiedades.MUNICIPIO || "N/A"}
        </p>
      </div>
    `;
        return fallbackDiv;
    }
}

function actualizarCheckbox(tipo) {
    const checkboxes = document.querySelectorAll(`input[onclick*="${tipo}"]`);
    const redesContador = document.getElementById("contadorRedes");
    const municipiosContador = document.getElementById("contadorMunicipios");
    const macrorregionesContador = document.getElementById(
        "contadorMacroregiones"
    );
    const areaInfluenciaContador = document.getElementById(
        "contadorAreaInfluencia"
    );
    checkboxes.forEach((checkbox) => {
        checkbox.checked = capasVisibles[tipo];
        if (tipo === "red" && !checkbox.checked) {
            redesContador.textContent = "";
        } else if (tipo === "municipios" && !checkbox.checked) {
            municipiosContador.textContent = "";
        } else if (tipo === "macroregiones" && !checkbox.checked) {
            macrorregionesContador.textContent = "";
        } else if (tipo === "areaInfluencia" && !checkbox.checked) {
            //areaInfluenciaContador.textContent = "";
        }
    });
}

function obtenerDatosEstablecimientos() {
    return datos.establecimientos;
}

function obtenerDatosPorEstablecimientoId(id) {
    const finding = datos.datosEstablecimientos.find((est) => {
        return est.COD_EESS == id;
    });
    if (!finding) {
        console.log("No se encontro el establecimiento " + id);
        return {
            NIVEL_RES: "N/A",
            TIPO_EESS: "N/A",
            POB_ASIG: 0,
            EESS_REF: "N/A",
            COD_ES_REF: 0,
            TIPO_ACC_REF: "N/A",
            DIST_REF: "N/A",
            TIEMPO_REF: "N/A",
            FISIO_REF: "N/A",
            EESS_REF2: "N/A",
            COD_ES_RF2: 0,
            TIPACC_REF2: "N/A",
            DIST_REF2: "N/A",
            TIEMPOREF2: "N/A",
            FISIO_REF2: "N/A",
            EESS_REF3: "N/A",
            COD_ES_RF3: 0,
            TIPACC_REF3: "N/A",
            DIST_REF3: "N/A",
            TIEMPOREF3: "N/A",
            FISIO_REF3: "N/A",
        };
    }

    return finding;
}

function obtenerServiciosPorEstablecimientoId(id) {
    const finding = datos.serviciosEstablecimientos.find((e) => {
        return e.COD_EESS == id;
    });

    const content = document.getElementById("bodyServicios");

    if (!finding) {
        content.innerHTML =
            '<tr><td colspan="3">No se encontraron datos para este establecimiento</td></tr>';
        return;
    }

    // content.innerHTML = "<div>Establecimiento: " + e.NOM_EESS + "</div>";

    // Create table HTML
    let tableHTML = `
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th>Servicio</th>
                    <th>Días</th>
                    <th>Horario</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Add rows for each service
    const services = {
        "Atención de Emergencias": { d: "URG_EMER_D", h: "URG_EMER_D" },
        Internación: { d: "INTERNAC_D", h: "INTERNAC_D" },
        Ecografía: { d: "ECOGRAF_D", h: "ECOGRAF_H" },
        "Laboratorio Clínico": { d: "LAB_CLI_D", h: "LAB_CLI_H" },
        Farmacia: { d: "FARMAC_D", h: "FARMAC_H" },
        Telemedicina: { d: "TELEMED_D", h: "TELEMED_H" },
        Odontología: { d: "ODON_AMB_D", h: "ODON_AMB_H" },
        "Laboratorio Básico": { d: "LAB_BAS_D", h: "LAB_BAS_H" },
        "Rayos X": { d: "RAYOS_X_D", h: "RAYOS_X_H" },
        Fisioterapia: { d: "FISIOTRP_D", h: "FISIOTRP_H" },
        Ecocardiografía: { d: "ECO_CARD_D", h: "ECO_CARD_H" },
        Pediatría: { d: "PEDIATRI_D", h: "PEDIATRI_H" },
        "Medicina Interna": { d: "MED_INT_D", h: "MED_INT_H" },
        "Ginecología y Obstetricia": { d: "GINE_OBS_D", h: "GINE_OBS_H" },
        "Cirugía General": { d: "CIRG_GRL_D", h: "CIRG_GRL_H" },
        Traumatología: { d: "TRAUMATO_D", h: "TRAUMATO_H" },
        Oftalmología: { d: "OFTALMO_D", h: "OFTALMO_H" },
        Otorrinolaringología: { d: "OTORRINO_D", h: "OTORRINO_H" },
        Urología: { d: "UROLOGIA_D", h: "UROLOGIA_H" },
        Cardiología: { d: "CARDIO_D", h: "CARDIO_H" },
    };

    // Add a row for each service
    Object.entries(services).forEach(([name, { d, h }]) => {
        const days = finding[d] || "No disponible";
        const hours = finding[h] || "No disponible";

        if (days !== "No disponible" || hours !== "No disponible") {
            tableHTML += `
                <tr>
                    <td>${name}</td>
                    <td>${days}</td>
                    <td>${hours}</td>
                </tr>
            `;
        }
    });

    // Close table
    tableHTML += `
            </tbody>
        </table>
    `;

    // Set the content
    content.innerHTML = tableHTML;
}

function obtenerLocalidadesPorEstablecimientoId(id) {
    const localidades = datos.localidades.filter((loc) => {
        return loc.properties.CODESALREF == id;
    });
    const content = document.getElementById("bodyLocalidades");
    content.innerHTML = "<div></div>";

    localidades.forEach((loc, index) => {
        const div = document.createElement("div");
        div.innerHTML = `<p>${index + 1} - ${loc.properties.NOMBRE}</p>`;
        content.appendChild(div);
    });

    return content;
}

function obtenerReferenciasPorEstablecimientoId(datos) {
    const content = document.getElementById("bodyReferencias");
    content.innerHTML = "<div>";
    content.innerHTML += `
    <table class="table table-bordered table-sm">
      <thead>
        <tr>
          <th>Establecimiento ref</th>
          <th>Distancia</th>
          <th>Tiempo</th>
          <th>Tipo</th>
          <th>Fisio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>${datos.EESS_REF || "---"}</td>
          <td>${datos.DIST_REF || "---"}</td>
          <td>${datos.TIEMPO_REF || "---"}</td>
          <td>${datos.TIPACC_REF || "---"}</td>
          <td>${datos.FISIO_REF || "---"}</td>
        </tr>
          <tr>
          <td>${datos.EESS_REF2 || "---"}</td>
          <td>${datos.DIST_REF2 || "---"}</td>
          <td>${datos.TIEMPO_REF2 || "---"}</td>
          <td>${datos.TIPACC_REF2 || "---"}</td>
          <td>${datos.FISIO_REF2 || "---"}</td>
        </tr>
          <tr>
          <td>${datos.EESS_REF3 || "---"}</td>
          <td>${datos.DIST_REF3 || "---"}</td>
          <td>${datos.TIEMPO_REF3 || "---"}</td>
          <td>${datos.TIPACC_REF3 || "---"}</td>
          <td>${datos.FISIO_REF3 || "---"}</td>
        </tr>
      </tbody>
    </table>
  `;
    content.innerHTML += "</div>";
    return content;
}

function obtenerCapaEstablecimientos() {
    return capas.establecimientos;
}

function actualizarCapaEstablecimientos(nuevaCapa) {
    if (capas.establecimientos && map.hasLayer(capas.establecimientos)) {
        map.removeLayer(capas.establecimientos);
    }
    capas.establecimientos = nuevaCapa;
    if (capasVisibles.establecimientos) {
        capas.establecimientos.addTo(map);
    }
}

function crearCapaRedes(features) {
    return L.geoJSON(
        {
            type: "FeatureCollection",
            features: features,
        },
        {
            style: function () {
                return {
                    color: "blue",
                    weight: 2,
                    opacity: 0.7,
                    fillOpacity: 0.2,
                };
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    layer.bindPopup(
                        crearPopupContenido(feature.properties, "Red", [
                            {
                                key: "NOMBRERED",
                                label: "Nombre",
                            },
                        ])
                    );
                }
            },
        }
    );
}

function obtenerDatosRedes() {
    return datos.redes;
}

function obtenerRedPorIndice(indice) {
    return datos.redes[indice] || null;
}

function agruparRedesPorPropiedad(propiedad = "NOMBRE") {
    const redAgrupada = {};

    datos.redes.forEach((feature, index) => {
        const nombreRed = feature.properties?.[propiedad] || `Red ${index}`;

        if (!redAgrupada[nombreRed]) {
            redAgrupada[nombreRed] = {
                nombre: nombreRed,
                indices: [],
                features: [],
            };
        }

        redAgrupada[nombreRed].indices.push(index);
        redAgrupada[nombreRed].features.push(feature);
    });

    return Object.values(redAgrupada);
}

function obtenerCapaRedes() {
    return capas.red;
}

function filtrarRedes(indices) {
    const redesTomostrar = indices
        .map((idx) => datos.redes[idx])
        .filter(Boolean);

    if (redesTomostrar.length === 0) {
        // Si no hay redes seleccionadas, mostrar todas
        const nuevaCapa = crearCapaRedes(datos.redes);
        actualizarCapaRedes(nuevaCapa);
    } else {
        const nuevaCapa = crearCapaRedes(redesTomostrar);
        actualizarCapaRedes(nuevaCapa);
    }
}

function filtrarRededesPorNombre(nombreRed, propiedad = "NOMBRE") {
    const redesFiltradas = datos.redes.filter((feature) => {
        const nombre = feature.properties?.[propiedad] || "";
        return nombre === nombreRed;
    });

    if (redesFiltradas.length === 0) {
        console.warn(`No se encontró red con nombre: ${nombreRed}`);
        return;
    }

    const nuevaCapa = crearCapaRedes(redesFiltradas);
    actualizarCapaRedes(nuevaCapa);
}

function actualizarCapaRedes(nuevaCapa) {
    if (capas.red && map.hasLayer(capas.red)) {
        map.removeLayer(capas.red);
    }
    capas.red = nuevaCapa;
    if (capasVisibles.red) {
        capas.red.addTo(map);
    }
}

function crearCapaMunicipios(features) {
    return L.geoJSON(
        {
            type: "FeatureCollection",
            features: features,
        },
        {
            style: function () {
                return {
                    color: "red",
                    weight: 2,
                    opacity: 0.7,
                    fillOpacity: 0.1,
                };
            },
            onEachFeature: function (feature, layer) {
                if (feature.properties) {
                    layer.bindPopup(
                        crearPopupContenido(feature.properties, "Municipio", [
                            {
                                key: "NOMBRE",
                                label: "Nombre",
                            },
                            {
                                key: "NOMREDSAL",
                                label: "Red Ref",
                            },
                        ])
                    );
                }
            },
        }
    );
}

function obtenerDatosMunicipios() {
    return datos.municipios;
}

function obtenerMunicipioPorIndice(indice) {
    return datos.municipios[indice] || null;
}

function agruparMunicipiosPorPropiedad(propiedad = "NOMBRE") {
    const municipioAgrupado = {};

    datos.municipios.forEach((feature, index) => {
        const nombreMunicipio =
            feature.properties?.[propiedad] || `Municipio ${index}`;

        if (!municipioAgrupado[nombreMunicipio]) {
            municipioAgrupado[nombreMunicipio] = {
                nombre: nombreMunicipio,
                indices: [],
                features: [],
            };
        }

        municipioAgrupado[nombreMunicipio].indices.push(index);
        municipioAgrupado[nombreMunicipio].features.push(feature);
    });

    return Object.values(municipioAgrupado);
}

function filtrarMunicipios(indices) {
    const municipiosMostrar = indices
        .map((idx) => datos.municipios[idx])
        .filter(Boolean);

    if (municipiosMostrar.length === 0) {
        // Si no hay municipios seleccionados, mostrar todos
        const nuevaCapa = crearCapaMunicipios(datos.municipios);
        actualizarCapaMunicipios(nuevaCapa);
    } else {
        const nuevaCapa = crearCapaMunicipios(municipiosMostrar);
        actualizarCapaMunicipios(nuevaCapa);
    }
}

function filtrarMunicipiosPorNombre(nombreMunicipio, propiedad = "NOMBRE") {
    const municipiosFiltrados = datos.municipios.filter((feature) => {
        const nombre = feature.properties?.[propiedad] || "";
        return nombre === nombreMunicipio;
    });

    if (municipiosFiltrados.length === 0) {
        console.warn(`No se encontró municipio con nombre: ${nombreMunicipio}`);
        return;
    }

    const nuevaCapa = crearCapaMunicipios(municipiosFiltrados);
    actualizarCapaMunicipios(nuevaCapa);
}

function actualizarCapaMunicipios(nuevaCapa) {
    if (capas.municipios && map.hasLayer(capas.municipios)) {
        map.removeLayer(capas.municipios);
    }
    capas.municipios = nuevaCapa;
    if (capasVisibles.municipios) {
        capas.municipios.addTo(map);
    }
}

function crearCapaMacroregiones(features) {
    return L.geoJSON(features, {
        style: function () {
            return {
                color: "green",
                weight: 2,
                opacity: 0.7,
                fillOpacity: 0.1,
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                layer.bindPopup(
                    crearPopupContenido(feature.properties, "Macroregion", [
                        {
                            key: "MACROREGIO",
                            label: "Nombre",
                        },
                    ])
                );
            }
        },
    });
}

function obtenerDatosMacroregiones() {
    return datos.macroregiones;
}

function obtenerMacroregionPorIndice(indice) {
    return datos.macroregiones[indice] || null;
}

function agruparMacrorregioniesPorPropiedad(propiedad = "MACROREGIO") {
    const macroregionesAgrupadas = {};

    datos.macroregiones.forEach((feature, index) => {
        const nombreMacroregion =
            feature.properties?.[propiedad] || `Macroregion ${index}`;

        if (!macroregionesAgrupadas[nombreMacroregion]) {
            macroregionesAgrupadas[nombreMacroregion] = {
                nombre: nombreMacroregion,
                indices: [],
                features: [],
            };
        }

        macroregionesAgrupadas[nombreMacroregion].indices.push(index);
        macroregionesAgrupadas[nombreMacroregion].features.push(feature);
    });

    return Object.values(macroregionesAgrupadas);
}

function obtenerCapaMacroregiones() {
    return capas.macroregiones;
}

function filtrarMacroregiones(indices) {
    const macroregionesMostrar = indices
        .map((idx) => datos.macroregiones[idx])
        .filter(Boolean);

    if (macroregionesMostrar.length === 0) {
        // Si no hay macroregiones seleccionadas, mostrar todas
        const nuevaCapa = crearCapaMacroregiones(datos.macroregiones);
        actualizarCapaMacroregiones(nuevaCapa);
    } else {
        const nuevaCapa = crearCapaMacroregiones(macroregionesMostrar);
        actualizarCapaMacroregiones(nuevaCapa);
    }
}

function filtrarMacroregionesPorNombre(
    nombreMacroregion,
    propiedad = "MACROREGIO"
) {
    const macroregionesFiltradas = datos.macroregiones.filter((feature) => {
        const nombre = feature.properties?.[propiedad] || "";
        return nombre === nombreMacroregion;
    });

    if (macroregionesFiltradas.length === 0) {
        console.warn(
            `No se encontró macroregion con nombre: ${nombreMacroregion}`
        );
        return;
    }

    const nuevaCapa = crearCapaMacroregiones(macroregionesFiltradas);
    actualizarCapaMacroregiones(nuevaCapa);
}

function actualizarCapaMacroregiones(nuevaCapa) {
    if (capas.macroregiones && map.hasLayer(capas.macroregiones)) {
        map.removeLayer(capas.macroregiones);
    }
    capas.macroregiones = nuevaCapa;
    if (capasVisibles.macroregiones) {
        capas.macroregiones.addTo(map);
    }
}

function crearCapaAreaInfluencia(features) {
    return L.geoJSON(features, {
        style: function () {
            return {
                color: "skyblue",
                weight: 4,

                opacity: 1,
                fillOpacity: 0.5,
            };
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                layer.bindPopup(
                    crearPopupContenido(
                        feature.properties,
                        "Area de influencia",
                        [
                            {
                                key: "ESTSALUD",
                                label: "Establecimiento",
                            },
                            {
                                key: "CODMACRO",
                                label: "Macroregion",
                            },
                        ]
                    )
                );
            }
        },
    });
}

function obtenerDatosAreaInfluencia() {
    return datos.areaInfluencia;
}

function obtenerAreaInfluenciaPorIndice(indice) {
    return datos.areaInfluencia[indice] || null;
}

function agruparAreaInfluenciaPorPropiedad(propiedad = "AREAINFL") {
    const areaInfluenciaAgrupadas = {};

    datos.areaInfluencia.forEach((feature, index) => {
        const nombreAreaInfluencia =
            feature.properties?.[propiedad] || `Area de influencia ${index}`;

        if (!areaInfluenciaAgrupadas[nombreAreaInfluencia]) {
            areaInfluenciaAgrupadas[nombreAreaInfluencia] = {
                nombre: nombreAreaInfluencia,
                indices: [],
                features: [],
            };
        }

        areaInfluenciaAgrupadas[nombreAreaInfluencia].indices.push(index);
        areaInfluenciaAgrupadas[nombreAreaInfluencia].features.push(feature);
    });

    return Object.values(areaInfluenciaAgrupadas);
}

function obtenerCapaAreaInfluencia() {
    return capas.areaInfluencia;
}

function filtrarAreaInfluencia(indices) {
    const areaInfluenciaMostrar = indices
        .map((idx) => datos.areaInfluencia[idx])
        .filter(Boolean);

    if (areaInfluenciaMostrar.length === 0) {
        // Si no hay area de influencia seleccionadas, mostrar todas
        const nuevaCapa = crearCapaAreaInfluencia(datos.areaInfluencia);
        actualizarCapaAreaInfluencia(nuevaCapa);
    } else {
        const nuevaCapa = crearCapaAreaInfluencia(areaInfluenciaMostrar);
        actualizarCapaAreaInfluencia(nuevaCapa);
    }
}

function filtrarAreaInfluenciaPorNombre(
    nombreAreaInfluencia,
    propiedad = "AREAINFL"
) {
    const areaInfluenciaFiltrada = datos.areaInfluencia.filter((feature) => {
        const nombre = feature.properties?.[propiedad] || "";
        return nombre === nombreAreaInfluencia;
    });

    if (areaInfluenciaFiltrada.length === 0) {
        console.warn(
            `No se encontró area de influencia con nombre: ${nombreAreaInfluencia}`
        );
        return;
    }

    const nuevaCapa = crearCapaAreaInfluencia(areaInfluenciaFiltrada);
    actualizarCapaAreaInfluencia(nuevaCapa);
}

function actualizarCapaAreaInfluencia(nuevaCapa) {
    if (capas.areaInfluencia && map.hasLayer(capas.areaInfluencia)) {
        map.removeLayer(capas.areaInfluencia);
    }
    capas.areaInfluencia = nuevaCapa;
    if (capasVisibles.areaInfluencia) {
        capas.areaInfluencia.addTo(map);
    }
}

function obtenerDatosLocalidades() {
    return datos.localidades;
}
