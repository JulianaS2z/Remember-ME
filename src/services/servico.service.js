import * as servicoRepo from '../repositories/servico.repository.js';

export async function criarServicoService(data) {
  return servicoRepo.createServico(data);
}

export async function listarServicosService() {
  return servicoRepo.findAllServicos();
}

export async function deletarServicoService(id) {
  return servicoRepo.deleteServico(id);
}
