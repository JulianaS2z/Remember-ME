import * as servicoRepo from '../repositories/servico.repository.js';

function normalizeServicoPayload(data) {
  const payload = { ...data };

  if (payload.duracao !== undefined) {
    payload.duracaoMin = Number(payload.duracao);
    delete payload.duracao;
  }

  if (payload.duracaoMin !== undefined) {
    payload.duracaoMin = Number(payload.duracaoMin);
  }

  return payload;
}

function formatServico(servico) {
  if (!servico) return servico;
  return {
    ...servico,
    duracao: servico.duracaoMin,
  };
}

export async function criarServicoService(data) {
  const payload = normalizeServicoPayload(data);
  const servico = await servicoRepo.createServico(payload);
  return formatServico(servico);
}

export async function listarServicosService() {
  const servicos = await servicoRepo.findAllServicos();
  return servicos.map(formatServico);
}

export async function atualizarServicoService(id, data) {
  const payload = normalizeServicoPayload(data);
  const servico = await servicoRepo.updateServico(id, payload);
  return formatServico(servico);
}

export async function buscarServicoService(id) {
  const servico = await servicoRepo.findServicoById(id);
  return formatServico(servico);
}

export async function deletarServicoService(id) {
  return servicoRepo.deleteServico(id);
}
