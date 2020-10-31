<?php 
class User {
    private $db;
    private $login_name;
    private $login_pass;
    private $pass_hash;

    public function __construct($pdo) {
        $this->db = $pdo; // set database connection property
    }

    public function set_login_name($login_name) {
        $this->login_name = $login_name; // set login name property
    }

    public function set_login_pass($login_pass) {
        $this->login_pass = $login_pass; // set password property
    }

    public function set_pass_hash($login_pass) {
        if (strlen($login_pass) < 8) { // control password length
            return false;
        } else {
            $this->pass_hash = password_hash($login_pass, PASSWORD_DEFAULT); // hash and set hashed password
            return true;
        }
    }

    public function name_taken($login_name) { // check if login name is taken
        $stmt = $this->db->prepare('SELECT * FROM user WHERE login_name = :login_name');
        $stmt->execute([ 'login_name' => $login_name]);

        return $stmt->fetchColumn() > 0; // return true if name is taken, false if not
    }

    public function register_user() {
        if (!$this->name_taken($this->login_name)) { // if name is not taken, register user
            $stmt = $this->db->prepare('INSERT INTO user (login_name, pass_hash) VALUES (:login_name, :pass_hash)');
            return $stmt->execute([ 'login_name' => $this->login_name, 'pass_hash' => $this->pass_hash ]);
        } else { // if name is taken:
            return false;
        }
    }

    public function log_in() {
        $stmt = $this->db->prepare('SELECT id, pass_hash FROM user WHERE login_name = :login_name');

        $stmt->execute([ 'login_name' => $this->login_name ]); // use login name property to retrieve id and password hash

        $user = $stmt->fetch();

        $id = $user['id'];
        $pass_hash = $user['pass_hash'];

        if (password_verify($this->login_pass, $pass_hash)) { // if password verified, set session variables (log in)
            $_SESSION['id'] = $id;
            $_SESSION['login_name'] = strip_tags($this->login_name);
            return true;
        } else {
            return false;
        }
    }
}
?>