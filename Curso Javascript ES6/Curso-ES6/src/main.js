import api from './api';

class App {
  constructor() {
    this.repositories = [];
  
    this.formEl = document.getElementById('repo-form');
    this.inputEl = document.querySelector('input[name=repository');
    this.listEl = document.getElementById('repo-list');

    this.registerHandlers();
  }

  registerHandlers() {
    this.formEl.onsubmit = event => this.addRepository(event);
  }

  setloading(loading = true) {
    if (loading === true) {
      let loadingEl = document.createElement('span');
      loadingEl.appendChild(document.createTextNode('Carregando...'));
      loadingEl.setAttribute('id', 'loading');
    
      this.formEl.appendChild(loadingEl);
    } else {
      document.getElementById('loading').remove();
    }
  }

  async addRepository(event) {
    event.preventDefault();

    const repoInput = this.inputEl.value;

    if (repoInput.length === 0)
      return;

    this.setloading();

    try {
      const response = await api.get(`/users/${repoInput}`);

      const { name, bio, avatar_url, html_url } = response.data;
  
      this.repositories.push({
        name,
        bio,
        avatar_url,
        html_url, 
      });
  
      this.inputEl.value = '';

      this.render();
    } catch (err) {
      alert('ERROR API');
    }

    this.setloading(false);
  }

  render() {
    this.listEl.innerHTML = '';

    this.repositories.forEach(repo => {
      let imgEl = document.createElement('img');
      imgEl.setAttribute('src', repo.avatar_url);

      let titleEl = document.createElement('strong');
      titleEl.appendChild(document.createTextNode(repo.name));

      let bioEl = document.createElement('p');
      bioEl.appendChild(document.createTextNode(repo.bio));

      let linkEl = document.createElement('a');
      linkEl.setAttribute('target', '_black');
      linkEl.setAttribute('href', repo.html_url);
      linkEl.appendChild(document.createTextNode('Acessar'));

      let listItemEl = document.createElement('li');
      listItemEl.appendChild(imgEl);
      listItemEl.appendChild(titleEl);
      listItemEl.appendChild(bioEl);
      listItemEl.appendChild(linkEl);

      this.listEl.appendChild(listItemEl);
    });
  }
}

new App();