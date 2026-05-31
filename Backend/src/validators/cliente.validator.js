import Joi from 'joi';

export const criarClienteSchema = Joi.object({
  nome: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().min(8).required(),
  nascimento: Joi.date().iso().optional(),
  dataNascimento: Joi.date().iso().optional(),
  status: Joi.string().valid('ativo', 'inativo', 'Ativo', 'Inativo').optional()
}).or('nascimento', 'dataNascimento');

export const atualizarClienteSchema = Joi.object({
  nome: Joi.string().min(3).optional(),
  email: Joi.string().email().optional(),
  telefone: Joi.string().min(8).optional(),
  nascimento: Joi.date().iso().optional(),
  dataNascimento: Joi.date().iso().optional(),
  status: Joi.string().valid('ativo', 'inativo', 'Ativo', 'Inativo').optional()
});
