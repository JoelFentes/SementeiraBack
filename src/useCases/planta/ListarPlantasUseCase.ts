import { PlantaRepository } from '../../repositories/PlantaRepository';

export class ListarPlantasUseCase {
  async execute(filtros?: {
    categoria?: string;
    precoMin?: number;
    precoMax?: number;
  }) {
    let where = {};
    
    if (filtros) {
      where = {
        ...(filtros.categoria && { categoria: filtros.categoria }),
        ...(filtros.precoMin && { preco: { gte: filtros.precoMin } }),
        ...(filtros.precoMax && { preco: { lte: filtros.precoMax } }),
      };
    }

    return await PlantaRepository.listarTodas(where);
  }
}