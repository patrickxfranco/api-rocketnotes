# API Rocketnotes
Este projeto foi utilizado para aprender sobre a criação de API's com Node.JS.
<br><br>
## O projeto faz o uso das seguintes bibliotecas:
- Express;
- Nodemon
- Knex
- SQLite
- SQLite3
- Express Async Errors
- BCryptJS
<br><br>
## Como executar o projeto?
- Abra o diretório que deseja e no terminal, insira o seguinte comando: `git clone git@github.com:patrickxfranco/api-rocketnotes.git`;
- Abra o diretório raiz do projeto;
- Instale as dependências do projeto digitando no terminal o seguinte comando: `npm install`;
- Execute o projeto digitando no terminal o seguinte comando: `npm run dev`;
- Execute as migrations do banco de dados digitando o seguinte comando no terminal: `npm run migrate`;
<br><br>
Neste momento a API já estará rodando em sua porta 3000, para alterar a porta, basta acessar o caminho `/source/server.js` e alterar o valor da variável `PORT` para a porta que deseja.
<br><br>
Dentro dos arquivos do diretório `/requests/` existem todos as URL's utilizadas para executar as funções da API. Recomendo a utilização da extensão [Rest Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) para executar essas requisições.
