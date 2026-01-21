<?php
require "config.php";
header("Content-Type: application/json");

$action = $_GET["action"] ?? "";

/*RUN CURSOR: GET ALL EVENTS */
if ($action === "all_events") {
    $stmt = $pdo->query("SELECT * FROM evenement ORDER BY idE DESC");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

/*RUN CURSOR: GET ORGANIZER REQUESTS */
if ($action === "organizer_requests") {
    $stmt = $pdo->query("
        SELECT 
            o.user_id,
            u.username,
            u.full_name,
            o.message
        FROM organizer_requests o
        JOIN utilisateur u ON o.user_id = u.idU
        WHERE o.status = 'pending'
    ");
    echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC));
    exit;
}

/*RUN CURSOR: ACCEPT ORGANIZER */
if ($action === "accept") {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data["user_id"];

    try {
        $pdo->beginTransaction();

        $stmt = $pdo->prepare("UPDATE utilisateur SET roleU='organizer' WHERE idU=?");
        $stmt->execute([$userId]);

        $stmt = $pdo->prepare("UPDATE organizer_requests SET status='accepted' WHERE user_id=?");
        $stmt->execute([$userId]);

        $pdo->commit();

        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        $pdo->rollBack();
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

/*RUN CURSOR: REFUSE ORGANIZER */
if ($action === "refuse") {
    $data = json_decode(file_get_contents("php://input"), true);
    $userId = $data["user_id"];

    try {
        $stmt = $pdo->prepare("UPDATE organizer_requests SET status='refused' WHERE user_id=?");
        $stmt->execute([$userId]);
        echo json_encode(["success" => true]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

/*RUN CURSOR: ARCHIVER */
if ($action === "archiver") {
    try {
        $pdo->query("CALL Archiver()");
        echo json_encode(["success" => true, "message" => "Events archived"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

/*RUN CURSOR: ETAT */
if ($action === "etat") {
    try {
        $pdo->query("CALL Etat()");
        echo json_encode(["success" => true, "message" => "Etat updated"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

/*RUN CURSOR: STATISTICS */
if ($action === "stats") {
    try {
        $pdo->query("CALL Calculer_statistiques()");
        echo json_encode(["success" => true, "message" => "Statistics calculated"]);
    } catch (PDOException $e) {
        echo json_encode(["success" => false, "error" => $e->getMessage()]);
    }
    exit;
}

echo json_encode(["success" => false, "error" => "Invalid action"]);
