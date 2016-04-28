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
    $ol_control->machine_name = 'openlayers_customcontrols_control_treeview';
    $ol_control->name = 'Treeview';
    $ol_control->description = 'show a nice Layertree';
    $ol_control->factory_service = 'openlayers.Control:Treeview';
    $ol_control->options = array();
    $export['openlayers_control_treeview'] = $ol_control;

    $ol_control = new stdClass();
    $ol_control->api_version = 1;
    $ol_control->machine_name = 'openlayers_customcontrols_control_measure';
    $ol_control->name = 'Measure';
    $ol_control->description = 'Measure length and area.';
    $ol_control->factory_service = 'openlayers.Control:Measure';
    $ol_control->options = array();
    $export['openlayers_control_measure'] = $ol_control;

    return $export;
}