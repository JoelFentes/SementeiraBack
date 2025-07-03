import prisma from '../database/prisma';

export class PedidoRepository {
  static async criar(data: {
    usuarioId: number;
    total: number;
    itens: { plantaId: number; quantidade: number }[]
  }) {
    return await prisma.pedido.create({
      data: {
        usuarioId: data.usuarioId,
        total: data.total,
        itens: {
          createMany: {
            data: data.itens
          }
        }
      }
    });
  }

  static async listarPorUsuario(usuarioId: number) {
    return await prisma.pedido.findMany({
      where: { usuarioId },
      include: { itens: { include: { planta: true } } }
    });
  }
}