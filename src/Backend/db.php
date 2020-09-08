<?php
require "libs/rb.php";

// localhost - host по умолчанию
// dbname - имя базы данных
// root - логин
// после логина идет пароль

R::setup( 'mysql:host=localhost;dbname=bringxdb',
        'root', '', false);

// Если после пароля поставить true, тогда функция создания таблиц на лету будет включена
// Если после пароля поставить false, тогда функция создания таблиц на лету будет отключена

// Проверка подключения к БД
if(!R::testConnection()) die('No DB connection!');


?>