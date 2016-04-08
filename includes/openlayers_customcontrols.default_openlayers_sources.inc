<?php
/**
 * @file
 * Default sources
 */

/**
 * Implements hook_default_sources()
 */
function openlayers_customcontrols_default_openlayers_sources() {
    $export = array();
    
    
    //base layers
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bkg_webatlas_color';
    $ol_source->name = 'BKG WebAtlas (Farbe)';
    $ol_source->description = 'farbliche und amtliche Karte WebAtlas, ein Produkt der AdV';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://sg.geodatenzentrum.de/wms_webatlasde?',
        'wms_layers' => 'webatlasde',
        'version' => '',
        'params' => array(
            'LAYERS' => 'webatlasde',
        ),
    );
    $export['openlayers_source_bkg_webatlas_color'] = $ol_source;
    
    
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bkg_webatlas_grey';
    $ol_source->name = 'BKG WebAtlas (Grau)';
    $ol_source->description = 'graue und amtliche Karte WebAtlas, ein Produkt der AdV';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://sg.geodatenzentrum.de/wms_webatlasde_grau?',
        'wms_layers' => 'webatlasde_grau',
        'version' => '',
        'params' => array(
            'LAYERS' => 'webatlasde',
        ),
    );
    $export['openlayers_source_bkg_webatlas_grey'] = $ol_source;
    
    
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bkg_dop20';
    $ol_source->name = 'BKG DOP20';
    $ol_source->description = 'graue und amtliche SatKarte DOP20';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://sg.geodatenzentrum.de/wms_dop?',
        'wms_layers' => 'rgb',
        'version' => '',
        'params' => array(
            'LAYERS' => 'rgb',
        ),
    );
    
    $export['openlayers_source_bkg_dop20'] = $ol_source;
    
    
    
    //non-base layers
    //BGR
    
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bgr_bodenkunde_polygons';
    $ol_source->name = 'Polygone BÜK200';
    $ol_source->description = 'Polygone BÜK200';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_polygons',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_polygons',
        ),
    );
    $export['openlayers_source_bgr_bodenkunde_polygons'] = $ol_source;
    
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bgr_bodenkunde_arcs';
    $ol_source->name = 'Arcs BÜK200';
    $ol_source->description = 'Arcs BÜK200';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_arcs',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_arcs',
        ),
    );
    $export['openlayers_source_bgr_bodenkunde_arcs'] = $ol_source;
    
    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_source_bgr_bodenkunde_labels';
    $ol_source->name = 'Label BÜK200';
    $ol_source->description = 'Label der BÜK200';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_labels',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_labels',
        ),
    );
    $export['openlayers_source_bgr_bodenkunde_labels'] = $ol_source;
    
    return $export;
}
