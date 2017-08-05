import { NextFunction, Request, Response, Router} from 'express';
import { listaLivros, findById, remover, adicionar } from './action';

export const router = Router();

router.get('/', listaLivros);
router.get('/findById', findById);
router.delete('/remover', remover);
router.post('/adicionar', adicionar);
