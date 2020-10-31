<?php 
include('includes/config.php');

if (!isset($_SESSION['id'])) { // if no id session variable
    header('Location: index'); // redirect to login page
}

if (isset($_POST['logout'])) { // if logout form submitted, unset session variables and redirect
    unset($_SESSION['id']);
    unset($_SESSION['login_name']);
    header('Location: index');
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= $site_title . $divider . $page_title; // title and divider from config, title from page ?></title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <span>Logged in as: <?= $_SESSION['login_name'] // use session varible to show username ?></span>
    <form method="post">
        <input type="submit" name="logout" value="Log out">
    </form>
    <div id="wrapper">
        <nav>
            <ul>
                <li><a href="admin">Home</a></li>
                <li><a href="courses">Courses</a></li>
                <li><a href="jobs">Jobs</a></li>
                <li><a href="websites">Websites</a></li>
            </ul>
        </nav>