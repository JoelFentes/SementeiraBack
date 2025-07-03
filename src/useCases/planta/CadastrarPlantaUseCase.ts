import { PlantaRepository } from '../../repositories/PlantaRepository';

export class CadastrarPlantaUseCase {
  async execute(data: {
    nome: string;
    preco: number;
    categoria: string;
    descricao?: string;
    estoque?: number;
  }) {
    // Validação básica
    if (data.preco <= 0) {
      throw new Error('Preço deve ser maior que zero');
    }

    return await PlantaRepository.criar({
      nome: data.nome,
      preco: data.preco,
      categoria: data.categoria,
      descricao: data.descricao,
      estoque: data.estoque || 0,
    });
  }
}