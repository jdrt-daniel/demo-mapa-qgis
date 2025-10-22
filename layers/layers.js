var wms_layers = [];


        var lyr_MapaOSM_0 = new ol.layer.Tile({
            'title': 'Mapa OSM',
            'opacity': 1.000000,
            
            
            source: new ol.source.XYZ({
            attributions: '&nbsp;&middot; <a href="https://www.openstreetmap.org/copyright">© OpenStreetMap contributors, CC-BY-SA</a>',
                url: 'http://tile.openstreetmap.org/{z}/{x}/{y}.png'
            })
        });
var format_LimiteNacional_1 = new ol.format.GeoJSON();
var features_LimiteNacional_1 = format_LimiteNacional_1.readFeatures(json_LimiteNacional_1, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LimiteNacional_1 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LimiteNacional_1.addFeatures(features_LimiteNacional_1);
var lyr_LimiteNacional_1 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LimiteNacional_1, 
                style: style_LimiteNacional_1,
                popuplayertitle: 'Limite Nacional',
                interactive: true,
                title: '<img src="styles/legend/LimiteNacional_1.png" /> Limite Nacional'
            });
var format_LimiteDepartamental_2 = new ol.format.GeoJSON();
var features_LimiteDepartamental_2 = format_LimiteDepartamental_2.readFeatures(json_LimiteDepartamental_2, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LimiteDepartamental_2 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LimiteDepartamental_2.addFeatures(features_LimiteDepartamental_2);
var lyr_LimiteDepartamental_2 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LimiteDepartamental_2, 
                style: style_LimiteDepartamental_2,
                popuplayertitle: 'Limite Departamental',
                interactive: true,
                title: '<img src="styles/legend/LimiteDepartamental_2.png" /> Limite Departamental'
            });
var format_REDESDESALUD_3 = new ol.format.GeoJSON();
var features_REDESDESALUD_3 = format_REDESDESALUD_3.readFeatures(json_REDESDESALUD_3, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_REDESDESALUD_3 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_REDESDESALUD_3.addFeatures(features_REDESDESALUD_3);
var lyr_REDESDESALUD_3 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_REDESDESALUD_3, 
                style: style_REDESDESALUD_3,
                popuplayertitle: 'REDES DE SALUD',
                interactive: true,
                title: '<img src="styles/legend/REDESDESALUD_3.png" /> REDES DE SALUD'
            });
var format_MUNICIPIOS_4 = new ol.format.GeoJSON();
var features_MUNICIPIOS_4 = format_MUNICIPIOS_4.readFeatures(json_MUNICIPIOS_4, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_MUNICIPIOS_4 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_MUNICIPIOS_4.addFeatures(features_MUNICIPIOS_4);
var lyr_MUNICIPIOS_4 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_MUNICIPIOS_4, 
                style: style_MUNICIPIOS_4,
                popuplayertitle: 'MUNICIPIOS',
                interactive: true,
                title: '<img src="styles/legend/MUNICIPIOS_4.png" /> MUNICIPIOS'
            });
var format_MacroRegiones_5 = new ol.format.GeoJSON();
var features_MacroRegiones_5 = format_MacroRegiones_5.readFeatures(json_MacroRegiones_5, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_MacroRegiones_5 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_MacroRegiones_5.addFeatures(features_MacroRegiones_5);
var lyr_MacroRegiones_5 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_MacroRegiones_5, 
                style: style_MacroRegiones_5,
                popuplayertitle: 'Macro Regiones',
                interactive: true,
                title: '<img src="styles/legend/MacroRegiones_5.png" /> Macro Regiones'
            });
var format_AreasdeInfluenciaEESS_6 = new ol.format.GeoJSON();
var features_AreasdeInfluenciaEESS_6 = format_AreasdeInfluenciaEESS_6.readFeatures(json_AreasdeInfluenciaEESS_6, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_AreasdeInfluenciaEESS_6 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_AreasdeInfluenciaEESS_6.addFeatures(features_AreasdeInfluenciaEESS_6);
var lyr_AreasdeInfluenciaEESS_6 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_AreasdeInfluenciaEESS_6, 
                style: style_AreasdeInfluenciaEESS_6,
                popuplayertitle: 'Areas de Influencia EE.SS',
                interactive: true,
                title: '<img src="styles/legend/AreasdeInfluenciaEESS_6.png" /> Areas de Influencia EE.SS'
            });
var format_LOCALIDADES_7 = new ol.format.GeoJSON();
var features_LOCALIDADES_7 = format_LOCALIDADES_7.readFeatures(json_LOCALIDADES_7, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_LOCALIDADES_7 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_LOCALIDADES_7.addFeatures(features_LOCALIDADES_7);
var lyr_LOCALIDADES_7 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_LOCALIDADES_7, 
                style: style_LOCALIDADES_7,
                popuplayertitle: 'LOCALIDADES',
                interactive: true,
                title: '<img src="styles/legend/LOCALIDADES_7.png" /> LOCALIDADES'
            });
var format_RedVialFundamental_8 = new ol.format.GeoJSON();
var features_RedVialFundamental_8 = format_RedVialFundamental_8.readFeatures(json_RedVialFundamental_8, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_RedVialFundamental_8 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_RedVialFundamental_8.addFeatures(features_RedVialFundamental_8);
var lyr_RedVialFundamental_8 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_RedVialFundamental_8, 
                style: style_RedVialFundamental_8,
                popuplayertitle: 'Red Vial Fundamental',
                interactive: true,
                title: '<img src="styles/legend/RedVialFundamental_8.png" /> Red Vial Fundamental'
            });
var format_EstablecimientosdeSalud_9 = new ol.format.GeoJSON();
var features_EstablecimientosdeSalud_9 = format_EstablecimientosdeSalud_9.readFeatures(json_EstablecimientosdeSalud_9, 
            {dataProjection: 'EPSG:4326', featureProjection: 'EPSG:3857'});
var jsonSource_EstablecimientosdeSalud_9 = new ol.source.Vector({
    attributions: ' ',
});
jsonSource_EstablecimientosdeSalud_9.addFeatures(features_EstablecimientosdeSalud_9);
var lyr_EstablecimientosdeSalud_9 = new ol.layer.Vector({
                declutter: false,
                source:jsonSource_EstablecimientosdeSalud_9, 
                style: style_EstablecimientosdeSalud_9,
                popuplayertitle: 'Establecimientos de Salud',
                interactive: true,
    title: 'Establecimientos de Salud<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_0.png" /> Hospital 3er Nivel<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_1.png" /> Hospital Segundo Nivel<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_2.png" /> C.S. Integral<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_3.png" /> C.S. con Internacion<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_4.png" /> C.S. con internacion-CM<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_5.png" /> C.S. Ambulatorio<br />\
    <img src="styles/legend/EstablecimientosdeSalud_9_6.png" /> Puesto de Salud<br />' });

lyr_MapaOSM_0.setVisible(true);lyr_LimiteNacional_1.setVisible(true);lyr_LimiteDepartamental_2.setVisible(true);lyr_REDESDESALUD_3.setVisible(true);lyr_MUNICIPIOS_4.setVisible(true);lyr_MacroRegiones_5.setVisible(true);lyr_AreasdeInfluenciaEESS_6.setVisible(true);lyr_LOCALIDADES_7.setVisible(true);lyr_RedVialFundamental_8.setVisible(true);lyr_EstablecimientosdeSalud_9.setVisible(true);
var layersList = [lyr_MapaOSM_0,lyr_LimiteNacional_1,lyr_LimiteDepartamental_2,lyr_REDESDESALUD_3,lyr_MUNICIPIOS_4,lyr_MacroRegiones_5,lyr_AreasdeInfluenciaEESS_6,lyr_LOCALIDADES_7,lyr_RedVialFundamental_8,lyr_EstablecimientosdeSalud_9];
lyr_LimiteNacional_1.set('fieldAliases', {'GP': 'GP', 'GP1': 'GP1', 'GP2': 'GP2', 'PF_GP_P_D': 'PF_GP_P_D', 'ID': 'ID', 'CODFIS': 'CODFIS', 'DESCFIS': 'DESCFIS', 'CODVEG': 'CODVEG', 'DESCVEG': 'DESCVEG', 'GEOLO': 'GEOLO', 'PISOALTIT': 'PISOALTIT', 'RANGPREC': 'RANGPREC', 'RANGTMP': 'RANGTMP', });
lyr_LimiteDepartamental_2.set('fieldAliases', {'ID': 'ID', 'CODDEPTO': 'CODDEPTO', 'NOMBRE': 'DEPARTAMENTO', 'CODBO': 'CODBO', });
lyr_REDESDESALUD_3.set('fieldAliases', {'ID': 'ID', 'CODREDSAL': 'CODREDSAL', 'NOMBRERED': 'NOMBRE:', 'CODDEPTO': 'CODDEPTO', 'NOMDEPTO': 'NOMDEPTO', 'NOMBRE_IMP': 'NOMBRE_IMP', 'ID2': 'ID2', });
lyr_MUNICIPIOS_4.set('fieldAliases', {'ID': 'ID', 'CODMUNI': 'CODMUNI', 'NOMBRE': 'NOMBRE', 'CODPROV': 'CODPROV', 'NOMPROV': 'PROVINCIA', 'CODDEPTO': 'CODDEPTO', 'NOMDEPTO': 'NOMDEPTO', 'CODREDSAL': 'CODREDSAL', 'NOMREDSAL': 'RED DE SALUD', 'MACROREGIO': 'MACRO REGION', 'CODMUNI_IM': 'CODMUNI_IM', 'MUNICIP': 'MUNICIP', 'ULTIMA': 'ULTIMA', });
lyr_MacroRegiones_5.set('fieldAliases', {'ID': 'ID', 'CODMACRO': 'CODMACRO', 'MACROREGIO': 'NOMBRE', 'CODDEPTO': 'CODDEPTO', 'NOMDEPTO': 'NOMDEPTO', 'ULTIMA': 'ULTIMA', });
lyr_AreasdeInfluenciaEESS_6.set('fieldAliases', {'ID': 'ID', 'CODDEPTO': 'CODDEPTO', 'SEDES': 'SEDES:', 'CODREDSAL': 'CODREDSAL', 'REDSALUD': 'RED DE SALUD', 'CODMUNI': 'CODMUNI', 'MUNICIPIO': 'MUNICIPIO', 'ESTSALUD': 'EE.SS.', 'CODESTSAL': 'CODESTSAL', 'ESTADO': 'ESTADO', 'ULTIMA': 'ULTIMA', });
lyr_LOCALIDADES_7.set('fieldAliases', {'ID': 'ID', 'CODIGOLOC': 'CODIGOLOC', 'NOMBRE': 'NOMBRE', 'CODMUNI': 'CODMUNI', 'NOMMUNI': 'MUNICIPIO', 'CODDEPTO': 'CODDEPTO', 'NOMDEPTO': 'NOMDEPTO', 'CODPROV': 'CODPROV', 'NOMPROVIN': 'PROVINCIA', 'LONG': 'LONG', 'LAT': 'LAT', });
lyr_RedVialFundamental_8.set('fieldAliases', {'ogc_fid': 'ogc_fid', 'ruta': 'ruta', 'rodadura': 'Rodadura', 'tipo': 'Tipo', 'depto': 'depto', 'de': 'Desde', 'a': 'Hasta', 'longitud': 'Long. Km.', });
lyr_EstablecimientosdeSalud_9.set('fieldAliases', {'ID': 'ID', 'CODDEPTO': 'CODDEPTO', 'SEDES': 'SEDES', 'CODREDSAL': 'CODREDSAL', 'REDSALUD': 'Red de Salud:', 'CODMUNI': 'CODMUNI', 'MUNICIPIO': 'Municipio:', 'ESTSALUD': 'Establecimiento de Salud', 'CODESTSAL': 'CODESTSAL', 'NIVELRES': 'Nivel E.S.:', 'TIPO': 'TIPO', 'TIPOEST': 'Tipo E.S.', 'CODSECT': 'CODSECT', 'SUBSECTOR': 'SUBSECTOR', 'AMBITOGEO': 'AMBITOGEO', 'LATITUD': 'LATITUD', 'LONGITUD': 'LONGITUD', 'CODPROV': 'CODPROV', 'PROVINCIA': 'PROVINCIA', 'NOMBRE_IMP': 'NOMBRE_IMP', 'ESTADO': 'ESTADO', 'ID2': 'ID2', 'ULTIMA': 'ULTIMA', });
lyr_LimiteNacional_1.set('fieldImages', {'GP': 'Hidden', 'GP1': 'Hidden', 'GP2': 'Hidden', 'PF_GP_P_D': 'Hidden', 'ID': 'Hidden', 'CODFIS': 'Hidden', 'DESCFIS': 'Hidden', 'CODVEG': 'Hidden', 'DESCVEG': 'Hidden', 'GEOLO': 'Hidden', 'PISOALTIT': 'Hidden', 'RANGPREC': 'Hidden', 'RANGTMP': 'Hidden', });
lyr_LimiteDepartamental_2.set('fieldImages', {'ID': 'Hidden', 'CODDEPTO': 'Hidden', 'NOMBRE': 'TextEdit', 'CODBO': 'Hidden', });
lyr_REDESDESALUD_3.set('fieldImages', {'ID': 'Hidden', 'CODREDSAL': 'Hidden', 'NOMBRERED': 'TextEdit', 'CODDEPTO': 'Hidden', 'NOMDEPTO': 'Hidden', 'NOMBRE_IMP': 'Hidden', 'ID2': 'Hidden', });
lyr_MUNICIPIOS_4.set('fieldImages', {'ID': 'Hidden', 'CODMUNI': 'Hidden', 'NOMBRE': 'TextEdit', 'CODPROV': 'Hidden', 'NOMPROV': 'TextEdit', 'CODDEPTO': 'Hidden', 'NOMDEPTO': 'Hidden', 'CODREDSAL': 'Hidden', 'NOMREDSAL': 'TextEdit', 'MACROREGIO': 'TextEdit', 'CODMUNI_IM': 'Hidden', 'MUNICIP': 'Hidden', 'ULTIMA': 'Hidden', });
lyr_MacroRegiones_5.set('fieldImages', {'ID': 'Hidden', 'CODMACRO': 'Hidden', 'MACROREGIO': 'TextEdit', 'CODDEPTO': 'Hidden', 'NOMDEPTO': 'Hidden', 'ULTIMA': 'Hidden', });
lyr_AreasdeInfluenciaEESS_6.set('fieldImages', {'ID': 'Hidden', 'CODDEPTO': 'Hidden', 'SEDES': 'Hidden', 'CODREDSAL': 'Hidden', 'REDSALUD': 'TextEdit', 'CODMUNI': 'Hidden', 'MUNICIPIO': 'TextEdit', 'ESTSALUD': 'TextEdit', 'CODESTSAL': 'Hidden', 'ESTADO': 'Hidden', 'ULTIMA': 'Hidden', });
lyr_LOCALIDADES_7.set('fieldImages', {'ID': 'Hidden', 'CODIGOLOC': 'Hidden', 'NOMBRE': 'TextEdit', 'CODMUNI': 'Hidden', 'NOMMUNI': 'TextEdit', 'CODDEPTO': 'Hidden', 'NOMDEPTO': 'Hidden', 'CODPROV': 'Hidden', 'NOMPROVIN': 'TextEdit', 'LONG': 'Hidden', 'LAT': 'Hidden', });
lyr_RedVialFundamental_8.set('fieldImages', {'ogc_fid': 'Hidden', 'ruta': 'Hidden', 'rodadura': 'TextEdit', 'tipo': 'TextEdit', 'depto': 'Hidden', 'de': 'TextEdit', 'a': 'TextEdit', 'longitud': 'TextEdit', });
lyr_EstablecimientosdeSalud_9.set('fieldImages', {'ID': 'Hidden', 'CODDEPTO': 'Hidden', 'SEDES': 'TextEdit', 'CODREDSAL': 'Hidden', 'REDSALUD': 'TextEdit', 'CODMUNI': 'Hidden', 'MUNICIPIO': 'TextEdit', 'ESTSALUD': 'TextEdit', 'CODESTSAL': 'Hidden', 'NIVELRES': 'TextEdit', 'TIPO': 'Hidden', 'TIPOEST': 'TextEdit', 'CODSECT': 'Hidden', 'SUBSECTOR': 'Hidden', 'AMBITOGEO': 'Hidden', 'LATITUD': 'Hidden', 'LONGITUD': 'Hidden', 'CODPROV': 'Hidden', 'PROVINCIA': 'Hidden', 'NOMBRE_IMP': 'Hidden', 'ESTADO': 'Hidden', 'ID2': 'Hidden', 'ULTIMA': 'Hidden', });
lyr_LimiteNacional_1.set('fieldLabels', {});
lyr_LimiteDepartamental_2.set('fieldLabels', {'NOMBRE': 'inline label - always visible', });
lyr_REDESDESALUD_3.set('fieldLabels', {'NOMBRERED': 'inline label - always visible', });
lyr_MUNICIPIOS_4.set('fieldLabels', {'NOMBRE': 'inline label - always visible', 'NOMPROV': 'inline label - always visible', 'NOMREDSAL': 'inline label - always visible', 'MACROREGIO': 'inline label - always visible', });
lyr_MacroRegiones_5.set('fieldLabels', {'MACROREGIO': 'no label', });
lyr_AreasdeInfluenciaEESS_6.set('fieldLabels', {'REDSALUD': 'inline label - always visible', 'MUNICIPIO': 'inline label - always visible', 'ESTSALUD': 'header label - always visible', });
lyr_LOCALIDADES_7.set('fieldLabels', {'NOMBRE': 'header label - always visible', 'NOMMUNI': 'inline label - always visible', 'NOMPROVIN': 'inline label - always visible', });
lyr_RedVialFundamental_8.set('fieldLabels', {'rodadura': 'header label - always visible', 'tipo': 'header label - always visible', 'de': 'header label - always visible', 'a': 'header label - always visible', 'longitud': 'inline label - always visible', });
lyr_EstablecimientosdeSalud_9.set('fieldLabels', {'SEDES': 'inline label - always visible', 'REDSALUD': 'inline label - always visible', 'MUNICIPIO': 'inline label - always visible', 'ESTSALUD': 'header label - always visible', 'NIVELRES': 'inline label - always visible', 'TIPOEST': 'header label - always visible', });
lyr_EstablecimientosdeSalud_9.on('precompose', function(evt) {
    evt.context.globalCompositeOperation = 'normal';
});