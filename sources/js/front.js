document.addEventListener('DOMContentLoaded' , (e)=>{
	toogleMenu();
});

const toogleMenu = ()=>{
	const menuHamburguer = document.querySelector('.hamburger-menu');

	menuHamburguer.addEventListener('click' , (e)=>{
		document.querySelector('.hamburger-menu .bar').classList.toggle('animate');
		document.querySelector('.mainHeader__nav').classList.toggle('hide');
	});
}