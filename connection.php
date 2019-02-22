<?php 
header("access-control-allow-origin: *");
$departamento = $_GET["puesto"];

$con = mysqli_connect("localhost","root","root") or die(mysqli_error());
mysqli_select_db($con,"empresa") or die(mysqli_error());

?>