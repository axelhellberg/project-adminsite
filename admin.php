<?php
$page_title = 'Welcome';
include('includes/header.php');
if (isset($_POST['register'])) { // if register form submitted
    if ($_POST['login-name'] AND $_POST['login-pass'] AND ($_POST['verify-pass'] == $_POST['login-pass'])) {  // if all fields entered and passwords match
        $user = new User($pdo); // new user instance with database connection
        if ($user->set_pass_hash($_POST['login-pass'])) { // if password hashed and length not < 8
            $user->set_login_name($_POST['login-name']); // set login name
            if ($user->register_user()) { // register user
                $message = '<p>Registration successful.</p>';
            } else {
                $message = '<p>Username unavailable.</p>';
            }
        } else {
            $message = '<p>Password must contain 8 or more characters.</p>';
        }
    } else {
        $message = '<p>Enter all fields or check password.</p>';
    }     
}
?>
        <h3>Register</h3>
        <form method="post">
            <input type="text" name="login-name" placeholder="Username">
            <input type="password" name="login-pass" placeholder="Password">
            <input type="password" name="verify-pass" placeholder="Verify password">
            <input type="submit" name="register" value="Register">
        </form>
        <?php if (isset($message)) { echo $message; } ?>
    </div>
</body>
</html>