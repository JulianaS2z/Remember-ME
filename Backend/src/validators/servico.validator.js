import Joi from 'joi';

export const criarServicoSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  duracaoMin: Joi.number().integer().min(1).optional(),
  duracao: Joi.number().integer().min(1).optional(),
  preco: Joi.number().positive().required()
}).or('duracaoMin', 'duracao');

export const atualizarServicoSchema = Joi.object({
  nome: Joi.string().min(3).optional(),
  duracaoMin: Joi.number().integer().min(1).optional(),
  duracao: Joi.number().integer().min(1).optional(),
  preco: Joi.number().positive().optional()
});
