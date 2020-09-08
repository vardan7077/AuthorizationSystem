<?php
session_start();
require "db.php";
if($_COOKIE["u_key"]){
    $user = R::findOne('users', 'u_key = ?', array($_COOKIE["u_key"]));
    if($user){
        echo "Hi ";
        echo $user->fullname;
        
        echo '<a href="log_out.php">Log out</a>';
    }
}
?>