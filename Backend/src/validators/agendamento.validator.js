import Joi from 'joi'

export const agendamentoSchema = Joi.object({
  clienteId: Joi.string().uuid().required(),
  profissionalId: Joi.string().uuid().required(),
  salaId: Joi.string().uuid().required(),
  servicoId: Joi.string().uuid().required(),
  data: Joi.string().pattern(/^\d{4}-\d{2}-\d{2}$/).required().messages({
    'string.pattern.base': 'Data em formato inválido',
    'any.required': 'Data é obrigatória',
    'string.empty': 'Data é obrigatória',
  }),
  horaInicio: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
    'string.pattern.base': 'Hora de início em formato inválido',
    'any.required': 'Hora de início é obrigatória',
    'string.empty': 'Hora de início é obrigatória',
  }),
  status: Joi.string().valid('Pendente', 'Confirmado', 'Cancelado', 'Finalizado').default('Pendente'),
  observacoes: Joi.string().allow('', null),
})

