import axios from 'axios';

// Todos os exercícios abaixo necessitam que você esteja com o plugin do Async/Await do Babel e o
// babel-polyfill devidamente configurados. Em alguns exercícios é necessário instalar o Axios.

const delay = () => new Promise(resolve => setTimeout(resolve, 1000));

const umPorSegundo = async () => {
  console.log(await delay());
  console.log(await delay());
  console.log(await delay());
}

umPorSegundo();

// Essa função só funciona com a instalação do axios e babel-polyfill.

async function getUserFromGithub(user) {
  try {
    const response = await axios.get(`https://api.github.com/users/${user}`);
    console.log(response.data);
  } catch (err) {
    console.log('Error na API');
  }
}

getUserFromGithub('diego3g');
getUserFromGithub('diego3g124123');

class Github {
  static async getRepositories(repo) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}`);
      console.log(response.data);
    } catch (error) {
      console.log('Error na API');
    }
  } 
} 

Github.getRepositories('rocketseat/rocketseat.com.br');
Github.getRepositories('rocketseat/dslkvmskv');

const buscaUsuario = async (usuario) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${usuario}`);
    console.log(response.data);
  } catch (err) {
    console.log('Error na API');
  }
}
buscaUsuario('diego3g');
