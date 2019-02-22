<?php
	header('Content-Type: json');

    $data = array();

	require 'connection.php';
    $query = "SELECT * FROM personas";
	
	$result= mysqli_query($con,$query);
	$numReg = mysqli_num_rows($result);
?>