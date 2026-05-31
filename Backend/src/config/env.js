const requiredEnv = ['DATABASE_URL', 'JWT_SECRET']

export function validateEnv() {
  const missing = requiredEnv.filter((key) => !process.env[key])

  if (missing.length > 0) {
    throw new Error(`Variáveis de ambiente obrigatórias ausentes: ${missing.join(', ')}`)
  }

  if (process.env.JWT_SECRET.length < 16) {
    throw new Error('JWT_SECRET deve ter pelo menos 16 caracteres.')
  }
}

export const env = {
  port: Number(process.env.PORT || 3000),
  nodeEnv: process.env.NODE_ENV || 'development',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  jwtSecret: process.env.JWT_SECRET,
}
