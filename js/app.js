/*
 * Create a list that holds all of your cards
 */

let gameCards = ["diamond","paper-plane-o","anchor","bolt","cube","leaf","bicycle","bomb",
                    "diamond","paper-plane-o","anchor","bolt","cube","leaf","bicycle","bomb"];
shuffle(gameCards);

const fragment = document.createDocumentFragment();
for (let index = 0; index <= 15; index++) {
    let myLi = document.createElement('li');
    let myIcon = document.createElement('i');
    myLi.classList.add("card");
    myLi.setAttribute("id",index);
    myLi.setAttribute("value",0);
    myIcon.classList.add("fa");
    myIcon.classList.add("fa-"+gameCards[index]);
    myLi.appendChild(myIcon);
    fragment.appendChild(myLi);
}

document.getElementsByClassName('deck')[0].appendChild(fragment);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

for (let index = 0; index < gameCards.length; index++) {
    $('#'+index).click(function addValue() {
        $(this).val(1);
    });
}

let cardsList = [];
for (let index = 0; index < gameCards.length; index++) {
    cardsList[index]=$('#'+index).get(0);
}

let cardClicksNumber = 0;
let firstClickedCard = null;
let secondClickedCard = null;
$('.card').click(function engine(event) {
    thisId = $(this).attr("id");
    $("#"+thisId).off("click",engine);
    for (let index = 0; index < gameCards.length; index++) {
        if(cardsList[index].value == 1){
            cardClicksNumber ++;
        }
        if((cardClicksNumber==1)&&(cardsList[index].value == 1)){
            firstClickedCard = $(this).find('i:first').attr('class').split(' ')[1];
            cardsList[index].value = 0;
        }
        if((cardClicksNumber==2)&&(cardsList[index].value == 1)){
            secondClickedCard = $(this).find('i:first').attr('class').split(' ')[1];
            cardsList[index].value = 0; 
            break;
        }
        
    }
    //console.log(cardClicksNumber);
    //console.log(firstClickedCard);
    //console.log(secondClickedCard);
    if ((firstClickedCard===secondClickedCard)&&(firstClickedCard!=null)) {
        alert("correct");
        //console.log('.'+firstClickedCard);
        $('.'+firstClickedCard).parent().removeAttr('value');
        $('.'+firstClickedCard).parent().removeAttr('id');
        //$('.'+firstClickedCard).parent().off("click",engine);
        //console.log($('.'+firstClickedCard).parent().get(0));
        //console.log($('.'+secondClickedCard).parent().get(0));
        firstClickedCard = null;
        secondClickedCard = null;
        cardClicksNumber = 0;
    }
    if ((firstClickedCard!=secondClickedCard)&&(cardClicksNumber==2)) {
        cardClicksNumber=0;
        firstClickedCard = null;
        secondClickedCard = null;
        console.log("cardclicknumbers= ",cardClicksNumber);
    }
});