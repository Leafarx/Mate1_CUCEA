// JavaScript Document

var JSON_temario;

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
		//actualizar_materias();	
		//actualizar_unidades();
		actualizar_temas();	
	});
}

function actualizar_materias(){
	document.getElementById("titular").innerHTML = "MATERIAS";
	document.getElementById("atras_ppal").style.display = 'none';
	Object.keys(JSON_temario.MATERIAS).forEach(function(key) {
			add_menu_materias(JSON_temario.MATERIAS[key].name,  JSON_temario.MATERIAS[key].n_temas, JSON_temario.MATERIAS[key].n_unidades);
		});
	}

function actualizar_unidades(){
	document.getElementById("titular").innerHTML = "UNIDADES";
	document.getElementById("atras_ppal").style.display = 'inherit';
	Object.keys(JSON_temario.MATERIAS[0].UNIDAD).forEach(function(key) {
			add_menu_unidades(JSON_temario.MATERIAS[0].UNIDAD[key].id, JSON_temario.MATERIAS[0].UNIDAD[key].name, JSON_temario.MATERIAS[0].UNIDAD[key].n_temas);
		});
	}

function actualizar_temas(){
	document.getElementById("titular").innerHTML = "TEMAS";
	document.getElementById("atras_ppal").style.display = 'inherit';
	Object.keys(JSON_temario.MATERIAS[0].UNIDAD[0].TEMA).forEach(function(key) {
			add_menu_tema(JSON_temario.MATERIAS[0].UNIDAD[0].TEMA[key].id, JSON_temario.MATERIAS[0].UNIDAD[0].TEMA[key].name, JSON_temario.MATERIAS[0].UNIDAD[0].TEMA[key].sub_name);
		});
	}

function add_menu_materias(name, n_temas, n_unidades) {
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
	a.appendChild(li);
	ul.appendChild(a);

	$("a li").click(function(){
        document.getElementById("texto").innerHTML = $(this).text();
    });
}

function add_menu_unidades(id, name, n_temas) {
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
	strong.appendChild(document.createTextNode(id + "   "));
	h4.appendChild(strong);
	h4.appendChild(document.createTextNode("  "+name));
	h4.appendChild(img);
	li.appendChild(h4);
	li.appendChild(smal);
	// if tiene contenido
	a.appendChild(li);
	ul.appendChild(a);
	//else
	//	ul.appendChild(li);
}

function add_menu_tema(id, name, sub_name) {
	var ul = document.getElementById("menu_tema");
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
	strong.appendChild(document.createTextNode(id));
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
