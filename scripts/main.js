var tempoDeVisualizacao = 2;
var countPOints = 0;

// array com os cards a serem memorizados e virados
var cartas = [
    { 'id': 0, 'imagem': "red" },
    { 'id': 1, 'imagem': "orange" },
    { 'id': 2, 'imagem': "green" },
    { 'id': 3, 'imagem': "blue" },
    { 'id': 4, 'imagem': "purple" }
    ];

var cardsUsados = [];//array que será preenchido com os cards que o usuario clicou

var cardsDoUsuario = [];

var parOK = false; // variável usada para validar se acertou ou não


var windowLoad = function () {
	if(localStorage.getItem('total-game-memorize') == null){ //quando carregar a pagina verifica no local storage do browser quantos pontos o player já tem
		countPOints = 0; //se total total-game-memorize for = nulo a contagem de pontos recebe 0, se não, recebe um número inteiro
	}else{
		countPOints = parseInt(localStorage.getItem('total-game-memorize'));
    }

function startGame() {

    var keyPreencheu = false;

    for (var i = 0; i < 10; i++) { //loop de 10 voltas

        while (keyPreencheu == false) { //enquanto keyPreencheu for false siga em frente.

            var rand = parseInt((Math.random() * 4).toFixed(0));//sorteia um numero inteiro só nao entendi pq é x4

            var cardEscolhido = cardsUsados.filter(a => a.id == cartas[rand].id);//filtra dentro do array o id do card escolhido

            if (cardEscolhido.length < 2) {

                cardsUsados.push({ 'id': cartas[rand].id, 'idDiv': i });//armazena dentro de cards usados o que o player escolheu

                document.getElementById('btn_img' + i).style.background = cartas[rand].imagem; //adiciona o objeto imagem do array cartas
                document.getElementById('btn_img' + i).innerHTML = cartas[rand].imagem;

                console.log(cardEscolhido);

                keyPreencheu = true;
            }
        }

            keyPreencheu = false;

        }

        setTimeout(function () {
            viraCards();
			document.getElementById('block-click').style.display = 'none';
        }, tempoDeVisualizacao * 1000);

    };

        startGame();


        }

    function viraCards() {
        for (var i = 0; i < 10; i++) {

            document.getElementById('btn_img' + i).style.background = 'white';
            document.getElementById('btn_img' + i).innerHTML = '';

        }
			
			escreve(countPOints + ' pts');
        }

    function viraCardUnidade(div) {
        var card = cardsUsados[div];
        document.getElementById('btn_img' + card.idDiv).style.background = cartas.find(a => a.id == card.id).imagem;
        document.getElementById('btn_img' + card.idDiv).innerHTML = cartas.find(a => a.id == card.id).imagem;
		document.getElementById('btn_img' + card.idDiv).removeAttribute("onclick");
        if (cardsDoUsuario.length == 0) {
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
            return;
        }
        if (cardsDoUsuario.length == 9) {
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
			countPOints = (countPOints + 10);
            escreve('VC VENCEU - ' + countPOints + ' pts');
			localStorage.setItem('total-game-memorize', countPOints);
			document.getElementById('block-click').style.display = 'block';
            return;
        }
        if (cardsDoUsuario.filter(a => a == card.id).length == 1 && cardsDoUsuario[cardsDoUsuario.length - 1] == card.id) {
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
            parOK = true;
            return;
        }
        if (cardsDoUsuario.filter(a => a == card.id).length == 1 && cardsDoUsuario[cardsDoUsuario.length - 1] != card.id && parOK == false) {
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
			viraCardTodos();
            escreve('PERDEU - ' + countPOints + ' pts');
			countPOints = 0;
			localStorage.setItem('total-game-memorize', countPOints);
            return;
        }
        if (cardsDoUsuario.filter(a => a == card.id).length == 0 && cardsDoUsuario[cardsDoUsuario.length - 1] != card.id && parOK == false) {
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
			viraCardTodos();
            escreve('PERDEU - ' + countPOints + ' pts');
			countPOints = 0;
			localStorage.setItem('total-game-memorize', countPOints);
            return;
        }

            parOK = false;
            cardsDoUsuario.push(card.id);
            console.log(cardsDoUsuario);
    }
		
	function viraCardTodos() {
		setTimeout(function () {
			for (var i = 0; i < 10; i++) {
				document.getElementById('btn_img' + cardsUsados[i].idDiv).style.background = cartas.find(a => a.id == cardsUsados[i].id).imagem;
				document.getElementById('btn_img' + cardsUsados[i].idDiv).innerHTML = cartas.find(a => a.id == cardsUsados[i].id).imagem;
				document.getElementById('btn_img' + cardsUsados[i].idDiv).removeAttribute("onclick");
				document.getElementById('block-click').style.display = 'block';
			}
		},500);
	}
		
	function escreve(text){
		document.getElementById('lbl_result').innerHTML = text;
	};