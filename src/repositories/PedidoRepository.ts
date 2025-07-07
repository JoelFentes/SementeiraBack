import prisma from '../database/prisma';

export class PedidoRepository {
  static async criar(data: {
    usuarioId: number;
    total: number;
    itens: { plantaId: number; quantidade: number }[];
  }) {
    return await prisma.$transaction(async (tx) => {
      // 1. Verificar estoque de cada planta
      for (const item of data.itens) {
        const planta = await tx.planta.findUnique({
          where: { id: item.plantaId }
        });

        if (!planta) {
          throw new Error(`Planta com ID ${item.plantaId} não encontrada`);
        }

        if (planta.estoque < item.quantidade) {
          throw new Error(`Estoque insuficiente para a planta "${planta.nome}". Estoque atual: ${planta.estoque}, solicitado: ${item.quantidade}`);
        }
      }

      // 2. Criar o pedido e os itens
      const pedido = await tx.pedido.create({
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

      // 3. Atualizar estoque das plantas
      for (const item of data.itens) {
        await tx.planta.update({
          where: { id: item.plantaId },
          data: {
            estoque: {
              decrement: item.quantidade
            }
          }
        });
      }

      return pedido;
    });
  }

  static async listarPorUsuario(usuarioId: number) {
    return await prisma.pedido.findMany({
      where: { usuarioId },
      include: {
        itens: {
          include: {
            planta: true
          }
        }
      }
    });
  }
}
