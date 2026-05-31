import { createSolicitacaoAcesso } from '../repositories/solicitacaoAcesso.repository.js'
import { AppError } from '../utils/AppError.js'

export async function requestAccess(data) {
  if (!data || !data.nome || !data.email || !data.mensagem) {
    throw new AppError('Dados inválidos para solicitação de acesso', 400)
  }

  return createSolicitacaoAcesso(data)
}
