import { findUserByEmail, findUserById, updateUser, updateUserPassword } from '../repositories/auth.repository.js'
import { comparePassword, hashPassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import { AppError } from '../utils/AppError.js'

function sanitizeUser(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  }
}

export async function authenticate(email, senha) {
  const usuario = await findUserByEmail(email)
  if (!usuario) return null

  const valid = await comparePassword(senha, usuario.senha)
  if (!valid) return null

  const token = signToken({ sub: usuario.id, perfil: usuario.perfil })

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
