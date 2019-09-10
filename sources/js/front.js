document.addEventListener('DOMContentLoaded' , (e)=>{
	toogleMenu();
	dropZone();
});

const toogleMenu = ()=>{
	const menuHamburguer = document.querySelector('.hamburger-menu');

	menuHamburguer.addEventListener('click' , (e)=>{
		document.querySelector('.hamburger-menu .bar').classList.toggle('animate');
		document.querySelector('.mainHeader__nav').classList.toggle('hide');
	});
}

Dropzone.autoDiscover = false;
const dropZone = () =>{	   
	
	var dropzoneOptions = {
		url: "index.html",
		dictDefaultMessage: `
			<div>
				<div>Upload files here</div>
				<div>
					<i class="fas fa-cloud-upload-alt"></i>
				</div>
			</div>
		`,
		paramName: "file",
		maxFilesize: 2, // MB
		addRemoveLinks: true,
		accept: function(file, done){
			console.log(file);
			console.log(done);
		},
		// init: function () {
		// 	this.on("success", function (file) {
		// 		console.log("success > " + file.name);
		// 	});
		// }
	};

	// let newDropzone = new Dropzone(".dropzone", dropzoneOptions );

	let selectDropzones = document.querySelectorAll('.dropzone')

	let newDropzone;
	
	selectDropzones.forEach(element => {
		// let idDropzone = element.id;
		// let newDropzone = new Dropzone("#"+idDropzone, dropzoneOptions );
		let newDropzone = new Dropzone(element, dropzoneOptions );
	});
}