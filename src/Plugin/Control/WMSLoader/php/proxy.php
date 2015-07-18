<?php

$url = "http://www.umweltkarten-niedersachsen.de/arcgis/services/GAV_wms/MapServer/WMSServer?request=getCapabilities&service=wms";
$xml = file_get_contents($url);
//$xml = simplexml_load_file($url);
print_r($xml)
?>