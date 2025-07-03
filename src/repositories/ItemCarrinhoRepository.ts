import prisma from '../database/prisma';

export class ItemCarrinhoRepository {
  static async adicionarItem(carrinhoId: number, plantaId: number, quantidade: number) {
    return await prisma.itemCarrinho.create({
      data: { carrinhoId, plantaId, quantidade }
    });
  }

  static async removerItem(id: number) {
    return await prisma.itemCarrinho.delete({
      where: { id }
    });
  }

  static async atualizarQuantidade(id: number, quantidade: number) {
    return await prisma.itemCarrinho.update({
      where: { id },
      data: { quantidade }
    });
  }
}