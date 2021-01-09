console.log('1 Questao');

class Usuario { 
  constructor(email, senha) {
    this.email = email;
    this.senha = senha;
    this.admin = false;
  }

  isAdmin() {
    return this.admin;
  }
}

class Admin extends Usuario {
  constructor() {
    super();

    this.admin = true;
  }
}

const user = new Usuario("email@teste.com", "senha123");
const adm = new Admin("email@teste.com", "senha123");

console.log(user.isAdmin());
console.log(adm.isAdmin());
console.log('2 Questao');

const usuarios = [
  {
    nome: 'Diego',
    idade: 23,
    empresa: 'Rocketseat'
  },
  {
    nome: 'Gabriel',
    idade: 15,
    empresa: 'Rocketseat'
  },
  {
    nome: 'Lucas',
    idade: 30,
    empresa: 'Facebook'
  },
];

const idades = usuarios.map(user => user.idade);

const empregados = usuarios.filter(user => {
  return user.idade > 18 && user.empresa === 'Rocketseat';
});

const job = usuarios.find(user => user.empresa === 'Google');

const less50 = () => {
  const up = usuarios.map(user => {
    user.idade *= 2;
    return user;
  });
  
  const filterUp = up.filter(user => {
    return user.idade <= 50;
  });

  return filterUp;
}

console.log(idades);
console.log(empregados);
console.log(job);
console.log(less50());
console.log('3 Questao');

const arr = [1, 2, 3, 4, 5];
const usuario = { nome: 'Diego', idade: 23 };
const nomeUser = "Diego";
const idade = 23;

const newArr = arr.map(item => item + 10);

const mostraIdade = (usuario) => {
 return usuario.idade;
}

const mostraUsuario = (nomeUser = 'Diego', idade = 18) => {
  return { nomeUser, idade };
}

const promise = () => {
  return new Promise((resolve, reject) => {
    return resolve('Okay');
  })
}

const exePromise = async () => {
  console.log(await promise());
}

console.log(newArr);
console.log(mostraIdade(usuario));
console.log(mostraUsuario(nomeUser, idade));
console.log(mostraUsuario(nomeUser));
exePromise();
console.log('4 Questao');

const empresa = {
  nome: 'Rocketseat',
  endereco: {
  cidade: 'Rio do Sul',
  estado: 'SC',
  }
};

const { nome, endereco: { cidade, estado } } = empresa;

function mostraInfo({ nome, idade }) {
  return `${nome} tem ${idade} anos.`;
}

console.log(nome);
console.log(cidade);
console.log(estado);
console.log(mostraInfo(usuario));
console.log('5 Questao');

const arr2 = [1, 2, 3, 4, 5, 6];
const usuarioSpread = {
  nome: 'Diego',
  idade: 23,
  endereco: {
  cidade: 'Rio do Sul',
  uf: 'SC',
  pais: 'Brasil',
  }
};
 
const [ x, ...y ] = arr; 

function soma(...params) {
  return params.reduce((full, next) => full + next);
}

const usuarioSpread2 = {
  ...usuarioSpread,
  nome: 'Gabriel',
}

const usuarioSpread3 = {
  ...usuarioSpread,
  endereco: {
    ...usuarioSpread.endereco,
    cidade: 'Lontras',
  },
} 

console.log(x);
console.log(y);
console.log(soma(2, 4, 34, 5, 26, 65));
console.log(usuarioSpread2);
console.log(usuarioSpread3);
console.log('6 Questao');

const usuario6 = 'Diego';
const idade6 = 23;

console.log(`O usuario ${usuario6} possui ${idade6} anos.`);
console.log('7 Questao');

const nome7 = 'Diego';
const idade7 = 23;

const usuario7 = {
  nome7,
  idade7,
  cidade: 'Rio do Sul',
};

console.log(usuario7);
