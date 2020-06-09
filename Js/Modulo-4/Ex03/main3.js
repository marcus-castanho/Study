var inputElement = document.getElementById('input');
var btnElement = document.getElementById('btn');
var listElement = document.getElementById('repolist')
var userdata;

/*function searchuser() {
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
}*/


function searchuser() {

    listElement.innerHTML = '';
    var user = inputElement.value;

    var minhaPromise = function () {
        return new Promise(function (resolve, reject) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', `https://api.github.com/users/${user}/repos`);
            xhr.send(null);

            xhr.onreadystatechange = function () {
                /*while (xhr.readyState != 4) {
                    var listTitle = document.createTextNode('Carregando...')
                    listElement.appendChild(listTitle)
                }*/
                console.log(xhr.readyState)
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.responseText));
                    }
                    else {
                        reject('Erro na requisição')
                    }
                }
            }
        });
    }

    minhaPromise()
        .then(function (response) {
            console.log(response);
            userdata = response;

            var listTitle = document.createTextNode(`Os repositórios de ${user} são:`)
            listElement.appendChild(listTitle)

            for (var repo of userdata) {
                var listIitem = document.createElement('li');
                var textItem = document.createTextNode(repo.name);

                listIitem.appendChild(textItem);
                listElement.appendChild(listIitem);
            }
        })
        .catch(function (error) {
            console.log(error)
        })
}