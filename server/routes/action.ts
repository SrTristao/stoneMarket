import { NextFunction, Request, Response }  from 'express';
import * as serviceLivros from '../service/api';
import { Livros } from '../model/Livros';

export async function listaLivros(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        const result = await serviceLivros.listaLivros();        
        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}

export async function findById(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        const result = await serviceLivros.findById(req.query.id);
        if (result) 
            res.status(200).send(result);
        else
            res.status(200).send('Livro não encontrado.');
    } catch (err) {
        next(err);
    }
}

export async function remover() {        
   
}

export async function adicionar() {    
    
}