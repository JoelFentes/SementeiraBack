import { ItemCarrinhoRepository } from '../../repositories/ItemCarrinhoRepository';
import { CarrinhoRepository } from '../../repositories/CarrinhoRepository';
import { PlantaRepository } from '../../repositories/PlantaRepository';

import prisma from '../../database/prisma';

export class AdicionarItemCarrinhoUseCase {
  async execute(carrinhoId: number, plantaId: number, quantidade: number) {
    return await prisma.$transaction(async () => {
      // 1. Valida se o carrinho existe
      const carrinho = await CarrinhoRepository.buscarPorUsuario(carrinhoId);
      if (!carrinho) {
        throw new Error('Carrinho não encontrado');
      }

      // 2. Valida se a planta existe e tem estoque
      const planta = await PlantaRepository.buscarPorId(plantaId);
      if (!planta) {
        throw new Error('Planta não encontrada');
      }
      if (planta.estoque < quantidade) {
        throw new Error(`Estoque insuficiente. Disponível: ${planta.estoque}`);
      }

      // 3. Verifica se o item já existe no carrinho
      const itemExistente = await prisma.itemCarrinho.findFirst({
        where: {
          carrinhoId,
          plantaId
        }
      });

      let item;
      if (itemExistente) {
        // Atualiza quantidade se o item já existir
        item = await ItemCarrinhoRepository.atualizarQuantidade(
          itemExistente.id,
          itemExistente.quantidade + quantidade
        );
      } else {
        // Cria novo item se não existir
        item = await ItemCarrinhoRepository.adicionarItem(
          carrinhoId,
          plantaId,
          quantidade
        );
      }

      // 4. Retorna o item com dados completos
      return await prisma.itemCarrinho.findUnique({
        where: { id: item.id },
        include: {
          planta: true,
          carrinho: true
        }
      });
    });
  }
}