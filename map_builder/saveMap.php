<?php
    function ajaxJSON($state, $info = "", $data = null){
        echo json_encode(array("success" => $state, "info" => $info, "data" => $data));
    }
    $map = $_POST["map"];
    $objSize = $_POST["objSize"];
    $map_json = json_encode(array( "mapData"=>$map, "objSize"=>$objSize ));
    file_put_contents('map_final_json/map.json', $map_json);
    ajaxJSON(true,"ok",0);