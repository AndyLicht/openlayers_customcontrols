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
  $ol_map->machine_name = 'openlayers_customcontrols_map_treeview';
  $ol_map->name = 'Custom Controls: Treeview Map';
  $ol_map->description = 'Custom Controls Example Map with various controls.';
  $ol_map->factory_service = 'openlayers.Map:OLMap';
  $ol_map->options = array(
    'width' => 'auto',
    'height' => '500px',
    'contextualLinks' => 1,
    'provideBlock' => 1,
    'provideIframe' => 1,
    'view' => array(
      'center' => array(
        'lat' => 9.0,
        'lon' => 53.5,
      ),
      'rotation' => '0',
      'zoom' => '7',
    ),
    'layers' => array(
    /**
    * 0 => 'openlayers_customcontrols_layer_openstreetmap_bw',
    */
      0 => 'openlayers_examples_layer_openstreetmap_bw',
      1 => 'openlayers_examples_layer_openstreetmap_hot',
      2 => 'openlayers_examples_layer_openstreetmap_mapnik',
      3 => 'openlayers_customcontrols_layer_bgr_buek200_polygons',
      4 => 'openlayers_customcontrols_layer_bgr_buek200_arcs',
      5 => 'openlayers_customcontrols_layer_bgr_buek200_label',
    ),
    'controls' => array(
      0 => 'openlayers_control_zoom',
      1 => 'openlayers_examples_control_osm_layer_switcher',
      2 => 'openlayers_customcontrols_control_treeview',
      /**
      *3 => 'openlayers_customcontrols_control_measure',
      */
    ),
    'interactions' => array(
      0 => 'openlayers_interaction_doubleclickzoom',
      1 => 'openlayers_interaction_dragpan',
      2 => 'openlayers_interaction_mousewheelzoom',
    ),
  );
  $export['openlayers_map_treeview_example'] = $ol_map;
  return $export;
}
