import { AvaliacaoRepository } from '../../repositories/AvaliacaoRepository';

export class ListarAvaliacoesUseCase {
  async execute(plantaId?: number) {
    return await AvaliacaoRepository.buscarPorPlanta(plantaId);
  }
}
