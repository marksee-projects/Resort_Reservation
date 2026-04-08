<?php
session_start();
if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] === 'user') {
    header('Location: index.html');
    exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Dashboard — Peninsula de Bataan</title>
</head>
<body>
  <h1>Receptionist Dashboard</h1>
  <p>Welcome, <?= htmlspecialchars($_SESSION['user_name']) ?>!</p>
  <p>Role: <?= $_SESSION['user_role'] ?></p>
  <a href="logout.php">Log out</a>
</body>
</html>