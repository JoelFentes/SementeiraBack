import { ItemCarrinhoRepository } from '../../repositories/ItemCarrinhoRepository';

export class RemoverItemCarrinhoUseCase {
  async execute(id: number) {
    return await ItemCarrinhoRepository.removerItem(id);
  }
}