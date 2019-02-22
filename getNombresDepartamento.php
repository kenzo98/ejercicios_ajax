<?php 
	header("access-control-allow-origin: *");

	require 'connection.php';

	$query = "SELECT nombre from departamento";

	$result = mysqli_query($con,$query);
	$numReg = mysqli_num_rows($result);
	$strHTML = "";

	for ($i=0; $i<$numReg; $i++) {
		$row = mysqli_fetch_array($result);
		$strHTML .='<option>'.$row["nombre"].'</option>';
	}
	echo $strHTML;
?>