import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import knex from '../../database/connection'
import Usuario from "../models/usuario";

const authConfig = require('../../config/auth.json');

export default class AuthController {
    async index(req: Request, res: Response) {
        const usuarios: Usuario[] = await knex('users').select('id', 'nome', 'email');

        if (!usuarios) {
            return;
        }

        return res.json(usuarios);
    }

    async show(req: Request, res: Response) {
        const id = (req as any).userId;

        const usuario: Usuario = await knex('users').select('*').where('id', id).first();

        if (!usuario) {
            return;
        }

        const user = { ...usuario, senha: undefined }
        
        return res.json(user);
    }

    async create(req: Request, res: Response) {
        let { email, senha } = req.body;

        try {
            console.log('erro 1', senha);

            const usuarioExistente: Usuario = await knex('users').select('email').where('email', email).first();
            console.log('erro 2', senha);
            
            if (usuarioExistente) {
                return res.status(400).send({ error: "Usuario já existe no sistema" });
            }

            const hash = bcrypt.hashSync(senha, 10);
            senha = hash;
            console.log('erro 2', senha, hash);
    
            const usuario: Usuario = {
                ...req.body,
                senha
            }
    
            await knex('users').insert(usuario);
    
            const user = { ...usuario, senha: undefined }
            const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 84600, });

            return res.send({ user, token });
        } catch (e) {
            console.log('erro', e);
            
            return res.send(e);
        }
    }

    async signIn(req: Request, res: Response) {
        const { email, senha } = req.body;

        const usuario: Usuario = await knex('users').select('*').where('email', email).first();

        if (!usuario)
            return res.status(404).send({ error: "Usuario não existe" });

        if(!bcrypt.compareSync(senha, usuario.senha))
            return res.status(400).send({ error: "Senha incorreta" });
        
        const user = { ...usuario, senha: undefined }
        const token = jwt.sign({ id: user.id }, authConfig.secret, { expiresIn: 84600, });

        res.send({ user, token });
    }
}
