<?php
    $command = $_POST['command'];
    var_dump($command);
    if($command = 'SignUp'){
        header("Location: test.php");
        
    }
    else{
        echo $command;
    }
?>