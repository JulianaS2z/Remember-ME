import {
  criarProfissionalService,
  listarProfissionaisService,
  buscarProfissionalService,
  atualizarProfissionalService,
  setAtivoProfissionalService,
  deletarProfissionalService,
} from '../services/profissional.service.js'

export async function criarProfissional(req, res, next) {
  try {
    const profissional = await criarProfissionalService(req.body)
    return res.status(201).json(profissional)
  } catch (error) {
    return next(error)
  }
}

export async function listarProfissionais(req, res, next) {
  try {
    const profissionais = await listarProfissionaisService()
    return res.json(profissionais)
  } catch (error) {
    return next(error)
  }
}

export async function buscarProfissional(req, res, next) {
  try {
    const profissional = await buscarProfissionalService(req.params.id)
    if (!profissional) return res.status(404).json({ erro: 'Profissional não encontrado' })
    return res.json(profissional)
  } catch (error) {
    return next(error)
  }
}

export async function atualizarProfissional(req, res, next) {
  try {
    const profissional = await atualizarProfissionalService(req.params.id, req.body)
    return res.json(profissional)
  } catch (error) {
    return next(error)
  }
}

export async function alterarStatusProfissional(req, res, next) {
  try {
    const profissional = await setAtivoProfissionalService(req.params.id, req.body.ativo)
    return res.json({ mensagem: 'Status atualizado com sucesso', profissional })
  } catch (error) {
    return next(error)
  }
}

export async function deletarProfissional(req, res, next) {
  try {
    await deletarProfissionalService(req.params.id)
    return res.json({ mensagem: 'Profissional deletado com sucesso' })
  } catch (error) {
    return next(error)
  }
}
