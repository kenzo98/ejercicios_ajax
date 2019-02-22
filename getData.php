<?php
	header('Content-Type: json');

    $data = array();

	require 'connection.php';

	require 'getRawPersonas.php';
    if ($query->num_rows > 0) {
        $userData = $query->fetch_assoc();
        $data['status'] = 'ok';
        $data['result'] = $userData;
    } else {
        $data['status'] = 'err';
        $data['result'] = '';
    }

    $json_string = json_decode($data);
    $file = 'personas.json';
    file_put_contents($file, $json_string); 
?>