import { CarrinhoRepository } from '../../repositories/CarrinhoRepository';

export class CriarCarrinhoUseCase {
  async execute(usuarioId: number) {
    return await CarrinhoRepository.criar(usuarioId);
  }
}