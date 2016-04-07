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
    
    
    
    

    return $export;
}
