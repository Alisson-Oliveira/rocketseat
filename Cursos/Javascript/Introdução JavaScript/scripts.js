var usuarios = [
  {
    nome: "Diego",
    habilidades: ["Javascript", "ReactJS", "Redux"]
  },
  {
    nome: "Gabriel",
    habilidades: ["VueJS", "Ruby on Rails", "Elixir"]
  }
];

var endereco = {
  rua: "Rua dos pinheiros",
  numero: 1293,
  bairro: "Centro",
  cidade: "São Paulo",
  uf: "SP"
};

var skills = ["Javascript", "ReactJS", "React Native"];
var anosEstudo = 7;

function getEnd(end) {
  return 'O usuário mora em '+ end.cidade +' / '+ end.uf +', no bairro '+ end.bairro +', na rua '+ end.rua +' com nº '+ end.numero +'.';
};

function pares(x, y) {
  var numbersPares = [];
  while (x < y) {
    if (x % 2 === 0) {
      numbersPares.push(x);
    }
    x += 1;
  }
  return numbersPares;
};

function temHabilidade(skills) {
  for (skill of skills) {
    if (skill.indexOf('Javascript')) { 
      return true;
    } else {
      return false;
    }
  }
};

function experiencia(anos) {
  if (anos == 0 && anos < 1) {
    return "Iniciante";
  } else if (anos >= 1 && anos < 3) {
    return "Intermediário";
  } else if (anos >= 3 && anos < 6) {
    return "Avançado";
  } else if (anos >= 7) {
    return "Jedi Master"; 
  } else {
    return "Sem experiência";
  }
}

function getHabilidades(hab) {
  for (user of usuarios) {
    console.log('O '+ user.nome +' possui as habilidades: '+ user.habilidades.join(", "));
  }
};

console.log(pares(12, 36));
console.log(getEnd(endereco));
console.log(temHabilidade(skills));
console.log(experiencia(anosEstudo));
getHabilidades(usuarios);
