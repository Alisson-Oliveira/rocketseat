var nomes = ["Alisson", "Diego", "Gabriel", "Lucas"];
      
var newAdd = document.querySelector('.newAdd');
var boxElement = document.querySelector('.box');
var listaElement = document.querySelector('ul');
var inputNome = document.querySelector('input');
var newButton = document.querySelector('.newButton');

newAdd.onclick = function () {
  if (inputNome.value !== "") {
    nomes.push(inputNome.value);  
    addNames(inputNome.value);
    inputNome.value = "";
    console.log(nomes);
  }
};

newButton.onclick = function() {
  var boxRed = document.createElement('div');
  
  boxRed.style.marginRight = '5px';
  boxRed.style.marginTop = '2.5px';
  boxRed.style.marginLeft = '10px';
  boxRed.style.marginBottom = '2.5px';
  boxRed.style.width = '50px';
  boxRed.style.height = '50px';
  boxRed.style.backgroundColor = 'red';

  boxRed.onmouseover = function() {
    boxRed.style.backgroundColor = getRandomColor();
  };

  boxElement.appendChild(boxRed);
};

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function addNames(name){
  var liElment = document.createElement('li');
  var textElement = document.createTextNode(name);

  liElment.appendChild(textElement);
  listaElement.appendChild(liElment);
};

for (nome of nomes){
  addNames(nome);
}
