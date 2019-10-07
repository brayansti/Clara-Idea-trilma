/*!
 * Desarrollo y maquetacion por Brayan Camargo https://brayansti.github.io
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2019 Brayan Camargo
 */


// Check for MicroModal
if( typeof(MicroModal) != 'undefined' ){
    MicroModal.init({
        onShow: modal => {
            initSlider();
            onShowModal(modal);
        }, // [1]
        onClose: modal => {
            onCloseModal(modal);
        }, // [2]
        // openTrigger: 'data-custom-open', // [3]
        // closeTrigger: 'data-custom-close', // [4]
        // disableScroll: true, // [5]
        // disableFocus: false, // [6]
        // awaitOpenAnimation: false, // [7]
        // awaitCloseAnimation: false, // [8]
        debugMode: true // [9]
    });
}


let swiperCards = null;
let counterModalcards = 0;
const initSlider = ()=>{
    let sliderOptions = {
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
    }
    // Reload Modal
    if( swiperCards === null ){
        swiperCards = new Swiper('.cardsSwiper' , sliderOptions);
    }else{
        swiperCards.destroy();
        swiperCards = new Swiper('.cardsSwiper' , sliderOptions);
    }
}

let scrollCurretPosition = 0;

const onShowModal = (modal)=>{
    scrollCurretPosition = window.scrollY;
    window.scroll(0 , 0);
    document.getElementsByTagName('body')[0].classList.add('modal-open');
}

const onCloseModal = (modal)=>{
    window.scroll(0 , scrollCurretPosition);
    document.getElementsByTagName('body')[0].classList.remove('modal-open');
}