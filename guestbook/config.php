<?php
     $host = "localhost";
     $user = "root";
     $port = "3306";
     $password = "";
     $database = "maximasterbd";
     $charset = "utf8"; 
 
     $dsn = "mysql:host=$host;port=$port;dbname=$database;charset=$charset";
     $pdo = new PDO($dsn, $user, $password);
?>