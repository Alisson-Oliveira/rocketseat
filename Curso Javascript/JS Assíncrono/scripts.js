var listElement = document.querySelector('ul');
var inputElement = document.querySelector('input');
var listRepo = document.querySelector('.listRepo');
var limpRepo = document.querySelector('.limpRepo');

function checaIdade(idade) {
  return new Promise(function(resolve, reject){
    setTimeout(function(){
      return idade >= 18 ? resolve() : reject();
    }, 2000);
  });
}

function renderRepositories(repositories){
  for (rep of repositories){
    var textElement = document.createTextNode(rep.name);
    var liElement = document.createElement('li');

    liElement.appendChild(textElement);
    listElement.appendChild(liElement);
  }
}

function renderRepositories(repositories) {
  listElement.innerHTML = "";

  for (rep of repositories) {
    var textElement = document.createTextNode(rep.name);
    var liElement = document.createElement('li');

    liElement.appendChild(textElement);
    listElement.appendChild(liElement);
  }
}

function renderLoading() {
  listElement.innerHTML = "";

  var textElement = document.createTextNode('Carregando...');
  var loadingElement = document.createElement('li');

  loadingElement.appendChild(textElement);
  listElement.appendChild(loadingElement);
}

function renderError() {
  listElement.innerHTML = "";

  var textElement = document.createTextNode('Erro!');
  var errorElement = document.createElement('li');

  errorElement.style.color = "#F00";
  errorElement.appendChild(textElement);
  listElement.appendChild(errorElement);
}

function listRepositories() {
  var user = inputElement.value;
  if (!user) return;
  renderLoading();
  axios.get('https://api.github.com/users/' + user + '/repos')
    .then(function (response) {
      renderRepositories(response.data);
    })
    .catch(function () {
      renderError();
    });
}

listRepo.onclick = function() {
  listRepositories();
}

limpRepo.onclick = function() {
  listElement.innerHTML = "";
  inputElement.value = "";
}

axios.get('https://api.github.com/users/Alisson-Oliveira')
  .then(function(response){
    console.log(response);
  })
  .catch(function(error){
    console.warn(error)
  });

checaIdade(15)
  .then(function() {
    console.log("Maior que 18");
})
  .catch(function() {
    console.log("Menor que 18");
});