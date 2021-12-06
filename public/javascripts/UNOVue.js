const unoGame = Vue.createApp({})

unoGame.component('calluno_pullstack', {
    template:`
        <img src="../assets/images/pics/UNO_Logo.png" width="200" class="Pic_Center" id="unoCall" align="Right" onclick="clickUno()">
        <img src="../assets/images/pics/cards/Stack.png" width="100" class="Pic_Center" id="pullStack" onclick="getCard()">
    `,
});


const wishGame = Vue.createApp({})
wishGame.component('wishcards', {
    data() {
        return {
            title: 'Choose your wishcard!',
        }
    },
    template:`
        <div class="maincontent_Center">
        <p>{{title}}</p>
        <img src="../assets/images/pics/cards/Red_Radio.png" width="100" class="Pic_Center" onclick="setWishColor('red')">
        <img src="../assets/images/pics/cards/Green_Radio.png" width="100" class="Pic_Center" onclick="setWishColor('green')">
        <img src="../assets/images/pics/cards/Blue_Radio.png" width="100" class="Pic_Center" onclick="setWishColor('blue')">
        <img src="../assets/images/pics/cards/Yellow_Radio.png" width="100" class="Pic_Center" onclick="setWishColor('yellow')">
        </div>
    `,
});

unoGame.mount('#uno-GameFild')
wishGame.mount('#wishGame-GameField')

