import { NextFunction, Request, Response, Router} from 'express';
import { listaLivros, getCupom } from './action';

export const router = Router();

router.get('/', listaLivros);
router.get('/getCupom', getCupom);
