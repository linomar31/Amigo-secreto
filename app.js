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

    // Adicionar o nome à lista de amigos na interface
    const friendsList = document.getElementById('friendsList');
    const listItem = document.createElement('li');
    listItem.textContent = friendName;
    friendsList.appendChild(listItem);

    // Limpar o campo de entrada
    input.value = '';
}//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
