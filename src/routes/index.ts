import { Router } from 'express';
import express from 'express';

import { CadastrarUsuarioUseCase } from '../useCases/usuario/CadastrarUsuarioUseCase'
import { LoginUsuarioUseCase } from '../useCases/usuario/LoginUsuarioUseCase'
import { CriarPedidoUseCase } from '../useCases/pedido/CriarPedidoUseCase'
import { ListarPedidosPorUsuarioUseCase } from '../useCases/pedido/ListarPedidosPorUsuarioUseCase'
import { CadastrarPlantaUseCase } from '../useCases/planta/CadastrarPlantaUseCase'
import { ListarPlantasUseCase } from '../useCases/planta/ListarPlantasUseCase'
import { RemoverPlantaUseCase } from '../useCases/planta/RemoverPlantaUseCase'
import { CriarAvaliacaoUseCase } from '../useCases/avaliacao/CriarAvaliacaoUseCase';
import { ListarAvaliacoesUseCase } from '../useCases/avaliacao/ListarAvaliacoesUseCase';
import { CriarCarrinhoUseCase } from '../useCases/carrinho/CriarCarrinhoUseCase';
import { BuscarCarrinhoUseCase } from '../useCases/carrinho/BuscarCarrinhoUseCase';
import { LimparCarrinhoUseCase } from '../useCases/carrinho/LimparCarrinhoUseCase';
import { RemoverItemCarrinhoUseCase } from '../useCases/carrinho/RemoverItemCarrinhoUseCase';
import { AdicionarItemCarrinhoUseCase } from '../useCases/carrinho/AdicionarItemCarrinhoUseCase';



const router = Router();
router.use(express.json());

// Rotas de Usuário
router.post('/usuarios', async (req, res) => {
  try {
    const usuario = await new CadastrarUsuarioUseCase().execute(
      req.body.nome,
      req.body.email,
      req.body.senha
    );
    res.status(201).json(usuario);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const resultado = await new LoginUsuarioUseCase().execute(
      req.body.email,
      req.body.senha
    );
    res.json(resultado);
  } catch (error: any) {
    res.status(401).json({ error: error.message });
  }
});

// Rotas de Planta
router.get('/plantas', async (req, res) => {
  try {
    const plantas = await new ListarPlantasUseCase().execute(req.query);
    res.json(plantas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/plantas', async (req, res) => {
  try {
    const planta = await new CadastrarPlantaUseCase().execute(req.body);
    res.status(201).json(planta);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/plantas/:id', async (req, res) => {
  try {
    await new RemoverPlantaUseCase().execute(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de Pedido
router.post('/pedidos', async (req, res) => {
  try {
    const pedido = await new CriarPedidoUseCase().execute(
      req.body.usuarioId
    );
    res.status(201).json(pedido);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/pedidos/usuario/:usuarioId', async (req, res) => {
  try {
    const pedidos = await new ListarPedidosPorUsuarioUseCase().execute(
      Number(req.params.usuarioId)
    );
    res.json(pedidos);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de Avaliação
router.post('/avaliacoes', async (req, res) => {
  try {
    const avaliacao = await new CriarAvaliacaoUseCase().execute(req.body);
    res.status(201).json(avaliacao);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/avaliacoes', async (req, res) => {
  try {
    const avaliacoes = await new ListarAvaliacoesUseCase().execute(
      req.query.plantaId ? Number(req.query.plantaId) : undefined
    );
    res.json(avaliacoes);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

// Rotas de Carrinho
router.post('/carrinhos', async (req, res) => {
  try {
    const carrinho = await new CriarCarrinhoUseCase().execute(
      Number(req.body.usuarioId)
    );
    res.status(201).json(carrinho);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/carrinhos/:usuarioId', async (req, res) => {
  try {
    const carrinho = await new BuscarCarrinhoUseCase().execute(
      Number(req.params.usuarioId)
    );
    res.json(carrinho);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/carrinhos/:id', async (req, res) => {
  try {
    await new LimparCarrinhoUseCase().execute(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

// Rotas de ItemCarrinho
router.post('/carrinhos/itens', async (req, res) => {
  try {
    const item = await new AdicionarItemCarrinhoUseCase().execute(
      Number(req.body.carrinhoId),
      Number(req.body.plantaId),
      Number(req.body.quantidade)
    );
    res.status(201).json(item);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/carrinhos/itens/:id', async (req, res) => {
  try {
    await new RemoverItemCarrinhoUseCase().execute(Number(req.params.id));
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
});

export default router;