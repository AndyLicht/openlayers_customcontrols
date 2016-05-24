<?php
/**
 * @file
 * Default layers
 */

/**
 * Implements hook_default_layers()
 */
function openlayers_customcontrols_default_openlayers_layers() {
    $export = array();

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_customcontrols_layer_openstreetmap_bw';
    $ol_layer->name = 'Custom Controls: OpenStreetMap black and white';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
	'source' => 'openlayers_customcontrols_source_openstreetmap_bw',
    );
    $export['openlayers_customcontrols_layer_openstreetmap_bw'] = $ol_layer;

    //non-base layers

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_customcontrols_layer_bgr_buek200_polygons';
    $ol_layer->name = 'Custom Controls: BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodenpolygone';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_customcontrols_source_bgr_bodenkunde_polygons',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'tree_uid' => '4',
        'tree_group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'tree_title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodenpolygone',
        'tree_name' => 'buek200_3926mg_v17_polygons',
        'tree_extent' => '1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924'
    );
    $export['openlayers_customcontrols_layer_bgr_buek200_polygons'] = $ol_layer;

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_customcontrols_layer_bgr_buek200_arcs';
    $ol_layer->name = 'Custom Controls: BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodengrenzen';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_customcontrols_source_bgr_bodenkunde_arcs',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'tree_uid' => '5',
        'tree_group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'tree_title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodengrenzen',
        'tree_name' => 'buek200_3926mg_v17_arcs',
        'tree_extent' => '1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924'
    );
    $export['openlayers_customcontrols_layer_bgr_buek200_arcs'] = $ol_layer;

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_customcontrols_layer_bgr_buek200_label';
    $ol_layer->name = 'Custom Controls: BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Referenzpunkte';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_customcontrols_source_bgr_bodenkunde_labels',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'tree_uid' => '6',
        'tree_group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'tree_title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Referenzpunkte',
        'tree_name' => 'buek200_3926mg_v17_labels',
        'tree_extent' => '1111067.59246, 6796473.85908, 1266192.41608, 6949274.60924'
    );
    $export['openlayers_customcontrols_layer_bgr_buek200_label'] = $ol_layer;

    return $export;
}
