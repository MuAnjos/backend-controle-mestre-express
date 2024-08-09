const SaleRepository = require('../repositories/SaleRepository');

class SaleController {
  async index(request, response) {
    let sales = await SaleRepository.findAll();

    response.json(sales);
  }

  async show(request, response) {
    const id = request.params;

    let sale = await SaleRepository.findById(id.id);

    response.json(sale);
  }

  async store(request, response) {
    const { valor, quantidade, funcionarioId, produtosId } = request.body;

    if (!valor || !quantidade || !funcionarioId) {
      return response.status(400).json({
        error:
          'Todos os dados são necessários. (Valor, Quantidade, FuncionarioId)',
      });
    }

    const newSale = await SaleRepository.create({
      valor,
      quantidade,
      funcionarioId,
      produtosId,
    });

    response.json(newSale);
  }

  async update(request, response) {
    const { id, valor, quantidade, funcionarioId, produtosId } = request.body;

    if (!valor || !quantidade || !funcionarioId) {
      return response.status(400).json({
        error:
          'Todos os dados são necessários. (Valor, Quantidade, FuncionarioId)',
      });
    }

    const newSale = await SaleRepository.update({
      id,
      valor,
      quantidade,
      funcionarioId,
      produtosId,
    });

    response.json(newSale);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'O id da venda a ser deletada é necessário' });
    }

    const saleExists = await SaleRepository.findById(id);

    if (!saleExists) {
      return response.status(404).json({ message: 'Esta venda não existe' });
    }

    const deletedSale = await SaleRepository.delete(id);

    response.json(deletedSale);
  }
}

module.exports = new SaleController();
