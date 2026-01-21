<?php
require 'config.php';

try {
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
