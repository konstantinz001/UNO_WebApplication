$(document).ready(function () {
  console.log("Document is ready, filling grid");
  connectWebSocket();
});

let websocket;
let callUno = false;
let wishColor = "";
let wishValue = "";

class UnoField {

  constructor() {
    this.playStackCard = '';
    this.playernameCurrent = '';
    this.playernameNext = '';
    this.playerCardsCurrent = [];
    this.playerCardsNext = [];
    this.callUno = callUno;
    this.wishColor = wishColor;
    this.wishValue = wishValue;
  }

  updateGame() {
    this.callUno = false;
    var index = 0;

    $('#uno-GameField').css('visibility', 'visible');
    $('#wishGame-GameField').css('visibility', 'collapse');
    $('#unoCall').attr('src', "assets/images/pics/UNO_Logo.png")
    $('#gameMessage').empty();
    $('#gameMessage').append('<h4>PLAYER ' + playernameCurrent + ' it´s your turn</h4>');
    $('#stackCard').empty();
    $('#stackCard').append('<img class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(playStackCard) + '" width="100" id= "PlayStack">');
    $('#handCard').empty();
    playerCardsCurrent.forEach(handcard => {
      if (setCardPicPath(handcard).includes("Black")) {
        $('#handCard').append('<img onclick="setBlackCard(' + index + ')" class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(handcard) + '" width="100" id= "' + index + '">');

      } else {
        $('#handCard').append('<img onclick="setCard(' + index + ')" class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(handcard) + '" width="100" id= "' + index + '">');
      }
      index = index + 1;
    })
    if (this.wishColor != "") {
      this.wishColor = "";
      this.wishValue = "";
      location.reload();
    }
  }
}

async function setBlackCard(cardIndex) {
  $('#uno-GameField').empty();
  $('#wishGame-GameField').css('visibility', 'visible');
  wishValue = cardIndex;
}


async function setWishColor(color) {
  wishColor = color;
  setCard(wishValue + " " + wishColor);

}

function setCard(cardIndex) {

  console.log(cardIndex);
  if (callUno === false) {

    websocket.send(JSON.stringify({
      "set": {
        "cardIndex": cardIndex
      }
    }))
  }

  else {
    websocket.send(JSON.stringify({
      "call": {
        "cardIndex": cardIndex
      }
    }))
  }
}

function getCard() {
  websocket.send(JSON.stringify({
    "get": {}
  }))
}

async function clickUno() {
  if (callUno === true) {
    callUno = false;
    $('#unoCall').attr('src', "../assets/images/pics/UNO_Logo.png")
  }
  else {
    callUno = true;
    $('#unoCall').attr('src', "../assets/images/pics/CallUno.png")
  }
}


function connectWebSocket() {
  websocket = new WebSocket("ws://localhost:9000/websocket");
  websocket.setTimeout


  websocket.onopen = function (event) {

    websocket.send(JSON.stringify({
      "connected": {
        "connect": "successful"
      }
    }))
    console.log("Connected to Websocket");
  }
  websocket.onclose = function () {
    console.log('Connection with Websocket Closed!');
  };

  websocket.onerror = function (error) {
    console.log('Error in Websocket Occured: ' + error);
  };

  websocket.onmessage = function (e) {
    if (typeof e.data === "string") {
      console.log(e.data);
      let unofield = new UnoField;
      let result = JSON.parse(e.data);
      playStackCard = result.game.playStackCard;
      playernameCurrent = result.game.playerListNameCurrent;
      playerCardsCurrent = result.game.playerListCardsCurrent;

      playernameNext = result.game.playerListNameNext;
      playerCardsNext = result.game.playerListCardsNext;
      unofield.updateGame();

    }
  }
}



function setCardPicPath(card) {
  var color = "";
  var value = "";
  if (card.includes("red")) {
    color = "Red_";
  }
  else if (card.includes("blue")) {
    color = "Blue_";
  }
  else if (card.includes("yellow")) {
    color = "Yellow_";
  }
  else if (card.includes("green")) {
    color = "Green_";
  }
  else {
    color = "Black_";
  }
  if (card.includes("<-->")) {
    value = "Reverse.png";
  }
  else if (card.includes("Ø")) {
    value = "Skip.png";
  }
  else if (card.includes("4+ ColorSwitch")) {
    value = "4+ColorSwitch.png";
  }
  else if (card.includes("ColorSwitch")) {
    value = "ColorSwitch.png";
  }
  else if (card.includes("+2")) {
    value = "+2.png";
  }
  else if (card.includes("0")) {
    value = "0.png";
  }
  else if (card.includes("1")) {
    value = "1.png";
  }
  else if (card.includes("2")) {
    value = "2.png";
  }
  else if (card.includes("3")) {
    value = "3.png";
  }
  else if (card.includes("4")) {
    value = "4.png";
  }
  else if (card.includes("5")) {
    value = "5.png";
  }
  else if (card.includes("6")) {
    value = "6.png";
  }
  else if (card.includes("7")) {
    value = "7.png";
  }
  else if (card.includes("8")) {
    value = "8.png";
  }
  else if (card.includes("9")) {
    value = "9.png";
  }
  else {
    value = "Radio.png";
  }
  return color + value
}