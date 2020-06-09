var listElement = document.querySelector('#app ul');
var inputElement = document.querySelector('#app input');
var btnElement = document.querySelector('#app button');

var todos = JSON.parse(localStorage.getItem('lista_todos')) || ['Fazer café', 'Estudar Javascript', 'Acessar comunidade Rocketseat'];


btnElement.onclick = function gettodo() {
    var todotext = inputElement.value;
    todos.push(todotext);
    inputElement.value = '';
    rendertodos();
    savetoStorage();
}


function rendertodos() {
    listElement.innerHTML = '';
    for (todo of todos) {
        var listItem = document.createElement('li');
        var texto = document.createTextNode(todo);
        var linkElement = document.createElement('a');
        var linkText = document.createTextNode('Excluir')
        var pos = todos.indexOf(todo);

        linkElement.setAttribute('href', '#');
        linkElement.appendChild(linkText);
        linkElement.setAttribute('onclick', 'deletetodo(' + pos + ')')

        listItem.appendChild(texto)
        listItem.appendChild(linkElement)
        listElement.appendChild(listItem);
    }
}

function deletetodo(pos) {
    todos.splice(pos, 1);
    rendertodos();
    savetoStorage();
}
rendertodos();

function savetoStorage() {
    localStorage.setItem('list_todos', JSON.stringify(todos))
}
