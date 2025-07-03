import { CarrinhoRepository } from '../../repositories/CarrinhoRepository';

export class BuscarCarrinhoUseCase {
  async execute(usuarioId: number) {
    return await CarrinhoRepository.buscarPorUsuario(usuarioId);
  }
}