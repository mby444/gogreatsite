<?php
function getConfig($filePath = "../../env-json/connection.json") {
    try {
        $file = fopen($filePath, "r");
        $rawData = fread($file, filesize($filePath));
        $data = json_decode($rawData, true);
        return $data;
    } catch (\Throwable $th) {
        die("getConfig error: $th");
    }
}

$dbConfig = getConfig();
$connection = new mysqli($dbConfig["hostname"], $dbConfig["username"], $dbConfig["password"], $dbConfig["database"]);
?>