import { Livros } from '../model/Livros';
import { Cupons } from '../model/Cupons';

let livros: Livros[] =  Livros.getLivros();
let cupons: Cupons[] = Cupons.getCupons();

//Retorna todos os livros.
export async function listaLivros() {
    return livros;
}

//Verifica o cupom valido para desconto.
export async function getCupom(cupom: string) {
    let cupomValido: Cupons;            
    
    for(let cup of cupons) {
        if (cup.cupom == cupom) {
            cupomValido = cup;            
        }        
    }

    return cupomValido;
}