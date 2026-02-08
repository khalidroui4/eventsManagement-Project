<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);


require "config.php";

const INPUT_SOURCE = "php://input";

$method = $_SERVER["REQUEST_METHOD"];

if ($method === "GET") {

    if (isset($_GET["id"])) {
        $stmt = $pdo->prepare("
            SELECT 
                e.*,
                COALESCE(Moyenne_ev(e.idE), 0) AS moyenne,
                u.username AS organizer_name,
                u.full_name AS organizer_fullname,
                u.profile_image AS organizer_image
            FROM evenement e
            LEFT JOIN utilisateur u ON e.creator_id = u.idU
            WHERE e.idE = ?
        ");
        $stmt->execute([$_GET["id"]]);
        $event = $stmt->fetch(PDO::FETCH_ASSOC);

        echo json_encode($event ?: ["success" => false, "error" => "Event not found"]);
        exit;
    }

    if (isset($_GET["creator_id"])) {
        $stmt = $pdo->prepare("
            SELECT 
                e.*,
                COALESCE(Moyenne_ev(e.idE), 0) AS moyenne,
                u.username AS organizer_name,
                u.full_name AS organizer_fullname,
                u.profile_image AS organizer_image
            FROM evenement e
            LEFT JOIN utilisateur u ON e.creator_id = u.idU
            WHERE e.creator_id = ?
        ");
        $stmt->execute([$_GET["creator_id"]]);
        echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
        exit;
    }

    $stmt = $pdo->query("
        SELECT 
            e.*,
            COALESCE(Moyenne_ev(e.idE), 0) AS moyenne,
            u.username AS organizer_name,
            u.full_name AS organizer_fullname,
            u.profile_image AS organizer_image
        FROM evenement e
        LEFT JOIN utilisateur u ON e.creator_id = u.idU
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}


if ($method === "POST" && isset($_GET["action"]) && $_GET["action"] === "update") {

    $data = json_decode(file_get_contents(INPUT_SOURCE), true);
    $id = (int) $_GET["id"];

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(["success" => false, "error" => "Unauthorized"]);
        exit;
    }

    $check = $pdo->prepare("SELECT creator_id FROM evenement WHERE idE = ?");
    $check->execute([$id]);
    $ev = $check->fetch(PDO::FETCH_ASSOC);

    if (!$ev || $ev['creator_id'] != $_SESSION['user_id']) {
        echo json_encode(["success" => false, "error" => "Forbidden: You do not own this event"]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            UPDATE evenement SET
            event_name = ?,
            capaciteE = ?,
            dateE = ?,
            placeE = ?,
            descriptionE = ?
            WHERE idE = ?
        ");

        $stmt->execute([
            $data["event_name"],
            $data["capaciteE"],
            $data["dateE"],
            $data["placeE"],
            $data["descriptionE"],
            $id
        ]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}


if ($method === "POST" && isset($_GET["action"]) && $_GET["action"] === "delete") {
    $data = json_decode(file_get_contents(INPUT_SOURCE), true);

    if (!$data || !isset($data["id"])) {
        echo json_encode(["success" => false, "error" => "Missing id"]);
        exit;
    }

    $id = (int) $data["id"];

    if (!isset($_SESSION['user_id'])) {
        echo json_encode(["success" => false, "error" => "Unauthorized"]);
        exit;
    }

    $check = $pdo->prepare("SELECT creator_id FROM evenement WHERE idE = ?");
    $check->execute([$id]);
    $ev = $check->fetch(PDO::FETCH_ASSOC);

    if (!$ev || $ev['creator_id'] != $_SESSION['user_id']) {
        echo json_encode(["success" => false, "error" => "Forbidden: You do not own this event"]);
        exit;
    }

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("DELETE FROM evaluations WHERE event_id = ?");
        $stmt->execute([$id]);

        $stmt = $pdo->prepare("DELETE FROM participations WHERE event_id = ?");
        $stmt->execute([$id]);

        $stmt = $pdo->prepare("DELETE FROM evenement WHERE idE = ?");
        $stmt->execute([$id]);

        $pdo->commit();

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode([
            "success" => false,
            "error" => $e->getMessage()
        ]);
    }

    exit;
}



if ($method === "POST") {

    $data = json_decode(file_get_contents(INPUT_SOURCE), true);

    try {
        $stmt = $pdo->prepare("
            INSERT INTO evenement(event_name, dateE, capaciteE, creator_id, placeE, descriptionE, num_participant, etat)
            VALUES (?, ?, ?, ?, ?, ?, 0, 'ouvert')
        ");
        $stmt->execute([
            $data["event_name"],
            $data["dateE"],
            $data["capaciteE"],
            $_SESSION['user_id'] ?? 0,
            $data["placeE"] ?? "",
            $data["descriptionE"] ?? ""
        ]);

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

echo json_encode(["success" => false, "error" => "Invalid request"]);
?>