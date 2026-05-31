import { authenticate, getUserById, updateUserProfile, changeUserPassword } from '../services/auth.service.js'

function userResponse(usuario) {
  return {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  }
}

export async function login(req, res, next) {
  try {
    const { email, senha } = req.body
    const result = await authenticate(email, senha)

    if (!result) {
      return res.status(401).json({ erro: 'Credenciais inválidas' })
    }

    return res.json({
      mensagem: 'Login realizado com sucesso',
      token: result.token,
      user: result.usuario,
    })
  } catch (error) {
    return next(error)
  }
}

export async function profile(req, res, next) {
  try {
    const usuario = await getUserById(req.user.sub)
    if (!usuario) {
      return res.status(404).json({ erro: 'Usuário não encontrado' })
    }

    return res.json({ user: userResponse(usuario) })
  } catch (error) {
    return next(error)
  }
}

export async function logout(req, res) {
  return res.json({ mensagem: 'Logout efetuado com sucesso' })
}

export async function updateProfile(req, res, next) {
  try {
    const usuario = await updateUserProfile(req.user.sub, req.body)
    return res.json({ user: userResponse(usuario) })
  } catch (error) {
    return next(error)
  }
}

export async function changePassword(req, res, next) {
  try {
    await changeUserPassword(req.user.sub, req.body.senhaAtual, req.body.novaSenha)
    return res.json({ mensagem: 'Senha alterada com sucesso' })
  } catch (error) {
    return next(error)
  }
}
