<?php
    session_start();
    require "db.php";
    $data = $_POST;
    $errors = array();

    if($data){
            $user = R::findOne('users', 'u_key = ?', array($data['u_key']));
            if ($user) {
                if($data['delete'] == 'true'){
                    $user->u_key = NULL;
                    R::store($user);
                    echo json_encode($respond['Success'] = 'Deleted');
                }else{
                    $userData['name'] = $user->fullname; 
                    $userData['email'] = $user->email;   
                    $userData['username'] = $user->username; 
                    $userData['u_key'] = $user->u_key;
                    echo json_encode($userData);
                }
            }else {
                $errors[] = "User is not found";
            }
        if (!empty($errors)) {
            echo json_encode($errors);
        }
    }

    
?>