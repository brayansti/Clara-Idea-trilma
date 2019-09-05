let swiperCards;
let counterModalcards = 0;
$( document ).ready( ()=>{
    $('#cardsModal').on('shown.bs.modal', function (e) {
        counterModalcards ++;
        if( counterModalcards <= 1 ){
            swiperCards = new Swiper('.cardsSwiper' , {
                slidesPerView: 'auto',
                dynamicBullets: true,
                effect: 'coverflow',
                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows : true,
                },
                pagination: {
                    clickable: true,
                    el: '.swiper-pagination',
                },
            });
        }
    })
} );