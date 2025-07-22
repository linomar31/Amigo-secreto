let amigos = [];
let amigosSorteados = [];
let nomeSorteado = null; // Stores the currently displayed sorted name

// Display the tutorial message on page load
document.addEventListener('DOMContentLoaded', () => {
    alterarTexto('h2', 'TUTORIAL - Insira nomes de amigos no campo em branco, pressione ADICIONAR ou a tecla ENTER. Após preenchido os nomes, pressione o botão "Sortear amigo". O nome do amigo sorteado permanecerá exibido na tela até você pressionar a tecla ESC. Atualize a página para novo sorteio.');
    document.getElementById('sortear').setAttribute('disabled', true); // Disable sort button initially
    document.getElementById('retornar').setAttribute('disabled', true); // Disable return button initially
});

function adicionarAmigo() {
    let nome = document.getElementById("amigo").value.trim();

    if (!isNaN(nome) || nome === "") {
        alterarTexto('h2', 'É necessário inserir um nome válido.');
    } else if (amigos.includes(nome)) {
        alterarTexto('h2', `"${nome}" já está na lista. Por favor, insira um nome diferente.`);
    } else {
        amigos.push(nome);
        alterarTexto('h2', `Você adicionou "${nome}" à sua lista do amigo secreto.`);
        atualizarLista();
        if (amigos.length > 0) {
            document.getElementById('sortear').removeAttribute('disabled');
        }
    }
    limparCampo();
}

function atualizarLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    limparLista(); // Clear existing list items

    if (amigos.length === 0) {
        let item = document.createElement("li");
        item.textContent = "Nenhum amigo adicionado ainda.";
        listaAmigos.appendChild(item);
    } else {
        amigos.forEach(function(amigo) {
            let item = document.createElement("li");
            item.textContent = amigo;
            listaAmigos.appendChild(item);
        });
    }
}

function sortearAmigo() {
    if (amigos.length > 0) {
        // Clear any previous sorted name display before a new sort
        let resultadoElement = document.getElementById("resultado");
        if (resultadoElement) {
            resultadoElement.innerHTML = "";
        }

        let nomeAleatorio = Math.floor(Math.random() * amigos.length);
        let sorteado = amigos[nomeAleatorio];
        nomeSorteado = sorteado; // Store the sorted name

        // Display the sorted name prominently
        alterarTexto('h2', `O seu amigo secreto é: <span id="nomeSorteadoExibido">${sorteado}</span>.`);
        alterarTexto('p', 'Pressione ESC para limpar o nome sorteado e continuar o sorteio. Caso você tire seu próprio nome, clique em "Retornar".');

        amigosSorteados.push(sorteado);
        amigos.splice(nomeAleatorio, 1);
        atualizarLista(); // Update the list to show remaining friends

        if (amigosSorteados.length > 0) {
            document.getElementById('retornar').removeAttribute('disabled');
        }

        if (amigos.length === 0) {
            document.getElementById('sortear').setAttribute('disabled', true);
            alterarTexto('h2', `O seu amigo secreto é: <span id="nomeSorteadoExibido">${sorteado}</span>. Não existem mais nomes possíveis para serem sorteados.`);
            alterarTexto('p', 'Pressione ESC para limpar o nome sorteado. Todos os amigos foram sorteados.');
        }
    } else {
        alterarTexto('h2', 'Por favor, adicione amigos antes de sortear.');
    }
}

function retornarAmigos() {
    if (amigosSorteados.length === 0) return;

    let sorteado = amigosSorteados.pop();
    amigos.push(sorteado);
    atualizarLista();

    alterarTexto('h2', `Você devolveu o nome "${sorteado}" para a lista de amigos disponíveis.`);
    alterarTexto('p', 'Pressione ESC para limpar o nome sorteado e continuar o sorteio. Caso você tire seu próprio nome, clique em "Retornar".');


    if (amigosSorteados.length === 0) {
        document.getElementById('retornar').setAttribute('disabled', true);
    }
    document.getElementById('sortear').removeAttribute('disabled'); // Re-enable sort button if it was disabled
}

function alterarTexto(tag, texto) {
    document.querySelector(tag).innerHTML = texto; // Use innerHTML to allow for span in sorted name
}

function limparLista() {
    let listaAmigos = document.getElementById("listaAmigos");
    listaAmigos.innerHTML = "";
}

function limparCampo() {
    let nomes = document.getElementById("amigo");
    nomes.value = "";
    nomes.focus(); // Keep focus on the input field for quick adding
}

// Event listener for "Enter" key in the input field
document.getElementById('amigo').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent default form submission if any
        adicionarAmigo();
    }
});

// Event listener for "Escape" key to clear the sorted name
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && nomeSorteado) {
        let h2Element = document.querySelector('h2');
        let pElement = document.querySelector('p');

        // Restore initial state or prompt for next action
        if (amigos.length === 0 && amigosSorteados.length > 0) {
             alterarTexto('h2', 'Todos os amigos foram sorteados!');
             alterarTexto('p', 'Para começar um novo sorteio, atualize a página.');
        } else if (amigos.length > 0) {
            alterarTexto('h2', 'Clique em "Sortear Amigo" para continuar o sorteio.');
            alterarTexto('p', 'Caso você tire seu próprio nome, clique em "Retornar"');
        } else {
            // This case handles when the list is empty initially and Escape is pressed
            alterarTexto('h2', 'TUTORIAL - Insira nomes de amigos no campo em branco e em seguida pressione o botão ADICIONAR ou a tecla ENTER. Após preenchido os nomes dos amigos, pressione o botão SORTEAR. Finalmente, o nome do amigo sorteado aleatoriamente será exibido na tela e permanecerá visível até você pressionar a tecla ESC.');
            alterarTexto('p', ''); // Clear any previous p tag content
        }
        nomeSorteado = null; // Clear the stored sorted name
    }
});
