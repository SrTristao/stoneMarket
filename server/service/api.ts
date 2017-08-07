import { Livros } from '../model/Livros';
import { Cupons } from '../model/Cupons';

let livros: Livros[] =  Livros.getLivros();
let cupons: Cupons[] = Cupons.getCupons();

//Retorna todos os livros.
export async function listaLivros() {        
    return livros.map(livro => {
        livro.capa = livro.titulo.replace(/[^0-9a-zA-Z ]/g,'');
        return livro;
    });
}

//Verifica o cupom valido para desconto.
export async function getCupom(param: string) {
    return cupons.find(cupom => {
        return cupom.cupom == param;
    });                
}