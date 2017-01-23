// JavaScript Document

var JSON_temario;
var materia_actual;

function leer_jason() {
	loadJSON(function(response) {
 		JSON_temario = JSON.parse(response);
		//estado_0();//menu_materias()
		slide();
	});
}

function slide(){

	
	}



function estado_0(){
	/*document.getElementById("titulo").innerHTML = "INICIO";
	document.getElementById("boton_atras").style.display = 'none';
	document.getElementById("menu_principal").style.display = 'inherit';*/
}




function menu_materias(){
	document.getElementById("titular").innerHTML = "MATERIAS";
	$("ul#menu_principal").empty();
	Object.keys(JSON_temario.MATERIAS).forEach(function(key) {
crear_menu(JSON_temario.MATERIAS[key].color, JSON_temario.MATERIAS[key].name, JSON_temario.MATERIAS[key].n_unidades, JSON_temario.MATERIAS[key].n_temas, key, key);
		});
	clickeando();
	}

function menu_unidades(indice_m){
	if( isUnidad_1(indice_m) )
		menu_temas(indice_m, 0);
	else{
		document.getElementById("titulo").innerHTML = JSON_temario.MATERIAS[indice_m].name;
		document.getElementById("boton_atras").style.display = 'inherit';	
		document.getElementById("boton_atras").setAttribute('data-type-padre', "m");
		document.getElementById("titular").innerHTML = "UNIDADES";
		$("ul#menu_principal").empty();
		Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD).forEach(function(key) {
				crear_menu(JSON_temario.MATERIAS[indice_m].UNIDAD[key].u_id, JSON_temario.MATERIAS[indice_m].UNIDAD[key].name, null, JSON_temario.MATERIAS[indice_m].UNIDAD[key].n_temas, indice_m, key);
			});
	}
	clickeando();
}

function menu_temas(indice_m, indice_u){
	document.getElementById("titulo").innerHTML = JSON_temario.MATERIAS[indice_m].name;
	document.getElementById("boton_atras").style.display = 'inherit';
	if( isUnidad_1(indice_m) ){
		document.getElementById("boton_atras").setAttribute('data-type-padre', "m");
	}
	else{
		document.getElementById("boton_atras").setAttribute('data-type-padre', "u");
		document.getElementById("boton_atras").setAttribute('data-padre', indice_m);	
	}
	document.getElementById("titular").innerHTML = "TEMAS";
	$("ul#menu_principal").empty();
	Object.keys(JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA).forEach(function(key) {
			crear_menu(JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].t_id, JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].name, JSON_temario.MATERIAS[indice_m].UNIDAD[indice_u].TEMA[key].sub_name, null, indice_m, key);
		});
}

function crear_menu(d1, d2, d4a, d4b, indice_m, key) {
	var ul = document.getElementById("menu_principal");
	var a = document.createElement('a');
	var li = document.createElement('li');
	var div1 = document.createElement('div');
	var div2 = document.createElement('div');
	var div3 = document.createElement('div');
	var div4 = document.createElement('div');
	var img = document.createElement('img');
	img.setAttribute('src', 'images/flecha_derecha.svg');
	a.setAttribute('href', '#');
	if(isRelleno(d1))
		div1.className += d1+" ";
	else
		div1.appendChild(document.createTextNode(d1));
	div2.appendChild(document.createTextNode(d2));
	div3.appendChild(img);
	if(d4b == null){
		if(d4a != null)
			div4.appendChild(document.createTextNode(d4a));
	}
	else if(d4a == null){
		div4.appendChild(document.createTextNode(d4b + " temas"));
		li.setAttribute('data-type-hijo', 't');
	}
	else if(d4a == "1"){
		div4.appendChild(document.createTextNode("1 unidad,  " + d4b + " temas"));
		li.setAttribute('data-type-hijo', 't');
	}
	else {
		div4.appendChild(document.createTextNode(d4a + " unidades,  " + d4b + " temas"));
		li.setAttribute('data-type-hijo', 'u');	
	}
	li.setAttribute('data-hijo', key);	
	li.setAttribute('data-materia', indice_m);
	div1.className += "div1 text-primary-color";
	div2.className = "div2 primary-text-color";
	div3.className = "div3";
	div4.className = "div4 secondary-text-color";
	li.className = "divider-color";
	li.appendChild(div1);
	li.appendChild(div2);
	li.appendChild(div3);
	li.appendChild(div4);
	a.appendChild(li);
	ul.appendChild(a);
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

function isRelleno(sNum){
  return (typeof sNum === "string") && sNum.length === 9 ;
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
function clickeando(){
	$('ul#menu_principal a li').on('click', function() {
		if( $(this).attr('data-type-hijo') == "u")
			menu_unidades($(this).attr('data-materia'))
		else if ( $(this).attr('data-type-hijo') == "t"){
			if( isUnidad_1( $(this).attr('data-materia') ) )
				menu_temas($(this).attr('data-materia'), 0 );
			else
				menu_temas($(this).attr('data-materia'), $(this).attr('data-hijo') );
		}
	});
}




$('#boton_atras').bind('touchstart',function(e){
    $(this).addClass('hovered');
	e.stopPropagation();  e.preventDefault();
     }).bind('touchend',function(){
     $t=setTimeout(function(){
		 //$('#boton_atras').toggleClass('transform-active', 500).promise().done(function(){
			 $('.transform').toggleClass('transform-active'); 
    		$('#boton_atras').removeClass('hovered');
			if(	document.getElementById("boton_atras").getAttribute('data-type-padre') == "m" )
				menu_materias();
			else if( document.getElementById("boton_atras").getAttribute('data-type-padre') == "u" )
				menu_unidades( document.getElementById("boton_atras").getAttribute('data-padre'));
		//});
	 },300);
});
/*
$('.boton').on('click', function() {
	if(	document.getElementById("boton_atras").getAttribute('data-type-padre') == "m" )
		menu_materias();
	else if( document.getElementById("boton_atras").getAttribute('data-type-padre') == "u" )
		menu_unidades( document.getElementById("boton_atras").getAttribute('data-padre'));
});*/