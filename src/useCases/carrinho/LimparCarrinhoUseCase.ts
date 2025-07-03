import { CarrinhoRepository } from '../../repositories/CarrinhoRepository';

export class LimparCarrinhoUseCase {
  async execute(carrinhoId: number) {
    return await CarrinhoRepository.limparCarrinho(carrinhoId);
  }
}