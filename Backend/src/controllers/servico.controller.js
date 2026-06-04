import { criarServicoService, listarServicosService, buscarServicoService, atualizarServicoService, deletarServicoService } from '../services/servico.service.js';

export const criarServico = async (req, res) => {
  try {
    console.log('BODY RECEBIDO:', req.body)

    const novoServico = await criarServicoService(req.body)

    res.status(201).json(novoServico)
  } catch (error) {
    console.error('ERRO COMPLETO:', error)

    res.status(500).json({
      error: error.message
    })
  }
}


export const listarServicos = async (req, res) => {
  try {
    const servicos = await listarServicosService();
    res.json(servicos);
  } catch (error) {
    console.error('Erro ao listar serviços:', error);
    res.status(500).json({ error: 'Erro ao listar serviços' });
  }
};

export const buscarServico = async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await buscarServicoService(id);
    res.json(servico);
  } catch (error) {
    console.error('Erro ao buscar serviço:', error);
    res.status(500).json({ error: 'Erro ao buscar serviço' });
  }
};

export const atualizarServico = async (req, res) => {
  try {
    const { id } = req.params;
    const servico = await atualizarServicoService(id, req.body);
    res.json(servico);
  } catch (error) {
    console.error('Erro ao atualizar serviço:', error);
    res.status(500).json({ error: 'Erro ao atualizar serviço' });
  }
};

export const deletarServico = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deletarServicoService(id);
    res.json({ message: 'Serviço deletado com sucesso' });
  } catch (error) {
    next(error);
  }
};
