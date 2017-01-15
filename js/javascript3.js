// JavaScript Document

var JSON_temario;
var niv_anterior = -1;
var niv_actual = -1;
var materia_ant;

function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("web/json");
    xobj.open('GET', 'json/proyecto.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function leer_jason() {
	loadJSON(function(response) {
 		JSON_temario = JSON.parse(response);
		actualizar_materias();	
		
		$('ul#menu_materias a li').on('click', function() {
			document.getElementById("menu_materias").style.display = 'none';
			niv_anterior = 0;
			if( $(this).attr('data-n_unidades') == 1 )
				actualizar_temas($(this).attr('data-id') - 1, 0, $(this).attr('data-nombre'), null);
			else
				actualizar_unidades($(this).attr('data-id') - 1, $(this).attr('data-nombre'));	
		});
		

		$('a div.imagen').on('click', function() {
			if(document.getElementById("atras_ppal").style.display != 'none'){
				if(niv_actual == 2)
					document.getElementById("menu_temas").style.display = 'none';
				else if(niv_actual == 1)
					document.getElementById("menu_unidades").style.display = 'none';
				if(niv_anterior == 0){
					document.getElementById("menu_materias").style.display = 'inherit';
					document.getElementById("atras_ppal").style.display = 'none';
					niv_actual = 0;
					document.getElementById("titulo").innerHTML = "INICIO";
					document.getElementById("titular").innerHTML = "MATERIAS";
				}
				else if(niv_anterior == 1){
					document.getElementById("menu_unidades").style.display = 'inherit';
					niv_actual = 1;
					niv_anterior = 0;
					document.getElementById("titulo").innerHTML = materia_ant;
					document.getElementById("titular").innerHTML = "UNIDADES";
				}
			}
		});
			
			
	});
}

function actualizar_materias(){
	niv_actual = 0;
	document.getElementById("menu_materias").style.display = 'inherit';
	document.getElementById("titulo").innerHTML = "INICIO";
	document.getElementById("titular").innerHTML = "MATERIAS";
	document.getElementById("atras_ppal").style.display = 'none';
	Object.keys(JSON_temario.MATERIAS).forEach(function(key) {
			add_menu_materias(JSON_temario.MATERIAS[key].id, JSON_temario.MATERIAS[key].name,  JSON_temario.MATERIAS[key].n_temas, JSON_temario.MATERIAS[key].n_unidades);
		});
		
	}

function actualizar_unidades(indice_m, materia){
	niv_actual = 1;
	materia_ant = materia;
	document.getElementById("menu_unidades").style.display = 'inherit';
	document.getElementById("titulo").innerHTML = materia;
	document.getElementById("titular").innerHTML = "UNIDADES";
	document.getElementById("atras_ppal").style.display = 'inherit';
	$("ul#menu_unidades").empty();
	Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD).forEach(function(key) {
			add_menu_unidades(JSON_temario.MATERIAS[indice_m].UNIDAD[key].id, JSON_temario.MATERIAS[indice_m].UNIDAD[key].u_id, JSON_temario.MATERIAS[indice_m].UNIDAD[key].name, JSON_temario.MATERIAS[indice_m].UNIDAD[key].n_temas, materia, indice_m);
		});
		
		
		$('ul#menu_unidades a li').on('click', function() {
			niv_anterior = 1;
			document.getElementById("menu_unidades").style.display = 'none';
			actualizar_temas($(this).attr('data-indiceMateria'), $(this).attr('data-indiceUnidad') - 1, $(this).attr('data-nombreMateria'), $(this).attr('data-nombreUnidad'));	
		});
	}

function actualizar_temas(indice_m, indice_u, materia, unidad){
	niv_actual = 2;
	document.getElementById("menu_temas").style.display = 'inherit';
	if(unidad != null){
		document.getElementById("titulo").innerHTML = materia;
		document.getElementById("subtitulo").innerHTML = unidad;
	}
	else{
		document.getElementById("titulo").innerHTML = materia;
		
	document.getElementById("titular").innerHTML = "TEMAS";
	document.getElementById("atras_ppal").style.display = 'inherit';
	$("ul#menu_temas").empty();
	Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA).forEach(function(key) {
			add_menu_tema(JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].t_id, JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].name, JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].sub_name);
		});
	}

function add_menu_materias(id, name, n_temas, n_unidades) {
	var ul = document.getElementById("menu_materias");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	var a = document.createElement('a');
	var smal = document.createElement('small');
	var img = document.createElement('img');
	img.setAttribute('src', 'images/flecha_derecha.svg');
	img.setAttribute('height', '24');
	a.setAttribute('href', '#');
	if(n_unidades == "1")
		smal.appendChild(document.createTextNode("\xa0 \xa0 \xa0" + n_unidades + " UNIDAD,  " + n_temas + " TEMAS"));
	else
		smal.appendChild(document.createTextNode("\xa0 \xa0 \xa0" + n_unidades + " UNIDADES,  " + n_temas + " TEMAS"));
	h4.appendChild(document.createTextNode(name));
	h4.appendChild(img);
	li.appendChild(h4);
	li.appendChild(smal);
	li.setAttribute('data-nombre', name);
	li.setAttribute('data-id', id);
	li.setAttribute('data-n_unidades', n_unidades);
	a.appendChild(li);
	ul.appendChild(a);
}

function add_menu_unidades(id, u_id, name, n_temas, materia, ind_materia) {
	var ul = document.getElementById("menu_unidades");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	var strong = document.createElement('strong');
	var a = document.createElement('a');
	var smal = document.createElement('small');
	var img = document.createElement('img');
	img.setAttribute('src', 'images/flecha_derecha.svg');
	img.setAttribute('height', '24');
	a.setAttribute('href', '#');
	smal.appendChild(document.createTextNode("\xa0 \xa0 \xa0" + n_temas + " TEMAS"));
	strong.appendChild(document.createTextNode(u_id + "   "));
	h4.appendChild(strong);
	h4.appendChild(document.createTextNode("  "+name));
	h4.appendChild(img);
	li.appendChild(h4);
	li.appendChild(smal);
	li.setAttribute('data-nombreMateria', materia);
	li.setAttribute('data-nombreUnidad', name);
	li.setAttribute('data-indiceUnidad', u_id);
	li.setAttribute('data-indiceMateria', ind_materia);
	// if tiene contenido
	a.appendChild(li);
	ul.appendChild(a);
	//else
	//	ul.appendChild(li);
}

function add_menu_tema(t_id, name, sub_name) {
	var ul = document.getElementById("menu_temas");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	var strong = document.createElement('strong');
	var h6 = document.createElement('h4');
	var smal = document.createElement('small');
	var a = document.createElement('a');
	var img = document.createElement('img');
	img.setAttribute('src', 'images/flecha_derecha.svg');
	img.setAttribute('height', '24');
	a.setAttribute('href', '#');
	strong.appendChild(document.createTextNode(t_id));
	h4.appendChild(strong);
	h4.appendChild(document.createTextNode("  "+name));	
	h4.appendChild(img);
	if(sub_name != null)
		smal.appendChild(document.createTextNode("\xa0 \xa0 \xa0" + sub_name));
	li.appendChild(h4);
//	li.appendChild(img);
	li.appendChild(smal);
	// if tiene contenido
	a.appendChild(li);
	ul.appendChild(a);
	//else
	//	ul.appendChild(li);
}


function hola2(opc){
	document.getElementById("texto").innerHTML = "Saz "+opc + " x";
}
