
var handCards = document.getElementsByClassName("handCards");
var unoCall = document.getElementById("unoCall");
var stackCards = document.getElementById("stackCards");
var newGame = document.getElementById("newGame");
var callUno = false;
var refresh = false;
var color = "";

unoCall.addEventListener("click", function() {
  if(callUno ===true) {
    callUno = false;
    unoCall.setAttribute('src', "assets/images/pics/CallUno.png")
  }
  else {
    callUno = true;
    unoCall.setAttribute('src', "assets/images/pics/CallUno.png")
  }
});

newGame.addEventListener("click", function() {
  var answer = window.confirm("New game?");
  if (answer) {
    newGame.setAttribute('href', "/newGame")
  }
});

for(var i = 0; i < handCards.length; i++){
  handCards[i].addEventListener("click", function() {
    var sign = ""
    if(this.getAttribute('src').includes('Black')) {
      while (sign === "") {
        var sign = prompt("Wishcolor?");
      }
      sign = "§" + sign
    }
    setCard(this.getAttribute('id') + sign, callUno);
  });
};

stackCards.addEventListener("click", function() {
  getCard();
});

function setCard(cardIndex, callUno) {
  alert(cardIndex)
  if(callUno===false) {
    window.location = "/instruction?input=r&unoIndex=&index=" + cardIndex;
  }
  else {
    window.location = "/instruction?input=r&unoIndex=" + cardIndex +"&index=";
  }
}

function getCard() {
  window.location = "/instruction?input=s&unoIndex=&index=";
}