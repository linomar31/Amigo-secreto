alert('TUTORIAL - Insira nomes de amigos no campo em branco e em seguida pressione o botão ADICIONAR; Após preenchido os nomes dos amigos, pressione o botão SORTEAR; Finalmente será exibido na tela o nome do amigo sorteado aleatoriamente.');

let amigos = [];
let amigosSorteados = [];
let nomeSorteado = null;

function adicionarAmigo() {
    let nome = document.getElementById("amigo").value.trim();
    if (!isNaN(nome) || nome === "" || amigos.includes(nome)) {
        alert ('É necessário inserir um nome válido e não repetido.');
        limparCampo();
    } else {
        amigos.push(nome);
        alterarTexto('h2', `Você adicionou ${nome} à sua lista do amigo secreto.`);
        limparCampo();
        atualizarLista();
    }
    if (amigos.length > 0) {
        document.getElementById('sortear').removeAttribute('disabled');
    }
}

function atualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    limparLista();
    amigos.forEach(function(amigo) {
        let item = document.createElement("li");
        item.textContent = amigo;
        listaAmigos.appendChild(item);
    });
}

function sortearAmigo() {
    if (amigos.length > 0) {
        limparLista();
        let nomeAleatorio = Math.floor(Math.random() * amigos.length);
        let sorteado = amigos[nomeAleatorio];
        nomeSorteado = sorteado;
        alterarTexto('h2', `O seu amigo secreto é: ${sorteado}.`);
        setTimeout(function() {
            alterarTexto('h2', 'Clique em "Sortear Amigo" para continuar o sorteio.');
        }, 3000);
        amigosSorteados.push(sorteado);
        amigos.splice(nomeAleatorio, 1);
        alterarTexto('p', 'Caso você tire seu próprio nome, clique em "Retornar"');
        if (amigosSorteados.length > 0) {
            document.getElementById('retornar').removeAttribute('disabled');
        }
        if (amigos.length === 0) {
            document.getElementById('sortear').setAttribute('disabled', true);
            alterarTexto('h2', 'Não existem mais nomes possíveis para serem sorteados');
            alterarTexto('p', '');
        }
    }
}

function retornarAmigos() {
    if (amigosSorteados.length === 0) return;
    let sorteado = amigosSorteados.pop();
    alterarTexto('h2', `Você devolveu o nome ${sorteado} para a lista de amigos disponíveis.`);
    alterarTexto('p', '');
    amigos.push(sorteado);
    atualizarLista();
    if (amigosSorteados.length === 0) {
        document.getElementById('retornar').setAttribute('disabled', true);
    }
}

function alterarTexto(tag, texto) {
    document.querySelector(tag).innerText = texto;
}

function limparLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";
}

function limparCampo() {
    let nomes = document.getElementById("amigo");
    nomes.value = "";
}

// ESC para limpar sorteado na tela
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && nomeSorteado) {
        let resultadoElement = document.getElementById("resultado");
        resultadoElement.innerHTML = "";
        nomeSorteado = null;
    }
});
