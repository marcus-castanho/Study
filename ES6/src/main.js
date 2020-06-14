import api from './api'

class app {
    constructor() {
        this.repositories = [];
        this.formElement = document.getElementById('repo-form');
        this.listElement = document.getElementById('repos-list');
        this.inputEl = document.querySelector('input[name=respository]');

        this.getEvent();
    }
    getEvent() {
        this.formElement.onsubmit = event => this.addRepos(event)
    }

    setLoading(loading = true) {
        if (loading === true) {
            let loadingEl = document.createElement('span');
            loadingEl.appendChild(document.createTextNode('Carregando...'));
            loadingEl.setAttribute('id', 'loading');

            this.formElement.appendChild(loadingEl);
        }
        else {
            document.getElementById('loading').remove();
        }
    }

    async addRepos(event) {
        event.preventDefault();

        const repoInput = this.inputEl.value;

        this.setLoading();

        if (repoInput.length === 0) {
            alert('Insira um repositório.');
            this.formElement.reset();
            //this.inputEl.value = '';
            this.setLoading(false)
            return;
        }

        try {
            const response = await api.get(`/repos/${repoInput}`);

            const { name, description, html_url, owner: { avatar_url } } = response.data

            this.repositories.push({
                name,
                description,
                avatar_url,
                html_url
            });

            this.formElement.reset();
            //this.inputEl.value = '';

            this.render();
        }
        catch (err) {
            alert('O repositório não existe.');
            this.formElement.reset();
            //this.inputEl.value = '';
        }

        this.setLoading(false);

    }
    render() {
        this.listElement.innerHTML = '';

        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);

            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));

            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.description));

            let linkEl = document.createElement('a');
            linkEl.setAttribute('target', '_blank');
            linkEl.appendChild(document.createTextNode('Acessar'));
            linkEl.setAttribute('href', repo.html_url)

            let listItem = document.createElement('li');
            listItem.appendChild(imgEl);
            listItem.appendChild(titleEl);
            listItem.appendChild(descriptionEl);
            listItem.appendChild(linkEl);

            this.listElement.appendChild(listItem);

        });
    }
}

new app;