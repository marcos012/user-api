import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const authConfig = require('../../config/auth.json');

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    console.log(authHeader);
    
    if (!authHeader)
        return res.status(401).send({ 'Erro': 'Token não encontrado' });
        
    const parts = authHeader.split(' ');

    if (parts.length !== 2) 
        return res.status(401).send({ 'Erro': 'Token com erro' });

    if (!/^Bearer$/i.test(parts[0]))
        return res.status(401).send({ 'Erro': 'Token mal formatado' });

        
    jwt.verify(parts[1], authConfig.secret, (err: any, decoded: any) => {
        if (err) return res.status(401).send({ 'Erro': 'Token inválido' });

        (req as any).userId = decoded.id;

        return next();
    })
}
