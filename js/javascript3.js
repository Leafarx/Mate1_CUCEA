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
 		Object.keys(actual_JSON.MATERIAS).forEach(function(key) {		//actual_JSON.MATERIAS[0].UNIDAD
			add_menu_materias(actual_JSON.MATERIAS[key].name);
			//document.getElementById("texto").innerHTML = document.getElementById("texto").innerHTML + " " + actual_JSON.MATERIAS[key].name;
		});
	});
}

function add_menu_materias(name) {
	var ul = document.getElementById("menu_materias");
	var li = document.createElement('li');
	var h4 = document.createElement('h4');
	h4.appendChild(document.createTextNode(name));
	li.appendChild(h4);
	ul.appendChild(li);
}

