## Back-end da aplicação do projeto de API - 2023-2

### Modelo de dados da aplicação

De acordo com os requisitos do cliente chegou-se ao seguinte modelo de dados.

![](https://github.com/arleysouza/api-2023-2-2dsm-back/blob/master/public/images/modelo-bd.png)

### Como utilizar

Tutorial para instalar:
```
# Baixe este repositório ou clone pelo Git usando o comando:
$ git clone https://github.com/arleysouza/api-2023-2-2dsm-back.git servidor

# Acesse a pasta do projeto
$ cd servidor

# instale as dependências
$ yarn install
      ou
$ npm install
```

Forneça os dados de conexão com o BD no arquivo `.env`:
```
PORT = 3001
DATABASE = bdapi
BDUSERNAME = postgres
PASSWORD = 123
FOLDERPHOTOS = ../../public/photos
```

Criar a migração no BD:
```
# gerar o arquivo de migração com os comandos SL
$ npm run migration:generate

# submeter as migrações no SGBD
$ npm run migration:run
```

Na figura a seguir estão os passos para carregar um registro na tabela photos usando o Thunder Client do VS Code:
![](https://github.com/arleysouza/api-2023-2-2dsm-back/blob/master/public/images/file-upload-thunder-client.png)

Para ver a foto no navegador use a URL a seguir, apenas mude o nome do arquivo:
http://localhost:3001/foto/public/1694291669768-561761172.png