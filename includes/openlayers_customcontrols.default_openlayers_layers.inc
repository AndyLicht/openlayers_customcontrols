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
    $ol_layer->machine_name = 'openlayers_layer_custumcontrols_bkg_webatlas_color';
    $ol_layer->name = 'BKG: Webatlas(Farbe)';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_webatlas_color',
        'visible' => 1,
        'opacity' => 1,
    );
    
    $export['openlayers_layer_custumcontrols_bkg_webatlas_color'] = $ol_layer;
    
    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_custumcontrols_bkg_webatlas_grey';
    $ol_layer->name = 'BKG: Webatlas(Grau)';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_webatlas_grey',
        'visible' => 1,
        'opacity' => 1,
    );
    
    $export['openlayers_layer_custumcontrols_bkg_webatlas_grey'] = $ol_layer;
    

    $ol_layer = new stdClass();
    $ol_layer->disabled = FALSE; /* Edit this to true to make a default ol_layer disabled initially */
    $ol_layer->api_version = 1;
    $ol_layer->machine_name = 'openlayers_layer_custumcontrols_bkg_dop20';
    $ol_layer->name = 'BKG: DOP20';
    $ol_layer->description = '';
    $ol_layer->factory_service = 'openlayers.Layer:Tile';
    $ol_layer->options = array(
        'source' => 'openlayers_source_bkg_webatlas_color',
        'visible' => 1,
        'opacity' => 1,
    );
    
    $export['openlayers_layer_custumcontrols_bkg_dop20'] = $ol_layer;
    
    
    
    return $export;
}
