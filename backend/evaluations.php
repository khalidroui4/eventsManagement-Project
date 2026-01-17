<?php
header("Content-Type: application/json");
require "config.php";

$method = $_SERVER["REQUEST_METHOD"];
$input = json_decode(file_get_contents("php://input"), true);

/* =========================
   ADD EVALUATION
   ========================= */
if ($method === "POST") {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO evaluations (user_id, event_id, note, comments)
            VALUES (?, ?, ?, ?)
        ");

        $stmt->execute([
            $input["user_id"],
            $input["event_id"],
            $input["note"],
            $input["comments"]
        ]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

/* =========================
   GET EVALUATIONS BY EVENT
   ========================= */
if ($method === "GET" && isset($_GET["event_id"])) {

    $stmt = $pdo->prepare("
        SELECT e.*, u.username, u.profile_image
        FROM evaluations e
        JOIN utilisateur u ON e.user_id = u.idU
        WHERE e.event_id = ?
        ORDER BY e.date_eval DESC
    ");

    $stmt->execute([$_GET["event_id"]]);
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

/* =========================
   DELETE EVALUATION
   ========================= */
if ($method === "DELETE" && isset($_GET["id"])) {

    try {
        $stmt = $pdo->prepare("DELETE FROM evaluations WHERE ide = ?");
        $stmt->execute([$_GET["id"]]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}
