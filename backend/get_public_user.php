<?php
ini_set('display_errors', 0);
error_reporting(E_ALL);

header("Content-Type: application/json; charset=UTF-8");

register_shutdown_function(function () {
    $error = error_get_last();
    if ($error && ($error['type'] === E_ERROR || $error['type'] === E_PARSE || $error['type'] === E_COMPILE_ERROR)) {
        echo json_encode(['success' => false, 'error' => 'Fatal Error: ' . $error['message']]);
    }
});

try {
    require "config.php";

    $method = $_SERVER["REQUEST_METHOD"];

    if ($method === "GET" && isset($_GET["id"])) {
        $id = $_GET["id"];

        if (!isset($pdo)) {
            throw new Exception("Database connection not established");
        }

        $stmt = $pdo->prepare("
            SELECT idU, username, full_name, profile_image, roleU, location, gmailU
            FROM utilisateur
            WHERE idU = ?
        ");
        $stmt->execute([$id]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user) {
            echo json_encode(["success" => true, "user" => $user]);
        } else {
            echo json_encode(["success" => false, "error" => "User not found"]);
        }
    } else {
        echo json_encode(["success" => false, "error" => "Invalid request"]);
    }
} catch (Exception $e) {
    echo json_encode(["success" => false, "error" => "Server Error: " . $e->getMessage()]);
}
