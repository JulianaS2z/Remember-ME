import { requestAccess } from '../services/solicitacaoAcesso.service.js'

export async function requestAccessController(req, res, next) {
  try {
    const contato = await requestAccess(req.body)
    return res.status(201).json({
      mensagem: 'Solicitação enviada ao administrador',
      contato: {
        id: contato.id,
        nome: contato.nome,
        email: contato.email,
        telefone: contato.telefone,
        mensagem: contato.mensagem,
        status: contato.status,
      },
    })
  } catch (error) {
    return next(error)
  }
}
