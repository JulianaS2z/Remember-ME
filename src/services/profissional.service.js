import * as profissionalRepo from '../repositories/profissional.repository.js';

export async function criarProfissionalService(data) {
  return profissionalRepo.createProfissional(data);
}

export async function listarProfissionaisService() {
  return profissionalRepo.findActiveProfissionais();
}

export async function atualizarProfissionalService(id, data) {
  return profissionalRepo.updateProfissional(id, data);
}

export async function setAtivoProfissionalService(id, ativo) {
  return profissionalRepo.updateProfissional(id, { ativo });
}
