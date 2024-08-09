const EmployeeRepository = require('../repositories/EmployeeRepository');

class EmployeeController {
  async index(request, response) {
    const products = await EmployeeRepository.findAll();

    response.json(products);
  }

  show() {}

  async store(request, response) {
    const { nome, cpf, apelido, endereco, email, telefone, cargo } =
      request.body;

    if (!nome || !cpf || !email || !telefone || !cargo) {
      return response.status(400).json({
        error:
          'Todos os dados são necessários. (Nome, CPF, Endereço, Email, Telefone e Cargo)',
      });
    }

    const newEmployee = await EmployeeRepository.create({
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
    
    

    const updatedProduct = await EmployeeRepository.update({
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
        .json({ message: 'O id do funcionario a ser deletado é necessário' });
    }

    const employeeExists = await EmployeeRepository.findById(id);

    if (!employeeExists) {
      return response
        .status(404)
        .json({ message: 'Este funcionario não existe' });
    }

    const deletedEmployee = await EmployeeRepository.delete(id);

    response.json(deletedEmployee);
  }
}

module.exports = new EmployeeController();
