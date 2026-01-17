<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json");
require "config.php";

$method = $_SERVER["REQUEST_METHOD"];
$action = $_GET["action"] ?? "";

/* =========================
   LIST PARTICIPATIONS (PROFILE)
   ========================= */
if ($method === "GET" && isset($_GET["user_id"]) && $action === "list") {
    $user_id = $_GET["user_id"];

    $stmt = $pdo->prepare("
    SELECT 
        e.idE,
        e.event_name,
        e.dateE,
        e.placeE,
        e.num_participant,
        e.capaciteE,
        e.etat,
        u.username AS organizer_name,
        p.statut
    FROM participations p
    JOIN evenement e ON p.event_id = e.idE
    JOIN utilisateur u ON e.creator_id = u.idU
    WHERE p.user_id = ? AND p.statut = 'active'
    ORDER BY e.dateE DESC
");

    $stmt->execute([$user_id]);

    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

/* =========================
   CHECK IF USER PARTICIPATES (EVENT DETAILS)
   ========================= */
if ($method === "GET" && isset($_GET["user_id"]) && isset($_GET["event_id"]) && $action === "check") {
    $stmt = $pdo->prepare("
        SELECT 1 
        FROM participations 
        WHERE user_id = ? AND event_id = ? AND statut = 'active'
        LIMIT 1
    ");
    $stmt->execute([$_GET["user_id"], $_GET["event_id"]]);

    echo json_encode([
        "exists" => $stmt->rowCount() > 0
    ]);
    exit;
}

/* =========================
   INSCRIRE (PARTICIPATE)
   USE PROCEDURE Inscrire_utilisateur
   ========================= */
if ($method === "POST" && $action === "inscrire") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data["user_id"]) || !isset($data["event_id"])) {
        echo json_encode(["success" => false, "error" => "Invalid data"]);
        exit;
    }

    try {
        // Check if participation already exists
        $check = $pdo->prepare("
            SELECT idP, statut 
            FROM participations 
            WHERE user_id = ? AND event_id = ?
            LIMIT 1
        ");
        $check->execute([$data["user_id"], $data["event_id"]]);
        $row = $check->fetch(PDO::FETCH_ASSOC);

        if ($row) {
            // If exists and was cancelled → reactivate
            if ($row["statut"] === "annulee") {
                $stmt = $pdo->prepare("
                    UPDATE participations 
                    SET statut='active' 
                    WHERE idP=?
                ");
                $stmt->execute([$row["idP"]]);

                // increment participants
                $pdo->prepare("
                    UPDATE evenement 
                    SET num_participant = num_participant + 1 
                    WHERE idE = ?
                ")->execute([$data["event_id"]]);
            }
        } else {
            // No participation yet → normal insert
            $stmt = $pdo->prepare("CALL Inscrire_utilisateur(?, ?)");
            $stmt->execute([$data["user_id"], $data["event_id"]]);
        }

        echo json_encode([
            "success" => true,
            "message" => "Participation enregistrée"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
    exit;
}


/* =========================
   ANNULER (CANCEL PARTICIPATION)
   USE PROCEDURE Annuler_participation
   ========================= */
if ($method === "POST" && $action === "annuler") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (!$data || !isset($data["user_id"]) || !isset($data["event_id"])) {
        echo json_encode(["success" => false, "error" => "Invalid data"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("CALL Annuler_participation(?, ?)");
        $stmt->execute([$data["user_id"], $data["event_id"]]);

        echo json_encode([
            "success" => true,
            "message" => "Participation annulée"
        ]);
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }
    exit;
}

/* =========================
   FALLBACK
   ========================= */
echo json_encode([
    "success" => false,
    "error" => "Invalid request"
]);
