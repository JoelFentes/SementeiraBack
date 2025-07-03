import prisma from '../database/prisma';

export class UsuarioRepository {
  static async criar(data: { nome: string; email: string; senha: string; isAdmin?: boolean }) {
    return await prisma.usuario.create({ data });
  }

  static async buscarPorId(id: number) {
    return await prisma.usuario.findUnique({ 
      where: { id },
      include: { carrinhos: true, pedidos: true }
    });
  }

  static async buscarPorEmail(email: string) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  static async listarTodos() {
    return await prisma.usuario.findMany();
  }
}