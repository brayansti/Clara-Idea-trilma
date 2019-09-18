MicroModal.init({
    onShow: modal => {
        initSlider();
    }, // [1]
	onClose: modal => {
        console.info(`${modal.id} is hidden`)
    }, // [2]
	// openTrigger: 'data-custom-open', // [3]
	// closeTrigger: 'data-custom-close', // [4]
	// disableScroll: true, // [5]
	// disableFocus: false, // [6]
	// awaitOpenAnimation: false, // [7]
	// awaitCloseAnimation: false, // [8]
	debugMode: true // [9]
});

let swiperCards;
let counterModalcards = 0;
const initSlider = ()=>{
    counterModalcards ++;
    if( counterModalcards <= 1 ){
        swiperCards = new Swiper('.cardsSwiper' , {
            slidesPerView: 1,
            dynamicBullets: true,
            effect: 'coverflow',
            // simulateTouch: false,
            // coverflowEffect: {
            //     rotate: 50,
            //     stretch: 0,
            //     depth: 100,
            //     modifier: 1,
            //     slideShadows : true,
            // },
            pagination: {
                clickable: true,
                el: '.swiper-pagination',
            },
        });
    }
}