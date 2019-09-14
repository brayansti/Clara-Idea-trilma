import { resolve } from "path";

class Chronometer {
	constructor( element , endCallback ){
		this.element = document.querySelector(element);
		this.endCallback = endCallback;
		this.state = 0 // 0:Stop / 1:Running
		this.remainingTime;
		this.counterTime;
	}
	timeInterval(){
		this.counterTime = setInterval( () => this.countDown() , 1000);
	}
	countDown(){
		console.log(`State: ${this.state} Remaining: ${this.remainingTime}`);
		if(this.remainingTime <= 0) this.stop();
		this.remainingTime --;
	}
	setTime(time){
		if(
			time &&
			time > 0 &&
			typeof(time)=="number" &&
			Number.isInteger(time)
		){
			if(this.state== 0) return 'Chronometer is not started.';
			this.remainingTime = time;
		} else{
			return 'Invalid parameters.'
		}
	}
	stop(){
		this.state = 0;
		clearInterval( this.counterTime );
		console.log('END');
	}
	start(time){
		if(
			time &&
			time > 0 &&
			typeof(time)=="number" &&
			Number.isInteger(time)
		) {
			if(this.state== 1) return 'Chronometer is not over.';
			this.state = 1;
			this.remainingTime = time;
			this.timeInterval();
		} else{
			return 'Invalid parameters.'
		}
	}
}

// Ejecucion
let cronometro = new Chronometer('.algo' , function(){
	console.log('Finalizado');
});

const users = [
	{id: 0, name: 'Paula' , profesion:'Futbolista' },
	{id: 1, name: 'Mario' , profesion:'Motorista' },
	{id: 2, name: 'Rafael' , profesion:'Actor' },
	{id: 3, name: 'Ana' , profesion:'Pescador' },
]
// console.log( users.filter( user => user.name=='Rafael' ) );

const getUsers = (callback)=> {
	callback( users );
};
const getUser = (id, callback)=> {
	callback( users.filter( (user)=>user.id == id)[0] );
};
const getProfesion = (user, callback)=> {
	callback( user.profesion );
};

const getUserPromise = ()=> {
	return new Promise( (resolve , reject)=>{
		console.log( resolve );
		resolve();
	} );
}

getUserPromise().then( (response) =>{
	console.log(response);
} )

getUsers( (users) =>{
	getUser( users[1].id , (user)=>{
		console.log(user);
		getProfesion(user , (profesion)=>{
			console.log( profesion );
		});
	} );
});