## Market Book - Sistema de vendas

### <i class="icon-hdd"></i> Instalar e Executar

Para executar o projeto, precisamos instalar todas as dependências.
> npm install

### Executando server
O servidor irá ficar rondando na porta 3131, caso queira trocar mude no arquivo
server/config.t
 > - npm run start

### Executando front
O gulp foi configurado com browserify, então é viavel sempre executar com gulp dev.
 > - gulp dev

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

### app
	A pasta app é onde fica os arquivos de configuração.

###assets
	A pasta assets é onde fica as imagens, icones, js e css.

###components
	A pasta components é onde fica as telas, cada tela é separada por pasta onde contém seu html, controller, scss e service se necessário.

###lib
	A pasta lib fica as bibliotecas necessárias para que o sistema funcione.

###utils
	A pasta utils contém constantes, services ou qualquer outro arquivo que possa ser reutilizado em todo o sistema.