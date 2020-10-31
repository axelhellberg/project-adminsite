<?php 
// error_reporting(-1);
// ini_set("display_errors", 1);

spl_autoload_register(function ($class) { // autoload class files
    include 'classes/' . $class . '.class.php';
});

if (session_status() == PHP_SESSION_NONE) { // start session
    session_start();
}

// variables for database connection
define("DBHOST", "localhost");
define("DBUSER", "user");
define("DBPASS", "password");
define("DBNAME", "dbtest");

// database connection variable
$pdo = new PDO (
    'mysql:host=' . DBHOST . ';dbname=' . DBNAME . ';charset=utf8mb4', DBUSER, DBPASS
);
// set pdo attributes
$pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);

// site title variables
$site_title = 'Admin panel';
$divider = ' | ';
?>