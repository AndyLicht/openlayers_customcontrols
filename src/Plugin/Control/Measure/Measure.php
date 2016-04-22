<?php
/**
 * @file
 * Control: Measure
 */

namespace Drupal\openlayers_customcontrols\Plugin\Control\Measure;
use Drupal\openlayers\Component\Annotation\OpenlayersPlugin;
use Drupal\openlayers\Types\Control;

/**
 * Class Rotate.
 *
 * @OpenlayersPlugin(
 *  id = "Measure",
 *  description = "Displays a toolbar to measure length and area."
 * )
 *
 */
class Measure extends Control {

/*function openlayers_customcontrols_menu() {
  $items = array();

  $items['examples/form-example'] = array( //this creates a URL that will call this form at "examples/form-example"
    'title' => 'Example Form', //page title
    'description' => 'A form to mess around with.',
    'page callback' => 'drupal_get_form', //this is the function that will be called when the page is accessed.  for a form, use drupal_get_form
    'page arguments' => array('form_example_form'), //put the name of the form here
    'access callback' => TRUE
  );

  return $items;
}

function openlayers_customcontrols_form($form, &$form_state) {
  
  $form['submit_button'] = array(
    '#type' => 'submit',
    '#value' => t('Click Here!'),
  );
  
  return $form;
}

function openlayers_customcontrols_form_validate($form, &$form_state) {
}

function openlayers_customcontrols_form_submit($form, &$form_state) {
}
*/
}
