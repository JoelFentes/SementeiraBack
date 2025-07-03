import { UsuarioRepository } from '../../repositories/UsuarioRepository';

export class CadastrarUsuarioUseCase {
  async execute(nome: string, email: string, senha: string) {
    // 1. Verifica se email já existe
    const usuarioExistente = await UsuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // 2. Cria usuário (sem hash para simplificar)
    return await UsuarioRepository.criar({
      nome,
      email,
      senha,
      isAdmin: false 
    });
  }
}