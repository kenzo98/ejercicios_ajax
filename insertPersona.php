<?php
	header("access-control-allow-origin: *");

	$nombre=$_POST["nombre"];
	$email=$_POST["email"];
	$telefono=$_POST["telefono"];
	$puesto=$_POST["puesto"];

	require 'connection.php';
	$query = "INSERT INTO personas VALUES (null, '$nombre', '$email', $telefono, '$puesto')";
	mysqli_query($con,$query);
?>