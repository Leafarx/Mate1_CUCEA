// JavaScript Document

var JSON_temario;
var block = 4;	// variable para bloquear el touch mientras esta en transicion
var n_trans = 4; // numero de transiciones que hace el menu temas

function inicio() {
	loadJSON(function(response) {
 		JSON_temario = JSON.parse(response);
		document.getElementById("btn_atras").style.display = "none";
		btn_atras_touch_listeners();
		crear_menu_materias();//crear_menu_unidades(0);//crear_menu_temas(0,0);
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
			
			document.getElementById("menu_temas").getElementsByClassName("div1")[key].innerHTML = obj.t_id;
			document.getElementById("menu_temas").getElementsByClassName("div2")[key].innerHTML = obj.name;	
			document.getElementById("menu_temas").getElementsByClassName("div4")[key].innerHTML = obj.sub_name;
		});
		touch_menu("temas");
}

function crear_menu_contenido(identificador){
	
	
	}

function touch_menu(tipo){
	var myLi = document.getElementById("menu_"+tipo).getElementsByTagName("li"); 
    for ( i = 0; i < (myLi.length); i++) {
		myLi[i].addEventListener("touchstart", function(evt) {
			if( block >= n_trans){
				evt.stopPropagation();  /*evt.preventDefault();*/
				this.style.backgroundColor = "var(--dark-accent-color)";
				crear_menu_contenido();
				document.getElementById("titulo").style.opacity = "0";
				if(tipo == "materias")
					crear_menu_unidades(this.getAttribute("data_m"));		
				else if(tipo == "unidades")
					crear_menu_temas(this.getAttribute('data_m'), this.getAttribute('data_u'));
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
					},300); 
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
		 },300);
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