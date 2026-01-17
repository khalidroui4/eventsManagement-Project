<?php
require "config.php";

try {
    // 1. Total Events
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM evenement");
    $totalEvents = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // 2. Active Users
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM utilisateur");
    $totalUsers = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // 3. Total Participations (Sum of num_participant in events)
    // OR distinct count from participations table
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM participations WHERE statut = 'active'");
    $totalParticipations = $stmt->fetch(PDO::FETCH_ASSOC)['count'];

    // 4. Average Satisfaction (from evaluations)
    $stmt = $pdo->query("SELECT AVG(note) as avg_note FROM evaluations");
    $avgNote = $stmt->fetch(PDO::FETCH_ASSOC)['avg_note'];
    $satisfaction = $avgNote ? round(($avgNote / 5) * 100) : 100; // Default to 100 if no ratings

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