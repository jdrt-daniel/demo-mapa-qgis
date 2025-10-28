var wms_layers = [];

var lyr_SateliteGoogle_0 = new ol.layer.Tile({
  title: "Satelite Google",
  opacity: 1.0,

  source: new ol.source.XYZ({
    attributions:
      '&nbsp;&middot; <a href="https://www.google.at/permissions/geoguidelines/attr-guide.html">Map data ©2015 Google</a>',
    url: "https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}",
  }),
});

var lyr_MapaOSM_1 = new ol.layer.Tile({
  title: "Mapa OSM",
  opacity: 1.0,

  source: new ol.source.XYZ({
    attributions:
      '&nbsp;&middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
    url: "http://tile.openstreetmap.org/{z}/{x}/{y}.png",
  }),
});

var lyr_MapaGoogle_2 = new ol.layer.Tile({
  title: "Mapa Google",
  opacity: 1.0,

  source: new ol.source.XYZ({
    attributions:
      '&nbsp;&middot; <a href="https://www.google.com/intl/zh-CN_cn/permissions/geoguidelines/attr-guide.html">地图数据 ©2016 Google</a>',
    url: "http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}",
  }),
});
var format_LimiteNacional_3 = new ol.format.GeoJSON();
var features_LimiteNacional_3 = format_LimiteNacional_3.readFeatures(
  json_LimiteNacional_3,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_LimiteNacional_3 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_LimiteNacional_3.addFeatures(features_LimiteNacional_3);
var lyr_LimiteNacional_3 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_LimiteNacional_3,
  style: style_LimiteNacional_3,
  popuplayertitle: "Limite Nacional",
  interactive: true,
  title: '<img src="styles/legend/LimiteNacional_3.png" /> Limite Nacional',
});
var format_LimiteDepartamental_4 = new ol.format.GeoJSON();
var features_LimiteDepartamental_4 = format_LimiteDepartamental_4.readFeatures(
  json_LimiteDepartamental_4,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_LimiteDepartamental_4 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_LimiteDepartamental_4.addFeatures(features_LimiteDepartamental_4);
var lyr_LimiteDepartamental_4 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_LimiteDepartamental_4,
  style: style_LimiteDepartamental_4,
  popuplayertitle: "Limite Departamental",
  interactive: true,
  title:
    '<img src="styles/legend/LimiteDepartamental_4.png" /> Limite Departamental',
});
var format_REDESDESALUD_5 = new ol.format.GeoJSON();
var features_REDESDESALUD_5 = format_REDESDESALUD_5.readFeatures(
  json_REDESDESALUD_5,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_REDESDESALUD_5 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_REDESDESALUD_5.addFeatures(features_REDESDESALUD_5);
var lyr_REDESDESALUD_5 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_REDESDESALUD_5,
  style: style_REDESDESALUD_5,
  popuplayertitle: "REDES DE SALUD",
  interactive: true,
  title: '<img src="styles/legend/REDESDESALUD_5.png" /> REDES DE SALUD',
});
var format_MUNICIPIOS_6 = new ol.format.GeoJSON();
var features_MUNICIPIOS_6 = format_MUNICIPIOS_6.readFeatures(
  json_MUNICIPIOS_6,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_MUNICIPIOS_6 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_MUNICIPIOS_6.addFeatures(features_MUNICIPIOS_6);
var lyr_MUNICIPIOS_6 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_MUNICIPIOS_6,
  style: style_MUNICIPIOS_6,
  popuplayertitle: "MUNICIPIOS",
  interactive: true,
  title: '<img src="styles/legend/MUNICIPIOS_6.png" /> MUNICIPIOS',
});
var format_MacroRegiones_7 = new ol.format.GeoJSON();
var features_MacroRegiones_7 = format_MacroRegiones_7.readFeatures(
  json_MacroRegiones_7,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_MacroRegiones_7 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_MacroRegiones_7.addFeatures(features_MacroRegiones_7);
var lyr_MacroRegiones_7 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_MacroRegiones_7,
  style: style_MacroRegiones_7,
  popuplayertitle: "Macro Regiones",
  interactive: true,
  title: '<img src="styles/legend/MacroRegiones_7.png" /> Macro Regiones',
});
var format_AreasdeInfluenciaEESS_8 = new ol.format.GeoJSON();
var features_AreasdeInfluenciaEESS_8 =
  format_AreasdeInfluenciaEESS_8.readFeatures(json_AreasdeInfluenciaEESS_8, {
    dataProjection: "EPSG:4326",
    featureProjection: "EPSG:3857",
  });
var jsonSource_AreasdeInfluenciaEESS_8 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_AreasdeInfluenciaEESS_8.addFeatures(
  features_AreasdeInfluenciaEESS_8
);
var lyr_AreasdeInfluenciaEESS_8 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_AreasdeInfluenciaEESS_8,
  style: style_AreasdeInfluenciaEESS_8,
  popuplayertitle: "Areas de Influencia EE.SS",
  interactive: true,
  title:
    '<img src="styles/legend/AreasdeInfluenciaEESS_8.png" /> Areas de Influencia EE.SS',
});
var format_LOCALIDADES_9 = new ol.format.GeoJSON();
var features_LOCALIDADES_9 = format_LOCALIDADES_9.readFeatures(
  json_LOCALIDADES_9,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_LOCALIDADES_9 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_LOCALIDADES_9.addFeatures(features_LOCALIDADES_9);
var lyr_LOCALIDADES_9 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_LOCALIDADES_9,
  style: style_LOCALIDADES_9,
  popuplayertitle: "LOCALIDADES",
  interactive: true,
  title: '<img src="styles/legend/LOCALIDADES_9.png" /> LOCALIDADES',
});
var format_RedVialFundamental_10 = new ol.format.GeoJSON();
var features_RedVialFundamental_10 = format_RedVialFundamental_10.readFeatures(
  json_RedVialFundamental_10,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_RedVialFundamental_10 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_RedVialFundamental_10.addFeatures(features_RedVialFundamental_10);
var lyr_RedVialFundamental_10 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_RedVialFundamental_10,
  style: style_RedVialFundamental_10,
  popuplayertitle: "Red Vial Fundamental",
  interactive: true,
  title:
    '<img src="styles/legend/RedVialFundamental_10.png" /> Red Vial Fundamental',
});
var format_RedVialPrimaria_11 = new ol.format.GeoJSON();
var features_RedVialPrimaria_11 = format_RedVialPrimaria_11.readFeatures(
  json_RedVialPrimaria_11,
  { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
);
var jsonSource_RedVialPrimaria_11 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_RedVialPrimaria_11.addFeatures(features_RedVialPrimaria_11);
var lyr_RedVialPrimaria_11 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_RedVialPrimaria_11,
  style: style_RedVialPrimaria_11,
  popuplayertitle: "Red Vial Primaria",
  interactive: true,
  title: '<img src="styles/legend/RedVialPrimaria_11.png" /> Red Vial Primaria',
});
var format_EstablecimientosdeSalud_12 = new ol.format.GeoJSON();
var features_EstablecimientosdeSalud_12 =
  format_EstablecimientosdeSalud_12.readFeatures(
    json_EstablecimientosdeSalud_12,
    { dataProjection: "EPSG:4326", featureProjection: "EPSG:3857" }
  );
var jsonSource_EstablecimientosdeSalud_12 = new ol.source.Vector({
  attributions: " ",
});
jsonSource_EstablecimientosdeSalud_12.addFeatures(
  features_EstablecimientosdeSalud_12
);
var lyr_EstablecimientosdeSalud_12 = new ol.layer.Vector({
  declutter: false,
  source: jsonSource_EstablecimientosdeSalud_12,
  style: style_EstablecimientosdeSalud_12,
  popuplayertitle: "Establecimientos de Salud",
  interactive: true,
  title:
    'Establecimientos de Salud<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_0.png" /> Hospital 3er Nivel<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_1.png" /> Hospital Segundo Nivel<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_2.png" /> C.S. Integral<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_3.png" /> C.S. con Internacion<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_4.png" /> C.S. con internacion-CM<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_5.png" /> C.S. Ambulatorio<br />\
    <img src="styles/legend/EstablecimientosdeSalud_12_6.png" /> Puesto de Salud<br />',
});

lyr_SateliteGoogle_0.setVisible(true);
lyr_MapaOSM_1.setVisible(true);
lyr_MapaGoogle_2.setVisible(true);
lyr_LimiteNacional_3.setVisible(true);
lyr_LimiteDepartamental_4.setVisible(true);
lyr_REDESDESALUD_5.setVisible(true);
lyr_MUNICIPIOS_6.setVisible(true);
lyr_MacroRegiones_7.setVisible(true);
lyr_AreasdeInfluenciaEESS_8.setVisible(true);
lyr_LOCALIDADES_9.setVisible(true);
lyr_RedVialFundamental_10.setVisible(true);
lyr_RedVialPrimaria_11.setVisible(true);
lyr_EstablecimientosdeSalud_12.setVisible(true);
var layersList = [
  lyr_SateliteGoogle_0,
  lyr_MapaOSM_1,
  lyr_MapaGoogle_2,
  lyr_LimiteNacional_3,
  lyr_LimiteDepartamental_4,
  lyr_REDESDESALUD_5,
  lyr_MUNICIPIOS_6,
  lyr_MacroRegiones_7,
  lyr_AreasdeInfluenciaEESS_8,
  lyr_LOCALIDADES_9,
  lyr_RedVialFundamental_10,
  lyr_RedVialPrimaria_11,
  lyr_EstablecimientosdeSalud_12,
];
lyr_LimiteNacional_3.set("fieldAliases", {
  GP: "GP",
  GP1: "GP1",
  GP2: "GP2",
  PF_GP_P_D: "PF_GP_P_D",
  ID: "ID",
  CODFIS: "CODFIS",
  DESCFIS: "DESCFIS",
  CODVEG: "CODVEG",
  DESCVEG: "DESCVEG",
  GEOLO: "GEOLO",
  PISOALTIT: "PISOALTIT",
  RANGPREC: "RANGPREC",
  RANGTMP: "RANGTMP",
});
lyr_LimiteDepartamental_4.set("fieldAliases", {
  ID: "ID",
  CODDEPTO: "CODDEPTO",
  NOMBRE: "DEPARTAMENTO",
  CODBO: "CODBO",
});
lyr_REDESDESALUD_5.set("fieldAliases", {
  ID: "ID",
  CODREDSAL: "CODREDSAL",
  NOMBRERED: "NOMBRE:",
  CODDEPTO: "CODDEPTO",
  NOMDEPTO: "NOMDEPTO",
  NOMBRE_IMP: "NOMBRE_IMP",
  ID2: "ID2",
});
lyr_MUNICIPIOS_6.set("fieldAliases", {
  ID: "ID",
  CODMUNI: "CODMUNI",
  NOMBRE: "NOMBRE",
  CODPROV: "CODPROV",
  NOMPROV: "PROVINCIA",
  CODDEPTO: "CODDEPTO",
  NOMDEPTO: "NOMDEPTO",
  CODREDSAL: "CODREDSAL",
  NOMREDSAL: "RED DE SALUD",
  MACROREGIO: "MACRO REGION",
  CODMUNI_IM: "CODMUNI_IM",
  MUNICIP: "MUNICIP",
  ULTIMA: "ULTIMA",
});
lyr_MacroRegiones_7.set("fieldAliases", {
  ID: "ID",
  CODMACRO: "CODMACRO",
  MACROREGIO: "NOMBRE",
  CODDEPTO: "CODDEPTO",
  NOMDEPTO: "NOMDEPTO",
  ULTIMA: "ULTIMA",
});
lyr_AreasdeInfluenciaEESS_8.set("fieldAliases", {
  ID: "ID",
  CODDEPTO: "CODDEPTO",
  SEDES: "SEDES:",
  CODREDSAL: "CODREDSAL",
  REDSALUD: "RED DE SALUD",
  CODMUNI: "CODMUNI",
  MUNICIPIO: "MUNICIPIO",
  ESTSALUD: "EE.SS.",
  CODESTSAL: "CODESTSAL",
  ESTADO: "ESTADO",
  ULTIMA: "ULTIMA",
});
lyr_LOCALIDADES_9.set("fieldAliases", {
  ID: "ID",
  CODIGOLOC: "CODIGOLOC",
  NOMBRE: "NOMBRE",
  CODMUNI: "CODMUNI",
  NOMMUNI: "MUNICIPIO",
  CODDEPTO: "CODDEPTO",
  NOMDEPTO: "NOMDEPTO",
  CODPROV: "CODPROV",
  NOMPROVIN: "PROVINCIA",
  LONG: "LONG",
  LAT: "LAT",
});
lyr_RedVialFundamental_10.set("fieldAliases", {
  ogc_fid: "ogc_fid",
  ruta: "ruta",
  rodadura: "Rodadura",
  tipo: "Tipo",
  depto: "depto",
  de: "Desde",
  a: "Hasta",
  longitud: "Long. Km.",
});
lyr_RedVialPrimaria_11.set("fieldAliases", {
  osm_id: "osm_id",
  code: "code",
  fclass: "fclass",
  name: "TRAMO",
  ref: "ref",
  oneway: "oneway",
  maxspeed: "maxspeed",
  layer: "layer",
  bridge: "bridge",
  tunnel: "tunnel",
});
lyr_EstablecimientosdeSalud_12.set("fieldAliases", {
  ID: "ID",
  CODDEPTO: "CODDEPTO",
  SEDES: "SEDES",
  CODREDSAL: "CODREDSAL",
  REDSALUD: "Red de Salud:",
  CODMUNI: "CODMUNI",
  MUNICIPIO: "Municipio:",
  ESTSALUD: "Establecimiento de Salud",
  CODESTSAL: "CODIGO E.S.",
  NIVELRES: "Nivel E.S.:",
  TIPO: "TIPO",
  TIPOEST: "Tipo E.S.",
  CODSECT: "CODSECT",
  SUBSECTOR: "SUBSECTOR",
  AMBITOGEO: "AMBITOGEO",
  LATITUD: "LATITUD",
  LONGITUD: "LONGITUD",
  CODPROV: "CODPROV",
  PROVINCIA: "PROVINCIA",
  NOMBRE_IMP: "NOMBRE_IMP",
  ESTADO: "ESTADO",
  ID2: "ID2",
  ULTIMA: "ULTIMA",
});
lyr_LimiteNacional_3.set("fieldImages", {
  GP: "Hidden",
  GP1: "Hidden",
  GP2: "Hidden",
  PF_GP_P_D: "Hidden",
  ID: "Hidden",
  CODFIS: "Hidden",
  DESCFIS: "Hidden",
  CODVEG: "Hidden",
  DESCVEG: "Hidden",
  GEOLO: "Hidden",
  PISOALTIT: "Hidden",
  RANGPREC: "Hidden",
  RANGTMP: "Hidden",
});
lyr_LimiteDepartamental_4.set("fieldImages", {
  ID: "Hidden",
  CODDEPTO: "Hidden",
  NOMBRE: "TextEdit",
  CODBO: "Hidden",
});
lyr_REDESDESALUD_5.set("fieldImages", {
  ID: "Hidden",
  CODREDSAL: "Hidden",
  NOMBRERED: "TextEdit",
  CODDEPTO: "Hidden",
  NOMDEPTO: "Hidden",
  NOMBRE_IMP: "Hidden",
  ID2: "Hidden",
});
lyr_MUNICIPIOS_6.set("fieldImages", {
  ID: "Hidden",
  CODMUNI: "Hidden",
  NOMBRE: "TextEdit",
  CODPROV: "Hidden",
  NOMPROV: "TextEdit",
  CODDEPTO: "Hidden",
  NOMDEPTO: "Hidden",
  CODREDSAL: "Hidden",
  NOMREDSAL: "TextEdit",
  MACROREGIO: "TextEdit",
  CODMUNI_IM: "Hidden",
  MUNICIP: "Hidden",
  ULTIMA: "Hidden",
});
lyr_MacroRegiones_7.set("fieldImages", {
  ID: "Hidden",
  CODMACRO: "Hidden",
  MACROREGIO: "TextEdit",
  CODDEPTO: "Hidden",
  NOMDEPTO: "Hidden",
  ULTIMA: "Hidden",
});
lyr_AreasdeInfluenciaEESS_8.set("fieldImages", {
  ID: "Hidden",
  CODDEPTO: "Hidden",
  SEDES: "Hidden",
  CODREDSAL: "Hidden",
  REDSALUD: "TextEdit",
  CODMUNI: "Hidden",
  MUNICIPIO: "TextEdit",
  ESTSALUD: "TextEdit",
  CODESTSAL: "Hidden",
  ESTADO: "Hidden",
  ULTIMA: "Hidden",
});
lyr_LOCALIDADES_9.set("fieldImages", {
  ID: "Hidden",
  CODIGOLOC: "Hidden",
  NOMBRE: "TextEdit",
  CODMUNI: "Hidden",
  NOMMUNI: "TextEdit",
  CODDEPTO: "Hidden",
  NOMDEPTO: "Hidden",
  CODPROV: "Hidden",
  NOMPROVIN: "TextEdit",
  LONG: "Hidden",
  LAT: "Hidden",
});
lyr_RedVialFundamental_10.set("fieldImages", {
  ogc_fid: "Hidden",
  ruta: "Hidden",
  rodadura: "TextEdit",
  tipo: "TextEdit",
  depto: "Hidden",
  de: "TextEdit",
  a: "TextEdit",
  longitud: "TextEdit",
});
lyr_RedVialPrimaria_11.set("fieldImages", {
  osm_id: "Hidden",
  code: "Hidden",
  fclass: "Hidden",
  name: "TextEdit",
  ref: "Hidden",
  oneway: "Hidden",
  maxspeed: "Hidden",
  layer: "Hidden",
  bridge: "Hidden",
  tunnel: "Hidden",
});
lyr_EstablecimientosdeSalud_12.set("fieldImages", {
  ID: "Hidden",
  CODDEPTO: "Hidden",
  SEDES: "TextEdit",
  CODREDSAL: "Hidden",
  REDSALUD: "TextEdit",
  CODMUNI: "Hidden",
  MUNICIPIO: "TextEdit",
  ESTSALUD: "TextEdit",
  CODESTSAL: "TextEdit",
  NIVELRES: "TextEdit",
  TIPO: "Hidden",
  TIPOEST: "TextEdit",
  CODSECT: "Hidden",
  SUBSECTOR: "Hidden",
  AMBITOGEO: "Hidden",
  LATITUD: "Hidden",
  LONGITUD: "Hidden",
  CODPROV: "Hidden",
  PROVINCIA: "Hidden",
  NOMBRE_IMP: "Hidden",
  ESTADO: "Hidden",
  ID2: "Hidden",
  ULTIMA: "Hidden",
});
lyr_LimiteNacional_3.set("fieldLabels", {});
lyr_LimiteDepartamental_4.set("fieldLabels", {
  NOMBRE: "inline label - always visible",
});
lyr_REDESDESALUD_5.set("fieldLabels", {
  NOMBRERED: "inline label - always visible",
});
lyr_MUNICIPIOS_6.set("fieldLabels", {
  NOMBRE: "inline label - always visible",
  NOMPROV: "inline label - always visible",
  NOMREDSAL: "inline label - always visible",
  MACROREGIO: "inline label - always visible",
});
lyr_MacroRegiones_7.set("fieldLabels", {
  MACROREGIO: "inline label - always visible",
});
lyr_AreasdeInfluenciaEESS_8.set("fieldLabels", {
  REDSALUD: "inline label - always visible",
  MUNICIPIO: "inline label - always visible",
  ESTSALUD: "header label - always visible",
});
lyr_LOCALIDADES_9.set("fieldLabels", {
  NOMBRE: "header label - always visible",
  NOMMUNI: "inline label - always visible",
  NOMPROVIN: "inline label - always visible",
});
lyr_RedVialFundamental_10.set("fieldLabels", {
  rodadura: "header label - always visible",
  tipo: "header label - always visible",
  de: "header label - always visible",
  a: "header label - always visible",
  longitud: "inline label - always visible",
});
lyr_RedVialPrimaria_11.set("fieldLabels", {
  name: "header label - always visible",
});
lyr_EstablecimientosdeSalud_12.set("fieldLabels", {
  SEDES: "inline label - always visible",
  REDSALUD: "inline label - always visible",
  MUNICIPIO: "inline label - always visible",
  ESTSALUD: "header label - always visible",
  CODESTSAL: "inline label - always visible",
  NIVELRES: "inline label - always visible",
  TIPOEST: "header label - always visible",
});
lyr_EstablecimientosdeSalud_12.on("precompose", function (evt) {
  evt.context.globalCompositeOperation = "normal";
});
