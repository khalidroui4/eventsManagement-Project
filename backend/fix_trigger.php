<?php
require 'config.php';

try {
    echo "Starting cleanup...\n";

    // 1. Drop the bad trigger
    echo "Dropping trigger 'After_evaluation'...\n";
    $pdo->exec("DROP TRIGGER IF EXISTS After_evaluation");
    echo "Trigger dropped.\n";

    // 2. Clean up existing descriptions
    // Use substring_index to remove everything after "\nMoyenne:"
    echo "Cleaning up event descriptions...\n";
    $sql = "UPDATE evenement 
            SET descriptionE = SUBSTRING_INDEX(descriptionE, '\nMoyenne:', 1) 
            WHERE descriptionE LIKE '%\nMoyenne:%'";

    $stmt = $pdo->prepare($sql);
    $stmt->execute();
    echo "Updated " . $stmt->rowCount() . " events.\n";

    echo "Cleanup complete successfully.\n";

} catch (PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
