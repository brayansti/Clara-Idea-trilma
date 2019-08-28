let gameColumns;
let counterModalcards = 0;
let swiperCards;

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

document.addEventListener('DOMContentLoaded' , ()=>{
    createGameBoard();
})


const createGameBoard = ()=>{

    if ( utilidadesJS.isMobile() ) {
        gameColumns = 1;
    } else if( utilidadesJS.isTablet() ){
        gameColumns = 2;
    } else{
        gameColumns = 4;
    };

    let allSteps = document.querySelectorAll('.gameboard__steps > .gameboard__step');
    let rowsToCreate = Math.ceil( (allSteps.length / gameColumns) );
    // ↓↓ Create rows ↓↓
    for (let index = 0; index < rowsToCreate; index++) {
        document.querySelector('.gameboard__steps').insertAdjacentHTML('beforeend',
        `<div class="gameboard__steps_row gameboard__steps_row-${index}"></div>`);
        // ↓↓ CSS Set columns ↓↓
        document.querySelector('.gameboard').style.setProperty( '--colums-grid' , gameColumns);

    }
    // ↑↑ End Create rows ↑↑
    let indexRow = 0;
    let counterRows = 0;
    for (let index = 0; index < allSteps.length; index++) {
        if( counterRows >= gameColumns ){
            counterRows = 0;
            indexRow++;
        }
        // console.log('indexRow : ' + indexRow);
        let currentRow = document.querySelectorAll('.gameboard__steps_row')[indexRow];
        currentRow.insertBefore( allSteps[index] , null )
        // console.log(counterRows);
        counterRows++;
    }
}