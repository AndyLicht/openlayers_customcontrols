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

    $ol_source = new stdClass();
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_customcontrols_source_openstreetmap_bw';
    $ol_source->name = 'Custom Controls: OpenStreetMap black and white';
    $ol_source->description = 'OpenStreetMap black and white source';
    $ol_source->factory_service = 'openlayers.Source:OSM';
    $ol_source->options = array(
	'crossOrigin' => 'null',
	'url' => '//{a-c}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
	'attributions' => '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    );
    $export['openlayers_customcontrols_source_openstreetmap_bw'] = $ol_source;

    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_customcontrols_source_bgr_bodenkunde_polygons';
    $ol_source->name = 'Custom Controls: Polygone BÜK200';
    $ol_source->description = 'Polygone BÜK200 source';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_polygons',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_polygons',
        ),
    );
    $export['openlayers_customcontrols_source_bgr_bodenkunde_polygons'] = $ol_source;

    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_customcontrols_source_bgr_bodenkunde_arcs';
    $ol_source->name = 'Custom Controls: Arcs BÜK200';
    $ol_source->description = 'Arcs BÜK200 source';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_arcs',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_arcs',
        ),
    );
    $export['openlayers_customcontrols_source_bgr_bodenkunde_arcs'] = $ol_source;

    $ol_source = new stdClass();
    $ol_source->disabled = FALSE; /* Edit this to true to make a default source disabled initially */
    $ol_source->api_version = 1;
    $ol_source->machine_name = 'openlayers_customcontrols_source_bgr_bodenkunde_labels';
    $ol_source->name = 'Custom Controls: Label BÜK200';
    $ol_source->description = 'Label der BÜK200 source';
    $ol_source->factory_service = 'openlayers.Source:TileWMS';
    $ol_source->options = array(
        'url' => 'http://www.bgr.de/service/bodenkunde/buek200_3926mg/v1.7/index.php',
        'wms_layers' => 'buek200_3926mg_v17_labels',
        'version' => '',
        'params' => array(
            'LAYERS' => 'buek200_3926mg_v17_labels',
        ),
    );
    $export['openlayers_customcontrols_source_bgr_bodenkunde_labels'] = $ol_source;

    return $export;
}
