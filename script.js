let scores, roundScore, activePlayer, gamePlaying, goal;
const saveDice = [];

innit();

//NEW GAME
function innit() {
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    saveDice.length = 0;

    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.diceSecond').style.display = 'none';

    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('#player-0-panel').classList.remove('winner');
    document.querySelector('#player-1-panel').classList.remove('winner');

    document.querySelector('#player-0-panel').classList.remove('active');
    document.querySelector('#player-1-panel').classList.remove('active');

    document.querySelector('#player-0-panel').classList.add('active');
}

//SET GOAL
document.querySelector('#btn-set').addEventListener('click', function(){
    goal = document.getElementById('input-goal').value;
});

//SWITCH PLAYER
function nextPlayer() {
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.querySelector('#player-0-panel').classList.toggle('active');
    document.querySelector('#player-1-panel').classList.toggle('active');
}

//BUTTON - NEW GAME
document.querySelector('#btn-new').addEventListener('click', innit);

//BUTTON - ROLL
document.querySelector('#btn-roll').addEventListener('click', function() {

    if(gamePlaying) {
        //1. random number
        var dice = Math.floor(Math.random() * 6) + 1;
        var diceSecond = Math.floor(Math.random() * 6) + 1;

        //2. display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        var diceDOMsecond = document.querySelector('.diceSecond');
        diceDOMsecond.style.display = 'block';
        diceDOMsecond.src = 'dice-' + diceSecond + '.png';

        //4. update round score only if the roled number was not 1
        if(dice !== 1 && diceSecond !== 1) {
            roundScore += (dice + diceSecond);
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
            saveDice.push(dice, diceSecond);
            for (let i = 0; i < saveDice.length; i++){
                let j = i + 1;
                if(saveDice[i] === 6 && saveDice[j] === 6){
                    saveDice.length = 0;
                    document.getElementById(`score-${activePlayer}`).textContent = '0';
                    document.getElementById(`current-${activePlayer}`).textContent = '0';
                    nextPlayer();
                }
            }
        } else {
            saveDice.length = 0;
            nextPlayer();
        }
    }

});

//BUTTON - HOLD
document.querySelector('#btn-hold').addEventListener('click', function() {

    if(gamePlaying) {
        //Add current score to global score
        scores[activePlayer] += roundScore;
        saveDice.length = 0;

        //Update the UI
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

        nextPlayer;
        //check if player won the game

        if(scores[activePlayer] >= goal){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('#player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('#player-' + activePlayer + '-panel').classList.remove('avtive');
            gamePlaying = false;
        } else {
            nextPlayer();
        }
    }
});




