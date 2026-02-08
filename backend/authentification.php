<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require "config.php";



if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
$action = $_GET["action"] ?? "";

if ($action === "register") {

    if (
        !isset($data["nom"]) ||
        !isset($data["username"]) ||
        !isset($data["email"]) ||
        !isset($data["motdepasse"])
    ) {
        echo json_encode([
            "success" => false,
            "error" => "Missing required fields"
        ]);
        exit;
    }

    try {
        $check = $pdo->prepare("
            SELECT idU FROM utilisateur 
            WHERE username = ? OR gmailU = ?
        ");
        $check->execute([
            $data["username"],
            $data["email"]
        ]);

        if ($check->rowCount() > 0) {
            echo json_encode([
                "success" => false,
                "error" => "Username or email already exists"
            ]);
            exit;
        }

        $stmt = $pdo->prepare("
            INSERT INTO utilisateur 
            (full_name, username, gmailU, passwordU, roleU)
            VALUES (?, ?, ?, ?, 'user')
        ");

        $stmt->execute([
            $data["nom"],
            $data["username"],
            $data["email"],
            password_hash($data["motdepasse"], PASSWORD_DEFAULT)
        ]);

        echo json_encode([
            "success" => true,
            "message" => "Account created successfully"
        ]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            echo json_encode([
                "success" => false,
                "error" => "Username or email already exists"
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Server error while creating account"
            ]);
        }
    }

    exit;
}

if ($action === "login") {

    if (!isset($data["email"]) || !isset($data["motdepasse"])) {
        echo json_encode([
            "success" => false,
            "error" => "Missing email or password"
        ]);
        exit;
    }

    try {
        $stmt = $pdo->prepare("
            SELECT * FROM utilisateur WHERE gmailU = ?
        ");
        $stmt->execute([$data["email"]]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($user && password_verify($data["motdepasse"], $user["passwordU"])) {
            unset($user["passwordU"]);

            // Security: Set Session
            $_SESSION['user_id'] = $user['idU'];
            $_SESSION['role'] = $user['roleU'];

            echo json_encode([
                "success" => true,
                "user" => $user
            ]);
        } else {
            echo json_encode([
                "success" => false,
                "error" => "Invalid email or password"
            ]);
        }
    } catch (PDOException $e) {
        echo json_encode([
            "success" => false,
            "error" => "Server error during login"
        ]);
    }

    exit;
}

if ($action === "logout") {
    session_destroy();
    echo json_encode(["success" => true]);
    exit;
}

echo json_encode([
    "success" => false,
    "error" => "Invalid action"
]);
