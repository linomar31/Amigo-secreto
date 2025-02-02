alert ('Atenção! - Clique em sortear apenas quando TODOS os nomes já tiverem sidos inseridos, pois a lista de nomes será ocultada assim que o sorteio começar e não será mais possível verificar os nomes inseridos.')

// Arrays que armazenarão os amigos sorteados.
let amigos = [];
let amigosSorteados =[];

//Adiciona um amigo a lista quando o botão "Adicionar" é utilizado
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

//Atualiza a lista com os nomes já inseridos para sorteio
function atualizarLista() {
    limparLista()
    amigos.forEach(function(amigo) {
        let item = document.createElement("li");
        item.textContent = amigo;
        listaAmigos.appendChild(item);
    });
}

//Sorteia um nome aleatório dentro do Array de amigos e move esse nome para o array secundário.
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

//Adiciona o botão de retorno caso a pessoa pegue a sí mesma

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

//Altera o texto da line <h2> do HTML de forma dinamica
function alterarTexto(tag, texto) {
    document.querySelector(tag).innerText = texto;
}

//Limpa/oculta a lista de nomes exibidas na tela
function limparLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";
}

//Limpa o campo de "colocar nome"
function limparCampo() {
    nomes = document.getElementById("amigo");
    nomes.value = "";
}

