/*!
 * Desarrollo y maquetacion por Brayan Camargo https://brayansti.github.io
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2019 Brayan Camargo
 */

function utilidadesJS() {}

utilidadesJS.orietacionImagenes = function (selector, classHorizontal, classVertical, classCuadrada) {
	// ↓↓ Valores por defecto
	if (classHorizontal == undefined) {classHorizontal = 'imagen_horizontal'}
	if (classVertical == undefined) {classVertical = 'imagen_vertical'}
	if (classCuadrada == undefined) {classCuadrada = 'imagen_cuadrada'}
		// ↑↑ Valores por defecto

	var imagenes = document.querySelectorAll(selector);
	if (imagenes[0].tagName == 'IMG') {
		for (var i = 0; i < imagenes.length; i++) {
			var anchoNatural = imagenes[i].naturalWidth;
			var altoNatural = imagenes[i].naturalHeight;
			if (anchoNatural > altoNatural) {
				imagenes[i].classList.add(classHorizontal);
			} else if(altoNatural > anchoNatural){
				imagenes[i].classList.add(classVertical);
			}
			else{
				imagenes[i].classList.add(classCuadrada);
			}
		}
	}
	else{
		console.log('Ingresa un selector de imagen valido');
	}
}

var width_viewportView = window.innerWidth;

utilidadesJS.isMobile = () => {
	var retorno;
	if (width_viewportView <= 768) {
		// Movil
		retorno = true
		return retorno
	}
	else{
		// Desktop
		retorno = false
		return retorno
	}
}

utilidadesJS.isTablet = () => {
	var retorno;
	if (width_viewportView <= 992) {
		// Movil
		retorno = true
		return retorno
	}
	else{
		// Desktop
		retorno = false
		return retorno
	}
}

// function accordion(){
// 	// ACCORDION
// 	if ($(".accordion").length > 0) {
// 		$(".accordion__toggle.active").next().slideDown(350);
// 	}

// 	$(".accordion__toggle").on("click", function (e) {
// 		e.preventDefault();

// 		var otherItems = $(".accordion__toggle").parent().parent().find(".accordion__toggle").not(this);

// 		otherItems.removeClass("active");
// 		otherItems.next().slideUp(350);

// 		$(this).toggleClass("active");
// 		$(this).next().slideToggle(350);
// 	});
// }