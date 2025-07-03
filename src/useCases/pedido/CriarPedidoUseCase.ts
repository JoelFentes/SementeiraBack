import { PlantaRepository } from '../../repositories/PlantaRepository'
import { PedidoRepository } from '../../repositories/PedidoRepository'
import { CarrinhoRepository } from '../../repositories/CarrinhoRepository'


import prisma from '../../database/prisma';

export class CriarPedidoUseCase {
  async execute(usuarioId: number) {
    return await prisma.$transaction(async () => {
      const carrinho = await CarrinhoRepository.buscarPorUsuario(usuarioId);
      if (!carrinho || carrinho.itens.length === 0) {
        throw new Error('Carrinho vazio');
      }

      // Calcula total e valida estoque
      let total = 0;
      for (const item of carrinho.itens) {
        const planta = await PlantaRepository.buscarPorId(item.plantaId);
        
        if (!planta) {
          throw new Error(`Planta com ID ${item.plantaId} não encontrada.`);
        }
      
        total += planta.preco * item.quantidade;
      }
      
      // Cria pedido
      const pedido = await PedidoRepository.criar({
        usuarioId,
        total,
        itens: carrinho.itens.map(item => ({
          plantaId: item.plantaId,
          quantidade: item.quantidade
        }))
      });

      // Limpa carrinho
      await CarrinhoRepository.limparCarrinho(carrinho.id);

      return pedido;
    });
  }
}