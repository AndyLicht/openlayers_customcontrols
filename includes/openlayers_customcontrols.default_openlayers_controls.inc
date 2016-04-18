<?php
/**
 * @file
 * Provide default controls.
 */

/**
 * Implements hook_default_controls().
 */
function openlayers_customcontrols_default_openlayers_controls() 
{
    $export = array();
    
    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_control_pdfexport';
    $ol_control->name = 'PDFExport';
    $ol_control->description = 'Control to export the map as pdf';
    $ol_control->factory_service = 'openlayers.Control:PDFExport';
    $ol_control->options = array();
    $export['openlayers_control_pdfexport'] = $ol_control;
    
    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_control_alert';
    $ol_control->name = 'Alert';
    $ol_control->description = 'Alert Message for shown the implementation of cutom controls';
    $ol_control->factory_service = 'openlayers.Control:Alert';
    $ol_control->options = array();
    $export['openlayers_control_alert'] = $ol_control;
    
    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_control_wmsloader';
    $ol_control->name = 'WMSLoader';
    $ol_control->description = 'load a WMS via Capabilities-URL and a Overlay';
    $ol_control->factory_service = 'openlayers.Control:WMSLoader';
    $ol_control->options = array();
    $export['openlayers_control_wmsloader'] = $ol_control;
    
    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_control_layerloader';
    $ol_control->name = 'LayerLoader';
    $ol_control->description = 'load a WMS via Capabilities-URL and a Overlay';
    $ol_control->factory_service = 'openlayers.Control:LayerLoader';
    $ol_control->options = array();
    $export['openlayers_control_wmsloader'] = $ol_control;
 
    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_control_treeview';
    $ol_control->name = 'Treeview';
    $ol_control->description = 'show a nice Layertree';
    $ol_control->factory_service = 'openlayers.Control:Treeview';
    $ol_control->options = array();
    $export['openlayers_control_treeview'] = $ol_control;

    return $export;
}