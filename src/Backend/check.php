<?php
require "db.php";
$data = $_POST;
$errors = array();


if (trim($data['fullname']) == '') {

  $errors[] = "Enter your name!";

}
if (trim($data['email']) == '') {

  $errors[] = "Enter Email!";
}
if (trim($data['username']) == '') {

  $errors[] = "Enter username!";
}
if ($data['password'] == '') {

  $errors[] = "Enter password!";
}

if ($data['password_2'] == '') {

  $errors[] = "Repeat password!";
}

if ($data['password_2'] != $data['password']) {

  $errors[] = "Passwords don't mathc...";
}

// if(R::count('users', "username = ?", array($data['username'])) > 0) {

// 	$errors[] = "This username is already used in the system. Please try another.";
// }

// if(R::count('users', "email = ?", array($data['email'])) > 0) {

// 	$errors[] = "This email address is already used in the system. Please try another.";
// }

if (!empty($errors)) {
  echo json_encode($errors);
} else {
  $user = R::dispense('users');
  $user->username = $data['username'];
  $user->email = $data['email'];
  $user->fullname = $data['fullname'];
  $user->password =  password_hash($data['password'], PASSWORD_DEFAULT);
  if (!password_verify($data['password'], $user->password)) {
    $user->password = 'error';
  }

  R::store($user);
  echo 'Success';
  //header("Location: signin.html");
}
?>
