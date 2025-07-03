import { AvaliacaoRepository } from '../../repositories/AvaliacaoRepository';

export class CriarAvaliacaoUseCase {
  async execute(data: {
    plantaId: number;
    usuarioId: number;
    nota: number;
    comentario?: string;
  }) {
    if (data.nota < 1 || data.nota > 5) {
      throw new Error('Nota deve ser entre 1 e 5');
    }
    return await AvaliacaoRepository.criar(data);
  }
}