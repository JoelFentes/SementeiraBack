import prisma from '../database/prisma';

export class CarrinhoRepository {
  static async criar(usuarioId: number) {
    return await prisma.carrinho.create({
      data: { usuarioId }
    });
  }

  static async buscarPorUsuario(usuarioId: number) {
    return await prisma.carrinho.findFirst({
      where: { usuarioId },
      include: { itens: { include: { planta: true } } }
    });
  }

  static async limparCarrinho(carrinhoId: number) {
    return await prisma.itemCarrinho.deleteMany({
      where: { carrinhoId }
    });
  }
}