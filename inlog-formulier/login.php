<?php

session_start();

$con = mysqli_connect('localhost', 'root', 'root');

mysqli_select_db($con, 'FRO7_users');

$name = $_POST['voornaam'];
$lastname = $_POST['achternaam'];
$user = $_POST['gebruikersnaam'];
$email = $_POST['email'];
$pass = $_POST['wachtwoord'];
$phonenumber = $_POST['telefoonnummer'];
$radio = $_POST['radio'];

$s = " SELECT * FROM usertable WHERE gebruikersnaam = '$user' && wachtwoord = '$pass' ";

$result = mysqli_query($con, $s);

$num = mysqli_num_rows($result);

if($num == 1){
    header('location:home.php');
}
else{
    echo $con->error;
}

?>