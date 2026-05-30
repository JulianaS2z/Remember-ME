import { findUserByEmail } from '../repositories/auth.repository.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export async function authenticate(email, senha) {
  const usuario = await findUserByEmail(email);
  if (!usuario) return null;

  const valid = await bcrypt.compare(senha, usuario.senha);
  if (!valid) return null;

  const payload = { sub: usuario.id, perfil: usuario.perfil };
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });

  return {
    token,
    usuario: {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      perfil: usuario.perfil
    }
  };
}
