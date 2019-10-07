/*!
 * Desarrollo y maquetacion por Brayan Camargo https://brayansti.github.io
 * Licensed under the MIT license - http://opensource.org/licenses/MIT
 *
 * Copyright (c) 2019 Brayan Camargo
 */


let gameColumns;

let chatStatus = 0;

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