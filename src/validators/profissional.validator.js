import Joi from 'joi';

export const criarProfissionalSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().min(8).required()
});

export const atualizarProfissionalSchema = Joi.object({
  nome: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  telefone: Joi.string().min(8).optional()
});
