import { Livros } from '../model/Livros';
import { Cupons } from '../model/Cupons';

let livros: Livros[] =  Livros.getLivros();
let carrinho: Livros[];
let cupons: Cupons[] = Cupons.getCupons();

//Retorna todos os livros.
export async function listaLivros() {
    return livros;
}

//Retorna o livro desejado pelo Id.
export async function findById(id: number) : Promise<Livros> {    
    let livro: Livros;
    
    for(let l of livros) {
        if (l.id == id) {
            livro = l;   
            return l;
        }         
    }
    
    return livro;
}

//Remove o livro do carrinho.
export async function remover(livro: Livros) {        
    let result = false;
    carrinho = carrinho.map(this, param => {
        if (param.id != livro.id)
            return param;
    })
    //Procura o livro que foi removido do carrinho e soma no estoque novamente.
    livros.some(this, param => {
        if (param.id == livro.id) {
            param.qtde+= livro.qtde;
            result = true;
            return true
        }                
    });
    return result;
}

//Adiciona o livro no carrinho.
export async function adicionar(livro: Livros) {
    let estoque = false;
    //Procura o livro que será adicionado no carrinho, 
    //se a quantidade dele for maior ou igual ao estoque
    //o livro é adicionado, caso contrario não.
    livros.some(this, param => {
        if (param.id == livro.id) {
            if (param.qtde >= livro.qtde) {
                param.qtde-= livro.qtde;
                estoque = true
            }
            return true;
        }
    });  

    livro.precoTotal = livro.preco * livro.qtde;

    if (estoque) {
        carrinho.push(livro);
    }
    return livro;
}

//Verifica o cupom valido para desconto.
export async function verificaCupom(cupom: string) {
    let cupomValido: Cupons;
        
    cupomValido = cupons.find(this, param => {
        if (param.cupom == cupom) {            
            return true;
        }
    });

    //Se o cupom for valido, procura no carrinho se tem algum produto
    //com o/ou autor(es) validos no cupom para desconto.    
    if (cupomValido != null) {
        carrinho.forEach(this, livro => {                       
            cupomValido.autores.forEach(autor => {
                if (livro.autor == autor) {
                    livro.desconto = ((livro.precoTotal*cupomValido.desconto)/100);                    
                }
            })
        });
              
    }
}