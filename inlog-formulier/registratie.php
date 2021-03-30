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

$s = " SELECT * FROM 'usertable' WHERE 'naam' = '$name'";

$result = mysqli_query($con, $s);

$num = mysqli_num_rows($result);

if($num == 1){
    echo"username already taken";
}
else{
    $reg = "insert into usertable(naam, achternaam, gebruikersnaam, email, wachtwoord, telefoonnummer, radio) values ('$name' , '$lastname', '$user', '$email', '$pass', '$phonenumber', '$radio')";
    mysqli_query($con, $reg);
    header('location:login.html');}

?>