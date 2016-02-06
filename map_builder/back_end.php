<?php
    $tempDir = $_FILES["uploadFile"]["tmp_name"];
    $newName = "map.bmp";
    copy($tempDir, "map_resource/".$newName);
    unlink($tempDir);
?>
<script src="js/jquery-2.1.1.min.js"></script>
<div id="ok"></div>
<script>
    alert("upload finish");
</script>
