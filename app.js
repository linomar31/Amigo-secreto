let friends = [];

function addFriend() {
    const input = document.getElementById('friendName');
    const friendName = input.value.trim();

   
    if (friendName === '') {
        alert('Por favor, insira um nome.');
        return;
    }

    
    friends.push(friendName);

    
    atualizarListaAmigos();

   
    input.value = '';
}

function atualizarListaAmigos() {
    const friendsList = document.getElementById('friendsList');
    friendsList.innerHTML = ''; 

    for (let friend of friends) {
        const listItem = document.createElement('li');
        listItem.textContent = friend;
        friendsList.appendChild(listItem);
    }
}
