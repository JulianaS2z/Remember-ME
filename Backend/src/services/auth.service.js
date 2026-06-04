import { findUserByEmail, findUserById, updateUser, updateUserPassword, createUser } from '../repositories/auth.repository.js'
import { comparePassword, hashPassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import { AppError } from '../utils/AppError.js'
import prisma from '../config/prisma.js'
import { env } from '../config/env.js'

function sanitizeUser(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  }
}

export async function forgotPassword(email) {
  const usuario = await findUserByEmail(email)
  if (!usuario) {
    throw new AppError('Email não encontrado', 404)
  }

  const token = signToken({ sub: usuario.id }, '1h')
  const resetLink = `${env.frontendUrl}/forgot-password?token=${token}`

  console.log('=================== RECUPERAÇÃO DE SENHA ===================')
  console.log(`Usuário: ${usuario.email}`)
  console.log(`Link de recuperação: ${resetLink}`)
  console.log('==========================================================')

  return {
    mensagem: 'Solicitação de recuperação enviada. Verifique sua caixa de entrada.'
  }
}

export async function authenticate(email, senha) {
  console.log('[AUTH SERVICE] authenticate start', { email })
  const usuario = await findUserByEmail(email)
  console.log('[AUTH SERVICE] usuario from db', { exists: !!usuario, id: usuario?.id })
  if (!usuario) return null

  const valid = await comparePassword(senha, usuario.senha)
  console.log('[AUTH SERVICE] comparePassword result', { valid })
  if (!valid) return null

  if (usuario.senha && !usuario.senha.startsWith('$2')) {
    const hashed = await hashPassword(senha)
    await updateUserPassword(usuario.id, hashed)
  }

  const token = signToken({ sub: usuario.id, perfil: usuario.perfil })
  console.log('[AUTH SERVICE] token generated length', token ? token.length : null)

  return {
    token,
    usuario: sanitizeUser(usuario),
  }
}

export async function getUserById(id) {
  return findUserById(id)
}

export async function updateUserProfile(id, data) {
  const usuario = await findUserById(id)
  if (!usuario) throw new AppError('Usuário não encontrado', 404)

  return updateUser(id, {
    nome: data.nome,
    email: data.email,
  })
}

export async function changeUserPassword(id, senhaAtual, novaSenha) {
  const usuario = await findUserById(id)
  if (!usuario) throw new AppError('Usuário não encontrado', 404)

  const valid = await comparePassword(senhaAtual, usuario.senha)
  if (!valid) throw new AppError('Senha atual incorreta', 400)

  const hashed = await hashPassword(novaSenha)
  return updateUserPassword(id, hashed)
}

export async function registerUser(email, nome, senha) {
  console.log('[AUTH SERVICE] registerUser request', { email, nome })
  const usuarioExistente = await findUserByEmail(email)
  if (usuarioExistente) {
    throw new AppError('Email já cadastrado', 400)
  }

  const hashedSenha = await hashPassword(senha)
  console.log('[AUTH SERVICE] hashedSenha created', { hashedLen: hashedSenha?.length })

  const usuario = await createUser({
    nome,
    email,
    senha: hashedSenha,
    perfil: 'cliente',
  })

  console.log('[AUTH SERVICE] new user created', { id: usuario.id, email: usuario.email })

  const token = signToken({ sub: usuario.id, perfil: usuario.perfil })
  console.log('[AUTH SERVICE] token generated length', token ? token.length : null)

  return {
    token,
    usuario: sanitizeUser(usuario),
  }
}
