const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SaleRepository {
  async findAll() {
    const sales = await prisma.venda.findMany({
      include: {
        Produtos: true,
        Funcionario: true,
      },
    });

    return sales;
  }

  async findById(id) {
    const employee = await prisma.funcionario.findMany({
      where: {
        id: id,
      },
    });

    return employee.length > 0 ? employee[0] : null;
  }

  async findByCpf(cpf) {
    const employee = await prisma.funcionario.findMany({
      where: {
        cpf: cpf,
      },
    });

    return employee.length > 0 ? employee[0] : null;
  }

  async create({ valor, quantidade, dataVenda, funcionarioId }) {
    const newSale = await prisma.funcionario.create({
      data: {
        valor,
        quantidade,
        dataVenda,
        funcionarioId,
      },
    });

    return { message: 'Venda criada' };
  }

  async update({ id, nome, cpf, apelido, endereco, email, telefone, cargo }) {
    let Endereco;

    if (endereco) {
      Endereco = await prisma.endereco.findFirst({
        where: {
          cidade: endereco.cidade,
          cep: endereco.cep,
          rua: endereco.rua,
          numero: parseInt(endereco.numero),
          bairro: endereco.bairro,
          complemento: endereco.complemento,
        },
      });

      if (!Endereco) {
        const newEndereco = await prisma.endereco.create({
          data: {
            cidade: endereco.cidade,
            cep: endereco.cep,
            numero: parseInt(endereco.numero),
            rua: endereco.rua,
            bairro: endereco.bairro,
            complemento: endereco.complemento,
          },
          select: {
            id: true,
          },
        });
      }
    }

    const newEmployee = await prisma.funcionario.update({
      where: {
        id: id,
      },
      data: {
        nome,
        cpf,
        Endereco: endereco ? { connect: { id: newEndereco.id } } : endereco,
        email,
        telefone,
        cargo,
        apelido,
      },
    });

    return { message: 'Funcionario atualizado' };
  }

  async delete(id) {
    const sale = await prisma.venda.delete({
      where: {
        id: id,
      },
    });

    return { message: 'venda deletada' };
  }
}

module.exports = new SaleRepository();
