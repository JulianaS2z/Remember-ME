import { authenticate } from '../services/auth.service.js';

export async function login(req, res) {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({
        erro: "Email e senha são obrigatórios",
      });
    }


    const result = await authenticate(email, senha);
    if (!result) {
      return res.status(401).json({ erro: 'Credenciais inválidas' });
    }

    return res.json({ mensagem: 'Login realizado com sucesso', ...result });

  } catch (error) {
    res.status(500).json({
      erro: error.message,
    });
  }
}