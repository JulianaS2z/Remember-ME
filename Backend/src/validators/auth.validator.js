import Joi from 'joi'

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email obrigatório',
    'any.required': 'Email obrigatório',
  }),
  senha: Joi.string().min(6).required().messages({
    'string.min': 'Senha deve ter no mínimo 6 caracteres',
    'string.empty': 'Senha obrigatória',
    'any.required': 'Senha obrigatória',
  }),
})

export const updateProfileSchema = Joi.object({
  nome: Joi.string().trim().required().messages({
    'string.empty': 'Nome é obrigatório',
    'any.required': 'Nome é obrigatório',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Email inválido',
    'string.empty': 'Email obrigatório',
    'any.required': 'Email obrigatório',
  }),
})

export const changePasswordSchema = Joi.object({
  senhaAtual: Joi.string().min(6).required().messages({
    'string.min': 'Senha atual deve ter no mínimo 6 caracteres',
    'string.empty': 'Senha atual obrigatória',
    'any.required': 'Senha atual obrigatória',
  }),
  novaSenha: Joi.string().min(6).required().messages({
    'string.min': 'Nova senha deve ter no mínimo 6 caracteres',
    'string.empty': 'Nova senha obrigatória',
    'any.required': 'Nova senha obrigatória',
  }),
})
