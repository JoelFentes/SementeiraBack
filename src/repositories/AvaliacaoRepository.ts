import prisma from '../database/prisma';

export class AvaliacaoRepository {
  static async criar(data: {
    plantaId: number;
    usuarioId: number;
    nota: number;
    comentario?: string;
  }) {
    return await prisma.avaliacao.create({ data });
  }

  static async buscarPorPlanta(plantaId?: number) {
    return await prisma.avaliacao.findMany({
      where: plantaId !== undefined ? { plantaId } : undefined,
      include: { usuario: true }
    });
  }
  
}