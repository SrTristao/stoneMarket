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

export async function getCupom(req: Request, res: Response, next: NextFunction) : Promise<void> {
    try {
        const result = await serviceLivros.getCupom(req.query.cupom);
        res.status(200).send(result);
    } catch (err) {
        next(err);
    }
}