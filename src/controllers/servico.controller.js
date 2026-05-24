import { criarServicoService, listarServicosService, deletarServicoService } from '../services/servico.service.js';

export const criarServico = async (req, res) => {
  try {
    const novoServico = await criarServicoService(req.body);
    res.status(201).json(novoServico);
  } catch (error) {
    console.error('Erro ao criar serviço:', error);
    res.status(500).json({ error: 'Erro ao criar serviço' });
  }
};

export const listarServicos = async (req, res) => {
  try {
    const servicos = await listarServicosService();
    res.json(servicos);
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    res.status(500).json({ error: 'Erro ao listar serviços' });
  }
};

export const deletarServico = async (req, res) => {
  try {
    const { id } = req.params;
    await deletarServicoService(id);
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar serviço:', error);
    res.status(500).json({ error: 'Erro ao deletar serviço' });
  }
};
