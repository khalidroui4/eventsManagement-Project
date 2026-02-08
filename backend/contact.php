<?php
require "config.php";

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "POST") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data["name"]) || !isset($data["email"]) || !isset($data["message"])) {
        echo json_encode(["success" => false, "error" => "Champs manquants"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
INSERT INTO messages (name, email, subject, message)
VALUES (?, ?, ?, ?)
");
        $stmt->execute([
            $data["name"],
            $data["email"],
            $data["subject"] ?? "",
            $data["message"]
        ]);

        echo json_encode(["success" => true, "message" => "Message envoyé avec succès"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => "Erreur DB: " . $e->getMessage()]);
    }
    exit;
}

if ($method === "GET") {
    try {
        $stmt = $pdo->query("SELECT * FROM messages ORDER BY created_at DESC");
        $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($messages);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}
?>