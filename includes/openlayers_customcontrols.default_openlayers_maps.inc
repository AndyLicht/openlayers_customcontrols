<?php
/**
 * @file
 * Default maps.
 */

/**
 * Implements hook_default_maps().
 */
function openlayers_customcontrols_default_openlayers_maps() {
  $export = array();

  $ol_map = new stdClass();
  $ol_map->disabled = FALSE; /* Edit this to true to make a default map disabled initially */
  $ol_map->api_version = 1;
  $ol_map->machine_name = 'openlayers_map_bkg';
  $ol_map->name = 'BKG Map';
  $ol_map->description = '';
  $ol_map->factory_service = 'openlayers.Map:OLMap';
  $ol_map->options = array(
    'width' => 'auto',
    'height' => '700px',
    'contextualLinks' => 1,
    'provideBlock' => 1,
    'provideIframe' => 1,
    'view' => array(
      'center' => array(
        'lat' => 8.5,
        'lon' => 50.0,
      ),
      'rotation' => '0',
      'zoom' => '5',
    ),
    'layers' => array(
      0 => 'openlayers_layer_custumcontrols_bkg_dop20',
      1 => 'openlayers_layer_custumcontrols_bkg_webatlas_grey',
      2 => 'openlayers_layer_custumcontrols_bkg_webatlas_color',
    ),
    'controls' => array(
      0 => 'openlayers_control_zoom',
      1 => 'openlayers_examples_control_ol3layerswitcher',
    ),
    'interactions' => array(
      0 => 'openlayers_interaction_doubleclickzoom',
      1 => 'openlayers_interaction_dragpan',
      2 => 'openlayers_interaction_mousewheelzoom',
    ),
  );
  $export['openlayers_map_bkg'] = $ol_map;
  return $export;
}
