import * as salaRepo from '../repositories/sala.repository.js';

export async function criarSalaService(data) {
  return salaRepo.createSala(data);
}

export async function listarSalasService() {
  return salaRepo.findAllSalas();
}

export async function buscarSalaService(id) {
  return salaRepo.findSalaById(id);
}

export async function atualizarSalaService(id, data) {
  return salaRepo.updateSala(id, data);
}

export async function deletarSalaService(id) {
  return salaRepo.deleteSala(id);
}
