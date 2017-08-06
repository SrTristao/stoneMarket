import { NextFunction, Request, Response, Router} from 'express';
import { listaLivros, findById, remover, adicionar } from './action';

export const router = Router();

router.get('/', listaLivros);
router.get('/:id', findById);
router.delete('/:remover', remover);
router.post('/:adicionar', adicionar);
