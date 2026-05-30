import Joi from 'joi';

export const criarSalaSchema = Joi.object({
  nome: Joi.string().min(2).required()
});
