##Market Book - Sistema de vendas

### <i class="icon-hdd"></i> Instalar e Executar

Para executar o projeto, precisamos instalar todas as dependências.
> npm install

### Executando server
 > - npm run start
O servidor irá ficar rondando na porta 3131, caso queira trocar mude no arquivo
server/config.ts

### Executando front
 > - gulp dev
 O gulp foi configurado com browserify, então é viavel sempre executar com gulp dev.

###<i class="icon-folder-open"></i> Estrutura 
O sistema foi separado por 2 pastas.

### Server
    Contém um servidorzinho em nodeJS, com a seguinte estrutura.
    
> - middlewares
    > - model
    > - routes
    > - service
    app.ts
    config.ts    

### SRC
    Contém o front-end, com a seguinte estrutura.
        
   > - app
   > - assets
   > - components
   > - lib
   > - utils
  index.html
	    