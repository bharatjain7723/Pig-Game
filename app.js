/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activeplayer, gamePlaying, count = 0;
;

init();

//document.querySelector('#current-' + activeplayer).textContent =  dice;

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
    //1. Random Number
    var dice1 = Math.floor( Math.random() * 6) + 1;
    var dice2 = Math.floor( Math.random() * 6) + 1;


    //2. display the result
    document.getElementById('dice-1').style.display = 'block';
    document.getElementById('dice-2').style.display = 'block';

    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

        
//    // Check for 2 sixes
//    if(dice === 6){
//        count++;
////        console.log('count is' + count);
//    }
//    else{
//        count = 0;
//    }    
    
    //3. update the scores
    if(dice1 === 1 || dice2 === 1){
        //next player
//        console.log('dice is' + dice);
        nextPlayer();
    }
//    else if(count > 1){
//        score[activeplayer] = 0;
//        document.getElementById('score-' + activeplayer).textContent = '0';
//        nextPlayer();
//    }
    else{
        //add score
        roundScore += (dice1 + dice2);
        document.querySelector('#current-' + activeplayer).textContent = roundScore;
    }
}
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        // add current score to global score
        score[activeplayer] += roundScore;
    
        // update the UI 
        document.getElementById('score-' + activeplayer).textContent = score[activeplayer];
        
        var input = document.querySelector('.final-score').value;
        var winningScore;
        
        if(input){
            winningScore = input;
        }
        else{
            winningScore = 100;
        }
    
        // check if player won
        if(score[activeplayer] >= winningScore){
            document.querySelector('#name-' + activeplayer).textContent = 'WINNER!';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';            
            document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');
            document.querySelector('.player-' + activeplayer + '-panel').classList.add('winner');
            
            gamePlaying = false;

        }
        else{
            // next player
            nextPlayer();
        }
    }
});

function nextPlayer(){
     roundScore = 0;
    count = 0;
        document.querySelector('#current-' + activeplayer).textContent = 0;
        document.querySelector('.player-' + activeplayer + '-panel').classList.remove('active');

        activeplayer === 0 ? activeplayer = 1 : activeplayer = 0; 
//        activeplayer ^= 1;

        document.querySelector('.player-' + activeplayer + '-panel').classList.add('active');

        document.getElementById('dice-1').style.display = 'none';
        document.getElementById('dice-2').style.display = 'none';}

document.querySelector('.btn-new').addEventListener('click', init);

function init(){
    gamePlaying = true;
    score = [0,0];
    roundScore = 0;
    activeplayer = 0;

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
    
    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;
    document.querySelector('#name-0').textContent = 'Player 1';
    document.querySelector('#name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.add('active');
    

    
}