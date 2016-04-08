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
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bkg_webatlas_color';
    $ol_layer->name = 'BKG: Webatlas(Farbe)';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_webatlas_color',
        'visible' => 1,
        'opacity' => 0.4,
        'base' => true,
        'uid' => '1',
        'group' => 'none',
        'title' => 'WebAtlas',
        'name' => 'openlayers_layer_customcontrols_bkg_webatlas_color',
        
    );
    
    $export['openlayers_layer_customcontrols_bkg_webatlas_color'] = $ol_layer;
    
    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bkg_webatlas_grey';
    $ol_layer->name = 'BKG: Webatlas(Grau)';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_webatlas_grey',
        'visible' => 1,
        'opacity' => 1,
        'base' => true,
        'uid' => '2',
        'group' => 'none',
        'title' => 'WebAtlas (Graustufen)',
        'name' => 'openlayers_layer_customcontrols_bkg_webatlas_grey',
    );
    
    $export['openlayers_layer_customcontrols_bkg_webatlas_grey'] = $ol_layer;
    

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bkg_dop20';
    $ol_layer->name = 'BKG: DOP20';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_dop20',
        'visible' => 1,
        'opacity' => 1,
        'base' => true,
        'uid' => '3',
        'group' => 'none',
        'title' => 'DOP20',
        'name' => 'openlayers_layer_customcontrols_bkg_dop20',
    );
    
    $export['openlayers_layer_customcontrols_bkg_dop20'] = $ol_layer;
    
    
    //non-base layers
    
    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bgr_buek200_polygons';
    $ol_layer->name = 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodenpolygone';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bgr_bodenkunde_polygons',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'uid' => '4',
        'group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodenpolygone',
        'name' => 'buek200_3926mg_v17_polygons',
    );
    $export['openlayers_layer_customcontrols_bgr_buek200_polygons'] = $ol_layer;
    
    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bgr_buek200_arcs';
    $ol_layer->name = 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodengrenzen';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bgr_bodenkunde_arcs',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'uid' => '5',
        'group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Bodengrenzen',
        'name' => 'buek200_3926mg_v17_arcs',
    );
    $export['openlayers_layer_customcontrols_bgr_buek200_arcs'] = $ol_layer;
    
    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_customcontrols_bgr_buek200_label';
    $ol_layer->name = 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Referenzpunkte';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bgr_bodenkunde_labels',
        'visible' => 1,
        'opacity' => 1,
        'base' => false,
        'uid' => '6',
        'group' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7',
        'title' => 'BGR Bodenkunde: BÜK 200 CC 3926 Braunschweig v1.7 Referenzpunkte',
        'name' => 'buek200_3926mg_v17_labels',
    );
    $export['openlayers_layer_customcontrols_bgr_buek200_label'] = $ol_layer;
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    return $export;
}
