let x = document.querySelector('.x')
let o = document.querySelector('.o')
let boxes = document.querySelectorAll('.box')
let buttons= document.querySelectorAll('#buttons-container button');
let messageContainer = document.querySelector('#message');
let messageText = document.querySelector('#message p');
let secondPlayer;


//contador  de jogadas
let totalMoves = 0; 
let player1=0;
let player2=0;

//add evt de click
for(let i=0;i<boxes.length;i++){

    boxes[i].addEventListener('click',function(){
        
        let el = checkEl(player1,player2)

        
        //verifica se this nao possui filhos
        if(this.childNodes.length==0){
            let cloneEl=el.cloneNode(true);//cria um clone do el

            this.appendChild(cloneEl);//add ao boxes o clone do el

            //computar jogada
            totalMoves++;
            if(player1==player2){
                player1++

                if(secondPlayer=='ai-player'){

                    computerPlayer()
                    player2++
                   
                }
            }else{
                player2++
            }
            


            checkWinCondition()
        }

        
    })
    
}
//eventos para saber se é dois player ou ia
for(let i =0 ;i<buttons.length;i++){
    buttons[i].addEventListener('click',function(){
        secondPlayer=this.getAttribute("id");
        
        for(let j=0;j<buttons.length;j++){
            buttons[j].style.display='none'
        }
        setTimeout(() => {
            let container=document.querySelector('#container')
            container.classList.remove('hide')

        }, 500);
    })
}

// ve quem vai jogar
function checkEl(player1,player2){
    if(player1==player2){
        //x
        el=x;
    }else{
        //o
        el=o;
    }
    return el;
}

function checkChild(first, last, jump, blocks) {
    let childX = 0;
    let childO = 0;

    for (let i = first; i < last; i += jump) {
        // Verifica se o bloco tem nós filhos
        if (blocks[i].childNodes.length > 0) {
            let child = blocks[i].firstChild;  // Pega o primeiro nó filho

            // Verifica a classe do primeiro nó filho
            if (child.className === 'x') {
                childX++;
            } else if (child.className === 'o') {
                childO++;
            }
        }
    }

    return { childO, childX };
}

function checkWinCondition(){
    let blocks=[]
    for (let i=1;i<=9;i++){
        let block=document.getElementById(`block-${i}`)
        blocks.push(block)
    
    }
    //horizontal
    checkWinner(checkChild(0,3,1,blocks))
    checkWinner(checkChild(3,6,1,blocks))
    checkWinner(checkChild(6,9,1,blocks))
    //vertical
    checkWinner(checkChild(0,7,3,blocks))
    checkWinner(checkChild(1,8,3,blocks))
    checkWinner(checkChild(2,9,3,blocks))
    //Diagonal
    checkWinner(checkChild(0,9,4,blocks))
    checkWinner(checkChild(2,7,2,blocks))

        
            
}

function checkWinner(funcao){
    let { childX, childO } = funcao
    let msg=''
    let scoreboardX=document.querySelector('#scoreboard-1')
    let scoreboardO=document.querySelector('#scoreboard-2')
    
   
    

    if(childX==3){
        scoreboardX.textContent=parseInt(scoreboardX.textContent)+1
        msg='Vitoria do jogador 1'

    }else if(childO == 3){
        scoreboardO.textContent=parseInt(scoreboardO.textContent)+1
        msg='Vitoria do jogador 2'     
    }

    if(childO==3||childX==3){
        messageText.innerHTML=msg
        messageContainer.classList.remove('hide')
        
        resetGame()
    }else if(totalMoves>=9){
        msg='Deu velha'
        messageText.innerHTML=msg
        messageContainer.classList.remove('hide')
        resetGame()
    }

    


}
function resetGame() {
    player1 = 0;
    player2 = 0;
    totalMoves=0;

    setTimeout(function () {
        messageContainer.classList.add('hide');
    }, 3000);

    // Remove os boxes
    let removeBoxes = document.querySelectorAll('.box div');
    for(let i = 0;i<removeBoxes.length;i++){
        removeBoxes[i].parentNode.removeChild(removeBoxes[i])
    }
}

// executar a logica do pc
function computerPlayer(){
    let cloneO=o.cloneNode(true)

    //quantos eu preencho
    let counter=0
    //quantos foram preenchidos
    let filled = 0

    for(let i =0; i<boxes.length;i++){
        
        let randomNumber=Math.floor(Math.random()*5)
        // só preencher se estiver vazio o filho
        if(boxes[i].childNodes[0]==undefined){
            if(randomNumber<=1){
                setTimeout(()=>{
                    boxes[i].appendChild(cloneO)
                    totalMoves++
                    
                checkWinCondition()
                },500)
                counter++
                break
            }
            //checar quantos estão preenchidas    
            } else {
                filled++
            }        
        }

    if(counter==0 && filled<9){
        computerPlayer()
    }    
}
    
