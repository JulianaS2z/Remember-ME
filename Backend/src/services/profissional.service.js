import * as profissionalRepo from '../repositories/profissional.repository.js';

export async function criarProfissionalService(data) {
  return profissionalRepo.createProfissional(data);
}

export async function listarProfissionaisService() {
  return profissionalRepo.findAllProfissionais();
}

export async function buscarProfissionalService(id) {
  return profissionalRepo.findProfissionalById(id);
}

export async function atualizarProfissionalService(id, data) {
  return profissionalRepo.updateProfissional(id, data);
}

export async function setAtivoProfissionalService(id, ativo) {
  return profissionalRepo.updateProfissional(id, { ativo });
}

export async function deletarProfissionalService(id) {
  return profissionalRepo.deleteProfissional(id);
}
