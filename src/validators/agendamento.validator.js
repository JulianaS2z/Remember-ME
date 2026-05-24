import Joi from 'joi';

export const criarAgendamentoSchema = Joi.object({
  clienteId: Joi.string().uuid().required(),
  profissionalId: Joi.string().uuid().required(),
  salaId: Joi.string().uuid().required(),
  servicoId: Joi.string().uuid().required(),
  inicio: Joi.date().iso().required()
});
