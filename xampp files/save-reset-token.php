<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "RavenXDR";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the user data
$data = json_decode(file_get_contents("php://input"));

$userId = $data->userId;
$token = $data->token;

// Update the user record with the reset token
$sql = "UPDATE users SET reset_token='$token' WHERE id=$userId";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $conn->error]);
}

$conn->close();
?>
