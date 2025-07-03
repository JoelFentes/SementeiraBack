import { UsuarioRepository } from '../../repositories/UsuarioRepository';

export class LoginUsuarioUseCase {
  async execute(email: string, senha: string) {
    // 1. Busca usuário
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Credenciais inválidas');
    }

    // 2. Compara senha (simplificado, sem hash)
    if (usuario.senha !== senha) {
      throw new Error('Credenciais inválidas');
    }

    // 3. Retorna dados básicos (em produção, usaria JWT)
    return {
      id: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      isAdmin: usuario.isAdmin
    };
  }
}