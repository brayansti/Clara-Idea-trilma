document.addEventListener('DOMContentLoaded' , (e)=>{
	toogleMenu();
	dropZone();

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

const cfd = new CanvasFreeDrawing.default({
	elementId: 'cfd',
	width: 500,
	height: 500,
	showWarnings: true,
});