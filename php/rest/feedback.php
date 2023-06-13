<?php
require "../utils/feedback.php";

header("Content-Type: application/json; charset=utf-8");

$REQUEST = json_decode(file_get_contents("php://input"), true);
$reqMethod = $_SERVER["REQUEST_METHOD"];

function getRequest($key, $request) {
    $value = key_exists($key, $request) ? $request[$key] : "";
    $value = preg_replace("/[\<\>]/", "", $value);
    return $value;
}

switch ($reqMethod) {
    case "POST": {
        $name = getRequest("name", $REQUEST);
        $email = getRequest("email", $REQUEST);
        $message = getRequest("message", $REQUEST);
        $date = getRequest("date", $REQUEST);
        $response = sendFeedback($name, $email, $message, $date);
        echo json_encode($response);
        break;
    }
    default: {
        echo json_encode(["error" => true]);
    }
}
?>