import { UsuarioRepository } from '../../repositories/UsuarioRepository';

export class CadastrarUsuarioUseCase {
  async execute(nome: string, email: string, senha: string) {
    // 1. Validação de campos obrigatórios
    if (!nome?.trim() || !email?.trim() || !senha?.trim()) {
      throw new Error('Todos os campos (nome, email e senha) são obrigatórios');
    }

    // 2. Verifica se email já existe
    const usuarioExistente = await UsuarioRepository.buscarPorEmail(email);
    if (usuarioExistente) {
      throw new Error('Email já cadastrado');
    }

    // 3. Cria usuário
    return await UsuarioRepository.criar({
      nome,
      email,
      senha,
    });
  }
}