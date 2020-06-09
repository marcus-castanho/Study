var inputElement = document.getElementById('input');
var btnElement = document.getElementById('btn');
var listElement = document.getElementById('repolist')
var userdata;

function searchuser() {
    listElement.innerHTML = '';

    var user = inputElement.value;
    axios.get(`https://api.github.com/users/${user}/repos`)
        .then(function (response) {
            console.log(response);
            userdata = response;
            console.log(userdata.data);

            var listTitle = document.createTextNode(`Os repositórios de ${user} são:`)
            listElement.appendChild(listTitle)

            for (var repo of userdata.data) {
                var listIitem = document.createElement('li');
                var textItem = document.createTextNode(repo.name);

                listIitem.appendChild(textItem);
                listElement.appendChild(listIitem);
            }
        })
        .catch(function (error) {
            console.log(error);
            window.alert('Digite um usuário válido')
        })
    inputElement.value = '';
}
