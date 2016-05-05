<?php
$function_name = $_GET['jsonp'];

$variable = file_get_contents('http://personabrowser.gpii.eu/personas.json');

$json_array = array();
$json_array['key1'] = "value1";
$json_array['key2'] = "value2";

echo "$function_name (\n";
print json_encode($variable);
echo ");\n";
?>
