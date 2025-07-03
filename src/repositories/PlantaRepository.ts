import prisma from '../database/prisma';

export class PlantaRepository {
  static async criar(data: { 
    nome: string; 
    descricao?: string; 
    preco: number; 
    estoque?: number;
    categoria: string 
  }) {
    return await prisma.planta.create({ data });
  }

  static async buscarPorId(id: number) {
    return await prisma.planta.findUnique({ 
      where: { id },
      include: { itensCarrinho: true, avaliacoes: true }
    });
  }

  static async atualizarEstoque(id: number, quantidade: number) {
    return await prisma.planta.update({
      where: { id },
      data: { estoque: { increment: -quantidade } }
    });
  }

  static async listarTodas(where: {}) {
    return await prisma.planta.findMany();  
  }

  static async deletar(id: number) {
       return await prisma.planta.delete({ 
      where: { id },
    });
  }
}