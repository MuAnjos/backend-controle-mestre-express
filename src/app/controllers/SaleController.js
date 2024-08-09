const SaleRepository = require('../repositories/SaleRepository');

class SaleController {
  async index(request, response) {
    let sales = await SaleRepository.findAll();

    response.json(sales);
  }

  show() {}

  async store(request, response) {
    const { valor, quantidade, dataVenda, funcionarioId } = request.body;

    if (!valor || !quantidade || !dataVenda || !funcionarioId) {
      return response.status(400).json({
        error:
          'Todos os dados são necessários. (Valor, Quantidade, Data da Venda, FuncionarioId)',
      });
    }

    const newEmployee = await SaleRepository.create({
      nome,
      cpf,
      apelido,
      endereco,
      email,
      telefone,
      cargo,
    });

    response.json(newEmployee);
  }

  async update(request, response) {
    const { id, nome, cpf, apelido, endereco, email, telefone, cargo } =
      request.body;

    if (!nome || !cpf || !email || !telefone || !cargo) {
      return response.status(400).json({
        message:
          'Todos os dados são necessários. (Nome, CPF, Endereço, Email, Telefone e Cargo)',
      });
    }

    const foundEmployeeByCpf = await SaleRepository.findByCpf(cpf);

    if (foundEmployeeByCpf && foundEmployeeByCpf.id !== id) {
      if (foundEmployeeByCpf) {
        return response
          .status(409)
          .json({ message: 'Este CPF já foi cadastrado' });
      }
    }

    const updatedProduct = await SaleRepository.update({
      id,
      nome,
      cpf,
      apelido,
      endereco,
      email,
      telefone,
      cargo,
    });

    response.json(updatedProduct);
  }

  async delete(request, response) {
    const { id } = request.params;

    console.log(id);

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
