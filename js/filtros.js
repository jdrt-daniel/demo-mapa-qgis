function limpiarTodosFiltros() {
  // Limpiar búsqueda de establecimientos
  const inputBusqueda = document.getElementById("busqueda");
  if (inputBusqueda) {
    inputBusqueda.value = "";
  }

  // Limpiar búsqueda de redes
  const inputBusquedaRed = document.getElementById("busquedaRed");
  if (inputBusquedaRed) {
    inputBusquedaRed.value = "";
  }

  // Limpiar búsqueda de municipios
  const inputBusquedaMunicipio = document.getElementById("busquedaMunicipio");
  if (inputBusquedaMunicipio) {
    inputBusquedaMunicipio.value = "";
  }

  // Limpiar checkboxes de tipo de establecimiento
  const checkboxesTipo = document.querySelectorAll('input[name="filtro-tipo"]');
  checkboxesTipo.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Limpiar checkboxes de nivel de establecimiento
  const checkboxesNivel = document.querySelectorAll(
    'input[name="filtro-nivel"]'
  );
  checkboxesNivel.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Limpiar checkbox filtrar por red
  const cbFiltrarPorRed = document.getElementById("cbFiltrarPorRed");
  if (cbFiltrarPorRed) {
    cbFiltrarPorRed.checked = false;
    estadoFiltroRed.activo = false;
  }

  // Limpiar checkbox filtrar por municipio
  const cbFiltrarPorMunicipio = document.getElementById(
    "cbFiltrarPorMunicipio"
  );
  if (cbFiltrarPorMunicipio) {
    cbFiltrarPorMunicipio.checked = false;
    estadoFiltroMunicipio.activo = false;
  }

  // Limpiar checkboxes de redes en las capas
  const checkboxesRed = document.querySelectorAll('input[name="filtro-red"]');
  checkboxesRed.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Limpiar checkboxes de municipios en las capas
  const checkboxesMunicipio = document.querySelectorAll(
    'input[name="filtro-municipio"]'
  );
  checkboxesMunicipio.forEach((checkbox) => {
    checkbox.checked = false;
  });

  // Limpiar checkboxes de macroregiones en las capas
  const checkboxesMacroregion = document.querySelectorAll(
    'input[name="filtro-macroregion"]'
  );
  checkboxesMacroregion.forEach((checkbox) => {
    checkbox.checked = false;
  });

  const cbFiltrarLocalidades = document.getElementById(
    "cbFiltrarLocalidadesPorEst"
  );
  if (cbFiltrarLocalidades) {
    cbFiltrarLocalidades.checked = false;
    estadoFiltroLocalidad.activo = false;
    estadoFiltroLocalidad.codigoEstablecimientoSeleccionado = null;
    estadoFiltroLocalidad.establecimientoSeleccionado = null;
  }

  // Desmarcar filtros de redes
  deseleccionarTodasRedes();
  limpiarFiltrosRedes();

  // Desmarcar filtros de municipios
  deseleccionarTodosMunicipios();
  limpiarFiltrosMunicipios();

  // Desmarcar filtros de macroregiones
  deseleccionarTodasMacroregiones();
  limpiarFiltrosMacroregiones();

  // Mostrar todos los establecimientos sin filtros
  const todosEstablecimientos = obtenerDatosEstablecimientos();
  if (todosEstablecimientos && todosEstablecimientos.length > 0) {
    const nuevaCapa = crearCapaEstablecimientos(todosEstablecimientos);
    actualizarCapaEstablecimientos(nuevaCapa);
  }

  // Mostrar todas las redes sin filtros
  const todasRedes = obtenerDatosRedes();
  if (todasRedes && todasRedes.length > 0) {
    const nuevaCapa = crearCapaRedes(todasRedes);
    actualizarCapaRedes(nuevaCapa);
  }

  // Mostrar todos los municipios sin filtros
  const todosMunicipios = obtenerDatosMunicipios();
  if (todosMunicipios && todosMunicipios.length > 0) {
    const nuevaCapa = crearCapaMunicipios(todosMunicipios);
    actualizarCapaMunicipios(nuevaCapa);
  }

  // Mostrar todas las macroregiones sin filtros
  const todasMacroregiones = obtenerDatosMacroregiones();
  if (todasMacroregiones && todasMacroregiones.length > 0) {
    const nuevaCapa = crearCapaMacroregiones(todasMacroregiones);
    actualizarCapaMacroregiones(nuevaCapa);
  }

  const todasLocalidades = obtenerDatosLocalidades();
  if (todasLocalidades && todasLocalidades.length > 0) {
    const nuevaCapa = crearCapaLocalidades(todasLocalidades);
    actualizarCapaLocalidades(nuevaCapa);
    actualizarContadorLocalidades(todasLocalidades.length, "");
  }

  // Actualizar contadores
  actualizarContador(todosEstablecimientos.length, "Mostrando todos");
  actualizarContadorRedes(todasRedes.length, "");
  actualizarContadorMunicipios(todosMunicipios.length, "");
  actualizarContadorMacroregiones(todasMacroregiones.length, "");

  console.log("Todos los filtros han sido limpiados");
}
