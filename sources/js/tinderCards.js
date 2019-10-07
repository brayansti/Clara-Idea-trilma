var swipeCardsContainer = document.querySelector('.swipeCards');
var allCards = document.querySelectorAll('.swipeCards--card');

function initCards(card, index) {
	var newCards = document.querySelectorAll('.swipeCards--card:not(.removed)');

	newCards.forEach(function (card, index) {
		card.style.zIndex = allCards.length - index;
		card.style.transform = 'scale(' + (20 - index) / 20 + ') translateY(-' + 30 * index + 'px)';
		card.style.opacity = (10 - index) / 10;
	});
	
	swipeCardsContainer.classList.add('loaded');
}

allCards.forEach(function (el) {
	var hammertime = new Hammer(el);

	hammertime.on('pan', function (event) {
		el.classList.add('moving');
	});

	hammertime.on('pan', function (event) {
		if (event.deltaX === 0) return;
		if (event.center.x === 0 && event.center.y === 0) return;

		swipeCardsContainer.classList.toggle('swipeCards_love', event.deltaX > 0);
		swipeCardsContainer.classList.toggle('swipeCards_nope', event.deltaX < 0);

		var xMulti = event.deltaX * 0.03;
		var yMulti = event.deltaY / 80;
		var rotate = xMulti * yMulti;

		el.style.transform = 'translate(' + event.deltaX + 'px, ' + event.deltaY + 'px) rotate(' + rotate + 'deg)';
	});

	hammertime.on('panend', function (event) {
		el.classList.remove('moving');
		swipeCardsContainer.classList.remove('swipeCards_love');
		swipeCardsContainer.classList.remove('swipeCards_nope');

		var moveOutWidth = document.body.clientWidth;
		var keep = Math.abs(event.deltaX) < 80 || Math.abs(event.velocityX) < 0.5;

		el.classList.toggle('removed', !keep);

		if (keep) {
			el.style.transform = '';
		} else {
			var endX = Math.max(Math.abs(event.velocityX) * moveOutWidth, moveOutWidth);
			var toX = event.deltaX > 0 ? endX : -endX;
			var endY = Math.abs(event.velocityY) * moveOutWidth;
			var toY = event.deltaY > 0 ? endY : -endY;
			var xMulti = event.deltaX * 0.03;
			var yMulti = event.deltaY / 80;
			var rotate = xMulti * yMulti;

			el.style.transform = 'translate(' + toX + 'px, ' + (toY + event.deltaY) + 'px) rotate(' + rotate + 'deg)';
			initCards();
			var removedCards = document.querySelectorAll('.swipeCards--card.removed');
			if(allCards.length === removedCards.length){
				endSwipeCards();
			}
		}
	});
});

function createButtonListener(love) {
	return function (event) {
		var cards = document.querySelectorAll('.swipeCards--card:not(.removed)');
		var moveOutWidth = document.body.clientWidth * 1.5;

		if (!cards.length) return false;

		var card = cards[0];

		card.classList.add('removed');

		if (love) {
			card.style.transform = 'translate(' + moveOutWidth + 'px, -100px) rotate(-30deg)';
		} else {
			card.style.transform = 'translate(-' + moveOutWidth + 'px, -100px) rotate(30deg)';
		}

		initCards();

		var removedCards = document.querySelectorAll('.swipeCards--card.removed');
		if(allCards.length === removedCards.length){
			endSwipeCards();
		}
		event.preventDefault();
	};
}

const goBack = ()=>{
	var cards = document.querySelectorAll('.swipeCards--card.removed');
	if (cards.length > 0) {
		var prevCard = cards[(cards.length-1)];
		prevCard.classList.remove('removed');
		initCards();
	}
	else{
		return false
	}
}

const endSwipeCards = () => {
	body.classList.add = 'loading';
	setTimeout(()=>{
		window.location.href = 'game.html';
	} , 500)
}

if(swipeCardsContainer){
	initCards();
}

var nopeListener = createButtonListener(false);
var loveListener = createButtonListener(true);
let toggleNext = true;
function lovenext(e) {
	var nextListener = createButtonListener(toggleNext);
	toggleNext = toggleNext ? false : true;
	return nextListener(e)
}

// var swipe_nope = document.getElementById('nope');
// var swipe_love = document.getElementById('love');
let swipe_back = document.querySelectorAll('[swipe-control="back"]');
let swipe_next = document.querySelectorAll('[swipe-control="next"]');
let swipe_question = document.querySelectorAll('.cardCuestions__cuestion');


if(swipeCardsContainer){
	// swipe_nope.addEventListener('click', nopeListener);
	// swipe_love.addEventListener('click', loveListener);
	// swipe_next.addEventListener('click', (e)=>lovenext(e) );

	swipe_next.forEach(element => {
		element.addEventListener('click' , loveListener)
	});
	swipe_back.forEach(element => {
		element.addEventListener('click' , goBack)
	});

	// swipe_next[0].addEventListener('click', loveListener);

	const cardCuestions =  document.querySelectorAll('.cardCuestions');
	for (let index = 0; index < cardCuestions.length; index++) {
		const cardCuestion = cardCuestions[index];
		const singleCuestion = cardCuestion.querySelectorAll('.cardCuestions__cuestion');

		for (let indexCuestions = 0; indexCuestions < singleCuestion.length; indexCuestions++) {
			const element = singleCuestion[indexCuestions];

			element.addEventListener('click' , (e)=>{
				singleCuestion.forEach(element => { element.classList.remove('active'); });
				element.classList.add('active');
				setTimeout(() => {
					lovenext(e);
				}, 300);
			})
		}

	}

}