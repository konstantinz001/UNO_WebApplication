$(document).ready(function () {
  console.log("Document is ready, filling grid");
  loadJson();
});

let playStackCard = '';
let playernameCurrent = '';
let playernameNext = '';
let playerCardsCurrent = [];
let playerCardsNext = [];
let callUno = false;
let wishColor = "";
let wishValue = "";
const possibleWishColors = ['red','blue','yellow','green'];


var currentPath = window.location.pathname;
if (currentPath.includes("newGame")) {
  window.location.pathname = "/tui";
}
var pages = document.getElementById(currentPath).className = "nav-link active";


function loadJson() {
  $.ajax({
    method: 'GET',
    url: '/json',
    dataType: 'json',

    success: (result) => {
      
      playStackCard = result.game.playStackCard;
      playernameCurrent = result.game.playerListNameCurrent;
      playerCardsCurrent = result.game.playerListCardsCurrent;

      playernameNext = result.game.playerListNameNext;
      playerCardsNext = result.game.playerListCardsNext;
      updateGame();
    },
    error: () => {
      alert('Could not load Json!');
    }
  });
}

function updateGame() {
  console.log("passt")
  wishColor = "";
  wishValue = "";
  callUno = false;
  var index = 0;

  $('#mainGame').css('visibility', 'visible');
  $('#wishGame').css('visibility', 'collapse');
  $('#unoCall').attr('src', "assets/images/pics/UNO_Logo.png")
  $('#gameMessage').empty();
  $('#gameMessage').append('<h4>PLAYER ' + playernameCurrent + 'it´s your turn</h4>');
  $('#stackCard').empty();
  $('#stackCard').append('<img class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(playStackCard) + '" width="100" id= "PlayStack">');
  $('#handCard').empty();
  playerCardsCurrent.forEach(handcard => {
    if(setCardPicPath(handcard).includes("Black")) {
      $('#handCard').append('<img onclick="setBlackCard(' + index + ')" class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(handcard) + '" width="100" id= "' + index + '">');

    }else {
      $('#handCard').append('<img onclick="setCard(' + index + ')" class="img-fluid handCards" src="../assets/images/pics/cards/' + setCardPicPath(handcard) + '" width="100" id= "' + index + '">');
    }
    index = index + 1;
  })
}

async function setBlackCard(cardIndex) {
  //$('#mainGame').css('visibility', 'collapse');
  $('#mainGame').empty();
  $('#wishGame').css('visibility', 'visible');
  wishValue = cardIndex;
}


async function setWishColor(color) {
  wishColor = color;
  setCard(wishValue + " " + wishColor);

}

function setCard(cardIndex) {

  if (callUno === false) {
    $.ajax({
      method: 'GET',
      url: '/set/' + cardIndex,
      dataType: 'text',

      success: () => {
        loadJson();
      },
      error: () => {
        alert('Could not get card!');
      }
    });
  }
  else {
    $.ajax({
      method: 'GET',
      url: '/call/' + cardIndex,
      dataType: 'text',

      success: () => {
          loadJson();
      },
      error: () => {
          alert('Could not set card!');
      }
  });
  }
}

function getCard() {
  $.ajax({
    method: 'GET',
    url: '/get',
    dataType: 'text',

    success: () => {
      loadJson();
    },
    error: () => {
      alert('Could not get card!');
    }
  });
}

async function clickUno() {
  if (callUno === true) {
    callUno = false;
    $('#unoCall').attr('src', "assets/images/pics/UNO_Logo.png")
  }
  else {
    callUno = true;
    $('#unoCall').attr('src', "assets/images/pics/CallUno.png")
  }
}


function connectWebSocket() {
  let websocket = new WebSocket("ws://localhost:9000/websocket");
  websocket.setTimeout

  websocket.onopen = function(event) {
      console.log("Connected to Websocket");

      $.ajax({
          method: 'GET',
          url: '/json',
          dataType: 'json',

          success: (result) => {
              loadGame(result);
          },
          error: () => {
              alert('Could not load Json!');
          }
      });
  }
  websocket.onclose = function () {
        console.log('Connection with Websocket Closed!');
  };

    websocket.onerror = function (error) {
        console.log('Error in Websocket Occured: ' + error);
  };

  websocket.onmessage = function (e) {
      let json = JSON.parse(e.data);
      loadGame(json);
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
  else if (card.includes("4+ColorSwitch")) {
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