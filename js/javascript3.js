// JavaScript Document

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
 		var actual_JSON = JSON.parse(response);
 		Object.keys(actual_JSON.MATERIAS).forEach(function(key) {
			add_menu_materias(actual_JSON.MATERIAS[key].name);
		});
		
		Object.keys(actual_JSON.MATERIAS[0].UNIDAD).forEach(function(key) {
			add_menu_unidades(actual_JSON.MATERIAS[0].UNIDAD[key].id, actual_JSON.MATERIAS[0].UNIDAD[key].name);
		});
		
		Object.keys(actual_JSON.MATERIAS[0].UNIDAD[0].TEMA).forEach(function(key) {
			add_menu_tema(actual_JSON.MATERIAS[0].UNIDAD[0].TEMA[key].id, actual_JSON.MATERIAS[0].UNIDAD[0].TEMA[key].name, actual_JSON.MATERIAS[0].UNIDAD[0].TEMA[key].sub_name);
		});
		
	});
}

function add_menu_materias(name) {
	var ul = document.getElementById("menu_materias");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	h4.appendChild(document.createTextNode(name));
	li.appendChild(h4);
	a.appendChild(li);
	ul.appendChild(a);
	
	
	$("a li").click(function(){
        document.getElementById("texto").innerHTML = $(this).text();
    });
}

function add_menu_unidades(id, name) {
	var ul = document.getElementById("menu_unidades");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	var strong = document.createElement('strong');
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	strong.appendChild(document.createTextNode(id));
	h4.appendChild(strong);
	h4.appendChild(document.createTextNode("  "+name));
	li.appendChild(h4);
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
	var h6 = document.createElement('h6');
	var em = document.createElement('em');
	var a = document.createElement('a');
	a.setAttribute('href', '#');
	strong.appendChild(document.createTextNode(id));
	h4.appendChild(strong);
	h4.appendChild(document.createTextNode("  "+name));
	if(sub_name != null)
		em.appendChild(document.createTextNode(sub_name));
	h6.appendChild(em);
	li.appendChild(h4);
	li.appendChild(h6);
	// if tiene contenido
	a.appendChild(li);
	ul.appendChild(a);
	//else
	//	ul.appendChild(li);
}

function hola2(opc){
	document.getElementById("texto").innerHTML = "Saz "+opc + " x";
}