// JavaScript Document
// Necesita refactorizar todo el touch_menu y el problema touch-Michel

var JSON_temario;
var JSON_contenido;
var block = 4;	// variable para bloquear el touch mientras esta en transicion
var n_trans = 4; // numero de transiciones que hace el menu temas

function inicio() {
	loadJSON(function(response) {
 		JSON_temario = JSON.parse(response);
		document.getElementById("btn_atras").style.display = "none";
		btn_atras_touch_listeners();
		crear_menu_materias();//crear_menu_unidades(0);//crear_menu_temas(0,0);
	});	
	loadJSON2(function(response) {
 		JSON_contenido = JSON.parse(response);
		
	});	
}

function crear_menu_materias(){
	Object.keys(JSON_temario.MATERIAS).forEach(function(key) {
		var obj = JSON_temario.MATERIAS[key];
		if(key>0){
			var elemento = document.getElementById("menu_materias").getElementsByClassName("divider-color")[0];
			var elemento_n = elemento.cloneNode(true);
			document.getElementById("menu_materias").appendChild(elemento_n);
		}
		document.getElementById("menu_materias").getElementsByTagName("li")[key].setAttribute('data_m',key);
		document.getElementById("menu_materias").getElementsByClassName("forma")[key].style.backgroundColor = obj.color;
		document.getElementById("menu_materias").getElementsByClassName("div2")[key].innerHTML = obj.name;
		if(obj.n_unidades == "1")
			document.getElementById("menu_materias").getElementsByClassName("div4")[key].innerHTML = "1 unidad,  " + obj.n_temas + " temas";
		else
			document.getElementById("menu_materias").getElementsByClassName("div4")[key].innerHTML = obj.n_unidades + " unidades,  " + obj.n_temas + " temas";
	});
	touch_menu("materias");
}
function crear_menu_unidades(indice_m){
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
		document.getElementById("menu_unidades").getElementsByTagName("li")[key].setAttribute('data_m',indice_m);
		document.getElementById("menu_unidades").getElementsByTagName("li")[key].setAttribute('data_u',key);
		document.getElementById("menu_unidades").getElementsByClassName("div1")[key].innerHTML = obj.u_id;
		document.getElementById("menu_unidades").getElementsByClassName("div2")[key].innerHTML = obj.name;	
		document.getElementById("menu_unidades").getElementsByClassName("div4")[key].innerHTML = obj.n_temas + " temas";
	});
	touch_menu("unidades");
}
function crear_menu_temas(indice_m, indice_u){
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
		document.getElementById("menu_temas").getElementsByTagName("li")[key].setAttribute('data_id',obj.id);
		document.getElementById("menu_temas").getElementsByClassName("div1")[key].innerHTML = obj.t_id;
		document.getElementById("menu_temas").getElementsByClassName("div2")[key].innerHTML = obj.name;	
		document.getElementById("menu_temas").getElementsByClassName("div4")[key].innerHTML = obj.sub_name;
	});
	touch_menu("temas");
}

function crear_plantilla_contenido(identificador){
	var key_id = -1;
	var cont_cont = 0;
	var elemento = document.getElementById("plantilla_contenido").getElementsByTagName("li")[0];
	$("ul#plantilla_contenido").empty();
	var elemento_n = elemento.cloneNode(true);
	document.getElementById("plantilla_contenido").appendChild(elemento_n);

	/*console.log(JSON_contenido.CONTENIDO[0].name);*/
	
	Object.keys(JSON_contenido.CONTENIDO).forEach(function(key){
		if(JSON_contenido.CONTENIDO[key].id == identificador)
			key_id = key;				
	});
	
	if(key_id != -1){
		ancho = document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[key_id].clientWidth;
		alto = ancho /1.7778;
		document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[key_id].style.height = alto+'px';
		
		//Minimo un video
		Object.keys(JSON_contenido.CONTENIDO[key_id].VIDEOS).forEach(function(key) {
			cont_cont += 1;
			var obj = JSON_contenido.CONTENIDO[key_id].VIDEOS[key];
			if(key>0){
				var elemento2 = document.getElementById("plantilla_contenido").getElementsByTagName("li")[0];
				elemento_n = elemento2.cloneNode(true);
				document.getElementById("plantilla_contenido").appendChild(elemento_n);
			}
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p1")[key].innerHTML = obj.name;
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p2")[key].innerHTML = obj.autor;
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[key].src = obj.www;
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p4")[key].innerHTML = obj.minutos + " min.&nbsp;&nbsp;&nbsp;&nbsp;" + obj.publicado + "&nbsp;&nbsp;&nbsp;&nbsp;" + obj.visualizaciones + "&nbsp;visualizaciones";
		});
		
		alto = ancho * 1.25;
		Object.keys(JSON_contenido.CONTENIDO[key_id].IMAGENES).forEach(function(key2) {
			var obj = JSON_contenido.CONTENIDO[key_id].IMAGENES[key2];
			if(key2>0 || cont_cont>0){
				var elemento2 = document.getElementById("plantilla_contenido").getElementsByTagName("li")[0];
				elemento_n = elemento2.cloneNode(true);
				document.getElementById("plantilla_contenido").appendChild(elemento_n);
			}
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p1")[cont_cont].innerHTML = obj.name;
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p2")[cont_cont].innerHTML = obj.autor;
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[cont_cont].src = "";
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[cont_cont].style.backgroundImage = "url('"+obj.www+"')";
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[cont_cont].style.backgroundSize = ancho+"px "+alto+"px";
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p3")[cont_cont].style.height = alto+'px';
			document.getElementById("plantilla_contenido").getElementsByClassName("div_p4")[cont_cont].innerHTML = obj.size;
			cont_cont += 1;
		});
		
		
		//touch_menu("unidades");
	}
	
}

function touch_menu(tipo){
	var myLi = document.getElementById("menu_"+tipo).getElementsByTagName("li"); 
    for ( i = 0; i < (myLi.length); i++) {
		myLi[i].addEventListener("touchstart", function(evt) {
			if( block >= n_trans){
				evt.stopPropagation();  /*evt.preventDefault();*/
				this.style.backgroundColor = "var(--dark-accent-color)";
				document.getElementById("titulo").style.opacity = "0";
				if(tipo == "materias")
					crear_menu_unidades(this.getAttribute("data_m"));		
				else if(tipo == "unidades")
					crear_menu_temas(this.getAttribute('data_m'), this.getAttribute('data_u'));
				else if(tipo == "temas")
					crear_plantilla_contenido(this.getAttribute('data_id'));
			}
		}, false);
		
		myLi[i].addEventListener("touchend",function(evt) {
			evt.stopPropagation();  evt.preventDefault();
			if( block >= n_trans){    		
				var esto = this;
				if(document.getElementById("titulo").style.opacity == "0"){
					if(tipo == "materias")
						block = n_trans - 1;
					else 
						block = 1;
					console.log("OFF");
					setTimeout(function(evt){
						esto.style.backgroundColor = "transparent";
						if(tipo == "materias")
							derecha("estado_1", "estado_2");
						else if(tipo == "unidades")
							derecha("estado_2", "estado_3");
						else if(tipo == "temas")
							derecha("estado_3", "estado_4");	
							
						document.getElementById("titulo").style.opacity = "1";	
					},150); 
				}
			}
		}, false);
				
		myLi[i].addEventListener("touchmove",function(evt) { 
		   	if( block >= n_trans){    	
				evt.stopPropagation();  /*evt.preventDefault();*/
				this.style.backgroundColor = "transparent";
				document.getElementById("titulo").style.opacity = "1";
			}
		}, false);
		
    }
}

function handleStart(evt) {
	if( block >= n_trans){ 
		$('#btn_atras').addClass('hovered');
		evt.stopPropagation();  evt.preventDefault();
		document.getElementById("titulo").style.opacity = "0";
		}
}
	
function handleEnd(evt) {
	evt.stopPropagation();  evt.preventDefault();
	if( block >= n_trans){
		block = n_trans-1;	console.log("OFF"); 
		setTimeout(function(){
			$('#btn_atras').removeClass('hovered');
			if(document.getElementById("estado_2").style.left == "0%")
				izquierda("estado_1" , "estado_2");
			else if(document.getElementById("estado_3").style.left == "0%")
				izquierda("estado_2" , "estado_3");
			else if(document.getElementById("estado_4").style.left == "0%")
				izquierda("estado_3" , "estado_4");
			document.getElementById("titulo").style.opacity = "1";
		 },150);
	}
}

function onTransitionEnd(){
	block += 1;
	console.log(block);
	if(block == n_trans)
		console.log("ON");
	}


function derecha(edo_ini, edo_fin){
	document.getElementById(edo_ini).style.left = "-100%";
	document.getElementById(edo_fin).scrollTop = "0";
	document.getElementById(edo_fin).style.left = "0%";
	document.getElementById(edo_fin).style.overflowY = "scroll";
	header_display(edo_fin);
	var box = document.getElementById(edo_fin);
	box.addEventListener('transitionend', onTransitionEnd, false);
	
	}
function izquierda(edo_fin, edo_ini){
	document.getElementById(edo_ini).style.left = "100%";
	document.getElementById(edo_fin).scrollTop = "0";
	document.getElementById(edo_fin).style.left = "0%";
	document.getElementById(edo_fin).style.overflowY = "scroll";
	header_display(edo_fin);
	}

function header_display(estado){
	switch(estado){
		case "estado_1":
			document.getElementById("btn_atras").style.display = "none";
			document.getElementById("titulo").innerHTML = "INICIO";
			break;
		case "estado_2":
			document.getElementById("btn_atras").style.display = "inherit";
			document.getElementById("titulo").innerHTML = "UNIDADES";
			break;
		case "estado_3":
			document.getElementById("btn_atras").style.display = "inherit";
			document.getElementById("titulo").innerHTML = "TEMAS";
			break;
		case "estado_4":
			document.getElementById("btn_atras").style.display = "inherit";
			document.getElementById("titulo").innerHTML = "CONTENIDO";
			break;
	}
}

function btn_atras_touch_listeners() {
  var el = document.getElementById("btn_atras");
  el.addEventListener("touchstart", handleStart, false);
  el.addEventListener("touchend", handleEnd, false);
}


function loadJSON(callback) {   
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("web/json");
    xobj.open('GET', 'json/temario.json', true);
    xobj.onreadystatechange = function () {
    	if (xobj.readyState == 4 && xobj.status == "200")
        	callback(xobj.responseText);
    };
    xobj.send(null);  
}

function loadJSON2(callback) {   
	var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("web/json");
    xobj.open('GET', 'json/contenido.json', true);
    xobj.onreadystatechange = function () {
    	if (xobj.readyState == 4 && xobj.status == "200")
        	callback(xobj.responseText);
    };
    xobj.send(null);  
}
