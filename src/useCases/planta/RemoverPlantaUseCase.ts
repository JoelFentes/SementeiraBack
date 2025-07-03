import { PlantaRepository } from '../../repositories/PlantaRepository'
import { ItemRepository } from '../../repositories/ItemRepository'


export class RemoverPlantaUseCase {
  async execute(id: number) {
    // 1. Verifica se planta existe
    const planta = await PlantaRepository.buscarPorId(id);
    if (!planta) {
      throw new Error('Planta não encontrada');
    }

    // 2. Verifica se está em algum pedido
    const itens = await ItemRepository.buscarItensPorPedido(id);
    if (itens.length > 0) {
      throw new Error('Planta está vinculada a pedidos');
    }

    // 3. Remove
    return await PlantaRepository.deletar(id);
  }
}