<?php
function ajaxJSON($state, $matrix = "", $data = null){
    echo json_encode(array("success" => $state, "matrix" => $matrix, "data" => $data));
}
if( $_POST["sig"] == "mapData" ){
    $json = json_decode( file_get_contents( "map_builder/map_final_json/map.json" ));
    $matrix = $json->mapData;
    $size = $json->objSize;

    ajaxJSON( true, $matrix, $size );
}