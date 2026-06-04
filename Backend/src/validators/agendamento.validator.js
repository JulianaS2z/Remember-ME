import Joi from 'joi'

export const agendamentoSchema = Joi.object({
  clienteId: Joi.string().uuid().required(),
  profissionalId: Joi.string().uuid().required(),
  salaId: Joi.string().uuid().required(),
  servicoId: Joi.string().uuid().required(),
  data: Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .custom((value, helpers) => {
      const scheduled = new Date(`${value}T00:00:00`);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (scheduled < today) {
        return helpers.error('date.past');
      }
      return value;
    })
    .messages({
      'string.pattern.base': 'Data em formato inválido',
      'any.required': 'Data é obrigatória',
      'string.empty': 'Data é obrigatória',
      'date.past': 'Data não pode ser anterior a hoje',
    }),
  horaInicio: Joi.string().pattern(/^\d{2}:\d{2}$/).required().messages({
    'string.pattern.base': 'Hora de início em formato inválido',
    'any.required': 'Hora de início é obrigatória',
    'string.empty': 'Hora de início é obrigatória',
  }),
  status: Joi.string().valid('Pendente', 'Confirmado', 'Cancelado', 'Finalizado').default('Pendente'),
  observacoes: Joi.string().allow('', null),
})

