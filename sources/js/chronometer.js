class Chronometer {
	constructor( element , callback ){
		this.element = document.querySelector(element);
		this.callback = callback;
		this.state = 0 // 0:Stop / 1:Running
		this.remainingTime;
		this.counterTime;
	}
	timeInterval(){
		this.counterTime = setInterval(() => {
			this.countDown().then( ()=>{
				clearInterval( this.counterTime );
				this.callback(this);
			} )
		}, 1000);
	}
	countDown(){
		return new Promise( (resolve, reject)=>{
			this.element.innerText = `${this.remainingTime}`;
			console.log(`State: ${this.state} Remaining: ${this.remainingTime}`);
			if(this.remainingTime <= 0){
				resolve();
			};
			this.remainingTime --;
		} )
	}
	stop(){
		this.element.innerText = `0`;
		this.state = 0;
		this.remainingTime = 0;
	}
	start(time){
		if(
			time &&
			time > 0 &&
			typeof(time)=="number" &&
			Number.isInteger(time)
		) {
			// if(this.state== 1) return 'Chronometer is not over.';
			clearInterval( this.counterTime );
			this.state = 1;
			this.element.innerText = time;
			time = time -1;
			this.remainingTime = time;
			this.timeInterval();
		} else{
			return 'Invalid parameters.'
		}
	}
}