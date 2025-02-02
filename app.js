let friends = [];

function addFriend() {
    const input = document.getElementById('friendName');
    const friendName = input.value.trim();

    // Validar a entrada
    if (friendName === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    // Atualizar o array de amigos
    friends.push(friendName);

    // Atualizar a lista de amigos na interface
    atualizarListaAmigos();

    // Limpar o campo de entrada
    input.value = '';
}

function atualizarListaAmigos() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = ''; // Limpar a lista existente

    for (let friend of friends) {
        const listItem = document.createElement('li');
        listItem.textContent = friend;
        friendsList.appendChild(listItem);
    }
}
}//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
