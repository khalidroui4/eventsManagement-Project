<?php
require "config.php";
header("Content-Type: application/json");

$full_name = $_POST['full_name'] ?? '';
$username = $_POST['username'] ?? '';
$gmailU = $_POST['gmailU'] ?? '';
$location = $_POST['location'] ?? '';
$idU = $_POST['idU'] ?? 0;

if (!$idU) {
  echo json_encode(["success" => false, "error" => "Missing ID"]);
  exit;
}


if (!isset($_SESSION['user_id']) || $_SESSION['user_id'] != $idU) {
  echo json_encode(["success" => false, "error" => "Unauthorized: You can only update your own profile"]);
  exit;
}


$profile_image_sql = "";
$params = [$full_name, $username, $gmailU, $location];

if (isset($_FILES['profile_image']) && $_FILES['profile_image']['error'] === UPLOAD_ERR_OK) {
  $uploadDir = 'uploads/';
  if (!is_dir($uploadDir))
    mkdir($uploadDir, 0777, true);

  $fileName = time() . '_' . basename($_FILES['profile_image']['name']);
  $targetPath = $uploadDir . $fileName;

  if (move_uploaded_file($_FILES['profile_image']['tmp_name'], $targetPath)) {

    $dbPath = 'uploads/' . $fileName;
    $profile_image_sql = ", profile_image = ?";
    $params[] = $dbPath;
  }
}

$params[] = $idU;

$sql = "UPDATE utilisateur SET full_name = ?, username = ?, gmailU = ?, location = ? $profile_image_sql WHERE idU = ?";
$stmt = $pdo->prepare($sql);
$ok = $stmt->execute($params);

// Fetch updated user to return to frontend
if ($ok) {
  $stmt = $pdo->prepare("SELECT * FROM utilisateur WHERE idU = ?");
  $stmt->execute([$idU]);
  $updatedUser = $stmt->fetch(PDO::FETCH_ASSOC);
  // Be careful with password
  unset($updatedUser['passwordU']);

  echo json_encode(["success" => true, "user" => $updatedUser]);
} else {
  echo json_encode(["success" => false]);
}
