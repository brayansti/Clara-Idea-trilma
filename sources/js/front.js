document.addEventListener('DOMContentLoaded' , (e)=>{
	toogleMenu();
	dropZone();
	cfdControls();

    document.getElementById('toggleChatEvent').addEventListener('click' , ()=>{
        !chatStatus ? openChat() : closeChat();
    });

    document.addEventListener('keyup' , (e)=>{
        if( e.keyCode === 27 ){
            closeChat();
        }
    })
});

const toggleChat = ()=>{
    document.querySelector('.chatbox').classList.toggle('active');
    let iconChat = document.querySelectorAll('#toggleChatEvent .fas');
    iconChat.forEach(element => {
        element.classList.toggle('hidden');
    });
    document.querySelector('.sendMessage input').focus();
    chatScrollDown();
}

const closeChat = () => {
    chatStatus = chatStatus == 0 ? 1 : 0;
    document.querySelector('.chatbox').classList.remove('active');
    let iconChat = document.querySelectorAll('#toggleChatEvent .fas');
    iconChat[0].classList.remove('hidden');
    iconChat[1].classList.add('hidden');
    document.querySelector('.sendMessage input').blur();
}

const openChat = () => {
    chatStatus = chatStatus == 0 ? 1 : 0;
    document.querySelector('.chatbox').classList.add('active');
    let iconChat = document.querySelectorAll('#toggleChatEvent .fas');
    iconChat[0].classList.add('hidden');
    iconChat[1].classList.remove('hidden');
    document.querySelector('.sendMessage input').focus();
    chatScrollDown();
}

const chatScrollDown = () =>{
    let chatBox = document.querySelector('.chatbox__chatContent');
    chatBox.scrollTop = chatBox.scrollHeight
}

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

	let selectDropzones = document.querySelectorAll('.dropzone');

	let newDropzone;
	
	selectDropzones.forEach(element => {
		// let idDropzone = element.id;
		// let newDropzone = new Dropzone("#"+idDropzone, dropzoneOptions );
		let newDropzone = new Dropzone(element, dropzoneOptions );
	});
}

// New cronometro -> 
let testTime = new Chronometer('#cronomether' , (clock)=>{
	console.log(clock);
	// Do anythink here
	// Do anythink here
});

const setCanvasWidth = (canvas)=>{
	if(utilidadesJS.isMobile()){
		return 299
	}
	else return 500
}

const cfd = new CanvasFreeDrawing.default({
	elementId: 'drawZone',
	width: setCanvasWidth('drawZone'),
	height: 300,
	showWarnings: true,
});

const cfdControls = ()=>{
	let controls_set_yellow =document.querySelector('.canvas-container__controls_set-yellow');
	let controls_set_red =document.querySelector('.canvas-container__controls_set-red');
	let controls_set_blue =document.querySelector('.canvas-container__controls_set-blue');
	let controls_set_black =document.querySelector('.canvas-container__controls_set-black');
	let controls_set_undo =document.querySelector('.canvas-container__controls_set-undo');
	let controls_set_redo =document.querySelector('.canvas-container__controls_set-redo');
	let controls_set_trash =document.querySelector('.canvas-container__controls_set-trash');
	let controls_set_save =document.querySelector('.canvas-container__controls_set-save');
	
	controls_set_yellow.addEventListener('click' , (e)=>{
		cfd.setDrawingColor([230, 169, 62]);
	});
	controls_set_red.addEventListener('click' , (e)=>{
		cfd.setDrawingColor([250, 61, 90]);
	});
	controls_set_blue.addEventListener('click' , (e)=>{
		cfd.setDrawingColor([36, 127, 255]);
	});
	controls_set_black.addEventListener('click' , (e)=>{
		cfd.setDrawingColor([0, 0, 0]);
	});
	controls_set_undo.addEventListener('click' , (e)=>{
		cfd.undo();
	});
	controls_set_redo.addEventListener('click' , (e)=>{
		cfd.redo();
	});
	controls_set_trash.addEventListener('click' , (e)=>{
		cfd.clear();
	});
	controls_set_save.addEventListener('click' , (e)=>{
		let dataImage = cfd.save();
		// showBase64(dataImage);
		downloadBase64(dataImage);
	});
	function showBase64(base64URL){
		var win = window.open();
		win.document.write('<iframe src="' + base64URL  + '" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>');
	}
	function downloadBase64(base64URL){
		var download = document.createElement('a');
		download.href = base64URL;
		download.download = 'yourDraw.png';
		download.click();
	}
}