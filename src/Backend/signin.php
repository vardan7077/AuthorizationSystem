<?php
    session_start();
    require "db.php";
    $data = $_POST;
    $errors = array();

    if (trim($data['username']) == '') {
        $errors[] = "Enter username!";
    }
    if ($data['password'] == '') {
        $errors[] = "Enter password!";
    }

    $user = R::findOne('users', 'username = ?', array($data['username']));
    if ($user) {
        if (password_verify($data['password'], $user->password)) {
            $session_id = session_id();
            setcookie("u_key", session_id(), time() + (60 * 60 * 24 * 30 * 2));
            $user->u_key = session_id();
            R::store($user);
            $userData['name'] = $user->fullname; 
            $userData['email'] = $user->email;   
            $userData['username'] = $user->username; 
            $userData['u_key'] = $user->u_key;
            echo json_encode($userData);
        } else{
            $errors[] = "Wrong password!";
        }
    } else {
        $errors[] = "User was not found";
    }

    if (!empty($errors)) {
        echo json_encode($errors);
    }

?>
