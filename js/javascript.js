// JavaScript Document

function cambiar_menu(id_ocultar, id_mostrar) {
 // document.getElementById("mensaje").innerHTML = id_ocultar + "->" + id_mostrar ;
  document.getElementById(id_ocultar).style.display = 'none';
  document.getElementById(id_mostrar).style.display = 'inherit';
}
