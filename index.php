<?php
include('includes/config.php');
if (isset($_POST['log-in'])) { // if log-in form sumbitted
    $user = new User($pdo); // new user instance with database connection

    if ($_POST['login-name'] AND $_POST['login-pass']) { // if all fields entered
        $user->set_login_name($_POST['login-name']); // set login name
        $user->set_login_pass($_POST['login-pass']); // set password

        if ($user->log_in()) { // if login successful, redirect to admin page
            header('Location: admin');
        } else {
            $message = 'Incorrect username or password.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin panel | Log in</title>
</head>
<body>
    <h3>Log in</h3>
    <form method="post">
        <input type="text" name="login-name" placeholder="Username">
        <input type="password" name="login-pass" placeholder="Password">
        <input type="submit" name="log-in" value="Log in">
    </form>
    <?php if (isset($message)) { echo $message; } // display message ?>
</body>
</html>