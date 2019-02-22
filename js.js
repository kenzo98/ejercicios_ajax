function loadForm() {

	document.getElementById("divForm").innerHTML = "<br>Departamento : <select id='selectdepartamento' onclick='populateSelectPuesto(this.value)'></select><br>Puesto: <select id='selectpuesto'></select><br><br>Nombre<br><input type='text' name='nombre' id='nombre'><br><br>Email<br><input type='email' name='email' id='email'><br><br>Telefono<br><input type='text' name='telefono' id='telefono'><br><br><button onclick='registrarPersona()'>Guardar</button>";
	populateSelectDepartamento(true);
}

function populateSelectDepartamento(cosa) {

	var rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function () {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("selectdepartamento").innerHTML = rxmlhttp.responseText;
			if (cosa == true){
				$departamento = document.getElementById("selectdepartamento").value;
				populateSelectPuesto($departamento);
			}
		}
	}

	rxmlhttp.open("GET", "http://localhost:80/practica/getNombresDepartamento.php", true);
	rxmlhttp.send();
}

function populateSelectPuesto($departamento) {

	var rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function () {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("selectpuesto").innerHTML = rxmlhttp.responseText;
		}
	}

	rxmlhttp.open("GET", "http://localhost:80/practica/getNombresPuesto.php?puesto=" + $departamento, true);
	rxmlhttp.send();
}

function registrarPersona() {
	
	var rxmlhttp = new XMLHttpRequest();

	var selPuesto = document.getElementById("selectpuesto").value;
	var inpNombre = document.getElementById("nombre").value;
	var inpMail = document.getElementById("email").value;
	var inpTelf = document.getElementById("telefono").value;
	
	rxmlhttp.onreadystatechange = function() {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("divForm").innerHTML = 'Guardado con éxito';
		}
	}

	rxmlhttp.open("POST", "http://localhost:80/practica/insertPersona.php",true);
	rxmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	rxmlhttp.send("puesto=" + selPuesto + "&nombre=" + inpNombre + "&email=" + inpMail + "&telefono=" + inpTelf);
} 

function showPersonas() {
	
	var rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function () {
		if(rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("divForm").innerHTML = "<select id='selectdepartamento' onclick='showPersonasFromDepartamento()'><br>";
			document.getElementById("tabla").innerHTML = rxmlhttp.responseText;
			populateSelectDepartamento(false);
		}
	}

	rxmlhttp.open("GET","http://localhost:80/practica/getPersonas.php", true);
	rxmlhttp.send();
}

function showPersonasFromDepartamento() {
	$departamento = document.getElementById("selectdepartamento").value;
	var rxmlhttp = new XMLHttpRequest();

	rxmlhttp.onreadystatechange = function () {
		if (rxmlhttp.readyState == 4 && rxmlhttp.status == 200) {
			document.getElementById("tabla").innerHTML = rxmlhttp.responseText;
			crearJson();
		}
	}

	rxmlhttp.open("GET", "http://localhost:80/practica/getPersonasFromDepartamento.php?seleccion=" + $departamento, true);
	rxmlhttp.send();
}

function crearJson (){
	console.log("prueba");
	$documento = function(){
		$('#tabla').on('click', function(){
			var nombre = $('#nombre').val();
			$.ajax({
				type: 'POST',
				url: 'getData.php',
				dataType: 'json',
				data: {nombre:nombre},
				succes:function(data){
					if(data.status == 'ok'){
						$('#nombre').text(data.result.nombre);
						$('#email').text(data.result.email);
						$('#telefono').text(data.result.telefono);
						$('#puesto').text(data.result.puesto);
					} else {
						alert("Usuario no encontrado.....");
					}
				}
			})
		})
	}
}