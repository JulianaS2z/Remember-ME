import Joi from 'joi';

export const criarServicoSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  duracaoMin: Joi.number().integer().min(1).required(),
  preco: Joi.number().positive().required()
});
