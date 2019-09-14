
let gameColumns;

let chatStatus = 0;

document.addEventListener('DOMContentLoaded' , ()=>{
    createGameBoard();

    document.getElementById('toggleChatEvent').addEventListener('click' , ()=>{
        !chatStatus ? openChat() : closeChat();
    });

    document.addEventListener('keyup' , (e)=>{
        if( e.keyCode === 27 ){
            closeChat();
        }
    })
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

class Chronometer {
    constructor ( x = 0, y = 0 ) {
        this.x = x;
        this.y = y;
    }
}

const remainingTime = (time) =>{
    setInterval( () => {
        // console.log(`${time}`);
        if( time <= 0 ){
            // console.log('Stop');
        };
        time --;
    }, 1000);
}
remainingTime(10);