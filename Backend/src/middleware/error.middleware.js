import { Prisma } from '@prisma/client'
import { AppError } from '../utils/AppError.js'

export function notFound(req, res) {
  return res.status(404).json({ erro: `Rota não encontrada: ${req.method} ${req.originalUrl}` })
}

export function errorHandler(error, req, res, next) {
  console.error(error)

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ erro: error.message })
  }

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2002') {
      return res.status(409).json({ erro: 'Registro duplicado. Verifique os campos únicos, como e-mail.' })
    }

    if (error.code === 'P2003') {
      return res.status(409).json({ erro: 'Não é possível excluir este registro porque ele está vinculado a outros dados.' })
    }

    if (error.code === 'P2025') {
      return res.status(404).json({ erro: 'Registro não encontrado.' })
    }
  }

  return res.status(500).json({ erro: 'Erro interno do servidor' })
}
