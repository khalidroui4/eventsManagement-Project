<?php
require "config.php";

try {

    $stmt = $pdo->query("SELECT COUNT(*) as count FROM evenement");
    $totalEvents = $stmt->fetch(PDO::FETCH_ASSOC)['count'];


    $stmt = $pdo->query("SELECT COUNT(*) as count FROM utilisateur");
    $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['count'];


    $stmt = $pdo->query("SELECT COUNT(*) as count FROM participations WHERE statut = 'active'");
    $totalParticipations = $stmt->fetch(PDO::FETCH_ASSOC)['count'];


    $stmt = $pdo->query("SELECT AVG(note) as avg_note FROM evaluations");
    $avgNote = $stmt->fetch(PDO::FETCH_ASSOC)['avg_note'];
    $satisfaction = $avgNote ? round(($avgNote / 5) * 100) : 0; // Default to 0 if no ratings

    echo json_encode([
        "success" => true,
        "stats" => [
            "events" => $totalEvents,
            "users" => $totalUsers,
            "participations" => $totalParticipations,
            "satisfaction" => $satisfaction
        ]
    ]);

} catch (PDOException $e) {
    echo json_encode(["success" => false, "error" => $e->getMessage()]);
}
?>