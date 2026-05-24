import { criarProfissionalService, listarProfissionaisService, atualizarProfissionalService, setAtivoProfissionalService } from '../services/profissional.service.js';

export const criarProfissional = async (req, res) => {
  try {
    const profissional = await criarProfissionalService(req.body);
    res.status(201).json(profissional);
  } catch (error) {
    console.error(error);

    if (error.code === 'P2002') {
      return res.status(400).json({ erro: 'Email já cadastrado' });
    }

    res.status(400).json({ erro: 'Erro ao criar profissional' });
  }
};

export const listarProfissionais = async (req, res) => {
  try {
    const profissionais = await listarProfissionaisService();
    res.json(profissionais);
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao listar profissionais' });
  }
};


export const atualizarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const profissional = await atualizarProfissionalService(id, req.body);
    res.json(profissional);
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao atualizar profissional' });
  }
};


export const desativarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const profissional = await setAtivoProfissionalService(id, false);
    res.json({ mensagem: 'Profissional desativado com sucesso', profissional });
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao desativar profissional' });
  }
};

export const ativarProfissional = async (req, res) => {
  try {
    const { id } = req.params;
    const profissional = await setAtivoProfissionalService(id, true);
    res.json({ mensagem: 'Profissional ativado com sucesso', profissional });

  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: 'Erro ao ativar profissional' });
  }
};