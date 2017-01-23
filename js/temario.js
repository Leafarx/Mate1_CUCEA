// JavaScript Document

var JSON_temario;

function leer_jason() {
	loadJSON(function(response) {
 		JSON_temario = JSON.parse(response);
		menu_materias();
		//menu_unidades(0);
		//menu_temas(0,0);
	});
}

function menu_materias(){
	Object.keys(JSON_temario.MATERIAS).forEach(function(key) {
		var obj = JSON_temario.MATERIAS[key];
		if(key>0){
			var elemento = document.getElementById("menu_materias").getElementsByClassName("divider-color")[0];
			var elemento_n = elemento.cloneNode(true);
			document.getElementById("menu_materias").appendChild(elemento_n);
		}
		document.getElementById("menu_materias").getElementsByTagName("a")[key].setAttribute('data_m',key);
		document.getElementById("menu_materias").getElementsByClassName("forma")[key].style.backgroundColor = obj.color;
		document.getElementById("menu_materias").getElementsByClassName("div2")[key].innerHTML = obj.name;
		if(obj.n_unidades == "1")
			document.getElementById("menu_materias").getElementsByClassName("div4")[key].innerHTML = "1 unidad,  " + obj.n_temas + " temas";
		else
			document.getElementById("menu_materias").getElementsByClassName("div4")[key].innerHTML = obj.n_unidades + " unidades,  " + obj.n_temas + " temas";
	});
	
	clickeando_menu_materias();
}


function menu_unidades(indice_m){
		var elemento = document.getElementById("menu_unidades").getElementsByClassName("divider-color")[0];
		$("ul#menu_unidades").empty();
		var elemento_n = elemento.cloneNode(true);
		document.getElementById("menu_unidades").appendChild(elemento_n);

		Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD).forEach(function(key) {
			var obj = JSON_temario.MATERIAS[indice_m].UNIDAD[key];
			if(key>0){
				elemento = document.getElementById("menu_unidades").getElementsByClassName("divider-color")[0];
				elemento_n = elemento.cloneNode(true);
				document.getElementById("menu_unidades").appendChild(elemento_n);
			}
			document.getElementById("menu_unidades").getElementsByTagName("a")[key].setAttribute('data_m',indice_m);
			document.getElementById("menu_unidades").getElementsByTagName("a")[key].setAttribute('data_u',key);
			document.getElementById("menu_unidades").getElementsByClassName("div1")[key].innerHTML = obj.u_id;
			document.getElementById("menu_unidades").getElementsByClassName("div2")[key].innerHTML = obj.name;	
			document.getElementById("menu_unidades").getElementsByClassName("div4")[key].innerHTML = obj.n_temas + " temas";
		});
		
		clickeando_menu_unidades();
}

/*  
//MOVERME A LA POSICION UNIDADES -100
document.getElementById("titulo").innerHTML = JSON_temario.MATERIAS[indice_m].name;
document.getElementById("boton_atras").style.display = 'inherit';	

*/


function menu_temas(indice_m, indice_u){
		var elemento = document.getElementById("menu_temas").getElementsByClassName("divider-color")[0];
		$("ul#menu_temas").empty();
		var elemento_n = elemento.cloneNode(true);
		document.getElementById("menu_temas").appendChild(elemento_n);

		Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA).forEach(function(key) {
			var obj = JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key];
			if(key>0){
				elemento = document.getElementById("menu_temas").getElementsByClassName("divider-color")[0];
				elemento_n = elemento.cloneNode(true);
				document.getElementById("menu_temas").appendChild(elemento_n);
			}
			
			document.getElementById("menu_temas").getElementsByClassName("div1")[key].innerHTML = obj.t_id;
			document.getElementById("menu_temas").getElementsByClassName("div2")[key].innerHTML = obj.name;	
			document.getElementById("menu_temas").getElementsByClassName("div4")[key].innerHTML = obj.sub_name;
		});
}



function loadJSON(callback) {   
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("web/json");
    xobj.open('GET', 'json/temario.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
    	if (xobj.readyState == 4 && xobj.status == "200")
        	callback(xobj.responseText);
    };
    xobj.send(null);  
}

function isHexaColor(sNum){
  return (typeof sNum === "string") && sNum.length === 7 ;
}

function isUnidad_1(indice_m){
	return ( JSON_temario.MATERIAS[indice_m].n_unidades === "1" );	
}


/*function clickeando(){
	$('#menu_principal a li').bind('touchstart',function(e){
    $(this).addClass('hovered');
	e.stopPropagation();  e.preventDefault();
     }).bind('touchend',function(){
     $t=setTimeout(function(){
		 $('#menu_principal a li').removeClass('hovered');
		 if( $('#menu_principal a li').attr('data-type-hijo') == "u")
			menu_unidades($('#menu_principal a li').attr('data-materia'))
		 else if ( $(this).attr('data-type-hijo') == "t"){
			if( isUnidad_1( $('#menu_principal a li').attr('data-materia') ) )
				menu_temas($('#menu_principal a li').attr('data-materia'), 0 );
			else
				menu_temas($('#menu_principal a li').attr('data-materia'), $('#menu_principal a li').attr('data-hijo') );
		}
	 },100);
});
}*/

function clickeando_menu_materias(){
	$('ul#menu_materias li a').on('click', function() {
		menu_unidades($(this).attr('data_m'));
		document.getElementById("contenedor").style.left = "-100%";
	});
}

function clickeando_menu_unidades(){
	$('ul#menu_unidades li a').on('click', function() {
		menu_temas($(this).attr('data_m'), $(this).attr('data_u'));
		document.getElementById("contenedor").style.left = "-200%";
	});
}


$('#boton_atras').bind('touchstart',function(e){
    $(this).addClass('hovered');
	e.stopPropagation();  e.preventDefault();
     }).bind('touchend',function(){
     $t=setTimeout(function(){
		$('.transform').toggleClass('transform-active'); 
    	$('#boton_atras').removeClass('hovered');
		if(document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left == "-300%")
			document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left = "-200%";
		else if(document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left == "-200%")
			document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left = "-100%";
		else if(document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left == "-100%")
			document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.left = "0%";
		estado(1);
	 },300);
});

function estado(edo){
	alert($('#contenedor').scrollTop());// = "relative";
//	document.querySelectorAll(".container-fluid.body-content #contenedor")[0].style.top = "0px";
//	if(edo == 0)
	//	document
	
	}
