<?php
	header("access-control-allow-origin: *");

	require 'connection.php';

	$strHTML = "<table><tr><th>Nombre</th><th>Email</th><th>Telefono</th><th>Puesto</th></tr>";
	require 'getRawPersonas.php';
	for ($i=0; $i<$numReg; $i++) {
		$row = mysqli_fetch_array($result);
		$strHTML .="<tr><td>".$row["nombre"]."</td><td>".$row["email"]."</td><td>".$row["telefono"]."</td><td>".$row["puesto"]."</td></tr>";
	}
	$strHTML .="</table>";

	echo $strHTML;
?>