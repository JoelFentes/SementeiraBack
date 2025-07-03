import prisma from '../database/prisma';

export class ItemRepository {
  /**
   * Cria um novo item de pedido
   */
  static async criarItemPedido(data: {
    pedidoId: number;
    plantaId: number;
    quantidade: number;
  }) {
    return await prisma.item.create({
      data: {
        pedidoId: data.pedidoId,
        plantaId: data.plantaId,
        quantidade: data.quantidade
      },
      include: {
        planta: true // Inclui os dados da planta relacionada
      }
    });
  }

  /**
   * Busca itens por ID do pedido
   */
  static async buscarItensPorPedido(pedidoId: number) {
    return await prisma.item.findMany({
      where: { pedidoId },
      include: { planta: true }
    });
  }

  /**
   * Atualiza a quantidade de um item
   */
  static async atualizarQuantidade(id: number, quantidade: number) {
    return await prisma.item.update({
      where: { id },
      data: { quantidade }
    });
  }

  /**
   * Remove um item do pedido
   */
  static async removerItem(id: number) {
    return await prisma.item.delete({
      where: { id }
    });
  }

  /**
   * Calcula o total de um pedido baseado nos itens
   */
  static async calcularTotalPedido(pedidoId: number) {
    const itens = await prisma.item.findMany({
      where: { pedidoId },
      include: { planta: true }
    });

    return itens.reduce((total, item) => {
      return total + (item.planta.preco * item.quantidade);
    }, 0);
  }
}