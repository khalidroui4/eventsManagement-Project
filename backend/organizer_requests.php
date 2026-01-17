<?php
header("Content-Type: application/json");
require "config.php";

$data = json_decode(file_get_contents("php://input"), true);
$action = $_GET["action"] ?? "";

/* SEND REQUEST */
if ($action === "send") {
    $stmt = $pdo->prepare("
        INSERT INTO organizer_requests(user_id,message)
        VALUES (?,?)
    ");
    $stmt->execute([$data["user_id"], $data["message"]]);
    echo json_encode(["success" => true]);
    exit;
}

/* LIST REQUESTS (ADMIN) */
if ($action === "list") {
    $stmt = $pdo->query("
        SELECT o.*, u.username 
        FROM organizer_requests o
        JOIN utilisateur u ON o.user_id = u.idU
        WHERE o.status='pending'
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

/* APPROVE REQUEST */
if ($action === "approve") {
    $user_id = $data["user_id"];

    $pdo->prepare("
        UPDATE organizer_requests SET status='approved' WHERE user_id=?
    ")->execute([$user_id]);

    $pdo->prepare("
        UPDATE utilisateur SET roleU='organizer' WHERE idU=?
    ")->execute([$user_id]);

    echo json_encode(["success" => true]);
    exit;
}

/* REJECT REQUEST */
if ($action === "reject") {
    $user_id = $data["user_id"];

    $pdo->prepare("
        UPDATE organizer_requests SET status='rejected' WHERE user_id=?
    ")->execute([$user_id]);

    echo json_encode(["success" => true]);
    exit;
}
