import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ erro: 'Token não informado' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res.status(401).json({ erro: 'Token não informado' })
    }

    req.user = jwt.verify(token, env.jwtSecret)
    return next()
  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido ou expirado' })
  }
}
