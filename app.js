alert ('TUTORIAL - Insira nomes de amigos no campo em branco e em seguida pressionar o botão ADICIONAR; Após preenchido os nomes dos amigos, pressione o botão SORTEAR; Finalmente será exibido na tela o nome do amigo sorteado aleatoriamente.')

let amigos = [];
let amigosSorteados =[];

function adicionarAmigo() {
    let nome = document.getElementById("amigo").value.trim();
    if (!isNaN(nome) || nome === "" || amigos.includes(nome)) {
        alert ('É necessário inserir um nome válido e não repetido.');
        limparCampo();
    } else {
        amigos.push(nome);
        alterarTexto('h2',`Você adicionou ${nome} a sua lista do amigo secreto.`); 
        console.log(amigos);
        limparCampo();
        atualizarLista();
    }
    if (amigos.length > 0) {
        document.getElementById('sortear').removeAttribute('disabled');
    }
}

function atualizarLista() {
    limparLista()
    amigos.forEach(function(amigo) {
        let item = document.createElement("li");
        item.textContent = amigo;
        listaAmigos.appendChild(item);
    });
}

function sortearAmigo() {
    if (amigos.length > 0) {
        limparLista()
        let nomeAleatorio = Math.floor(Math.random() * amigos.length);
        console.log(amigos[nomeAleatorio]);
        alterarTexto('h2', `O seu amigo secreto é: ${amigos[nomeAleatorio]}.`);
        setTimeout(function() {
            alterarTexto('h2', 'Clique em "Sortear Amigo" para continuar o sorteio.');
        }, 3000); // Coloca um intervalo de 3 segundos para que o nome sorteado fique visível.
        amigosSorteados.push(amigos[nomeAleatorio]);
        console.log(amigosSorteados);
        amigos.splice(nomeAleatorio, 1);
        alterarTexto('p','Caso você tire seu próprio nome, clique em "Retornar"')
        if (amigosSorteados.length > 0) {
            document.getElementById('retornar').removeAttribute('disabled');
        }
  
    } else {
        document.getElementById('sortear').setAttribute('disabled', true);
        alterarTexto('h2','Não existem mais nomes possíveis para serem sorteados');
        alterarTexto('p','')
  
    }
    
}


function retornarAmigos() {
    let sorteado = amigosSorteados.pop();
    alterarTexto('h2',`Você devolveu o nome ${sorteado} para a lista de amigos disponíveis.`)
    alterarTexto('p','')
    amigos.push(sorteado);
    console.log(sorteado);
    console.log(amigos);
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
    nomes = document.getElementById("amigo");
    nomes.value = "";
}

let nomeSorteado = null; // Armazena o nome sorteado atual

function sortearAmigo() {
    if (listaAmigos.length === 0) return;
    const sorteado = listaAmigos[Math.floor(Math.random() * listaAmigos.length)];
    nomeSorteado = sorteado;
    resultadoElement.innerHTML = `<li class="nome-sorteado">${sorteado}</li>`;
}

// Ouve a tecla ESC para remover o nome sorteado da tela
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && nomeSorteado) {
        resultadoElement.innerHTML = "";
        nomeSorteado = null;
    }
});
