import { PedidoRepository } from '../../repositories/PedidoRepository'

export class ListarPedidosPorUsuarioUseCase {
  async execute(usuarioId: number) {
    return await PedidoRepository.listarPorUsuario(usuarioId);
  }
}