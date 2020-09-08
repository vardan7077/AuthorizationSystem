<?php
    session_start();
    require "db.php";
    if($_COOKIE["u_key"]){
        $user = R::findOne('users', 'u_key = ?', array($_COOKIE["u_key"]));
        if($user){
            $user->u_key = NULL;
            R::store($user);
            setcookie("u_key", session_id(), time() - 1);
            header("Location: signin.html");
        }
    }

?>