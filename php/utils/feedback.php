<?php
require "../database/connection.php";

function sendFeedback($name, $email, $message, $date) {
    try {
        global $connection;
        $sql = "INSERT INTO feedback (name, email, message, date) VALUES (?, ?, ?, ?)";
        $prepared = $connection->prepare($sql);
        $prepared->bind_param("ssss", $name, $email, $message, $date);
        $prepared->execute();
        return ["error" => false];
    } catch (\Throwable $th) {
        return ["error" => true];
    }
}
?>