const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class SaleRepository {
  async findAll() {
    let sales = await prisma.venda.findMany({
      include: {
        Produtos: true,
        Funcionario: true,
      },
    });

    sales = sales.map((sales) => ({
      ...sales,
      produtos: sales.Produtos,
      funcionario: sales.Funcionario,
    }));

    return sales;
  }

  async findById(id) {
    console.log(id);

    const sale = await prisma.venda.findMany({
      where: {
        id: id,
      },
    });

    return sale.length > 0 ? sale[0] : null;
  }

  async findByCpf(cpf) {
    const employee = await prisma.funcionario.findMany({
      where: {
        cpf: cpf,
      },
    });

    return employee.length > 0 ? employee[0] : null;
  }

  async create({ valor, quantidade, produtosId, funcionarioId }) {
    const products = await prisma.produto.findMany({
      where: {
        id: {
          in: produtosId,
        },
      },
      select: {
        id: true,
      },
    });

    const newSale = await prisma.venda.create({
      data: {
        valor,
        quantidade,
        funcionarioId,
        Produtos: { connect: products.map((product) => ({ id: product.id })) },
      },
    });

    return { message: 'Venda criada' };
  }

  async update({ id, valor, quantidade, funcionarioId, produtosId }) {
    const products = await prisma.produto.findMany({
      where: {
        id: {
          in: produtosId,
        },
      },
      select: {
        id: true,
      },
    });

    const updatedSale = await prisma.venda.update({
      where: {
        id: id,
      },
      data: {
        valor,
        quantidade,
        funcionarioId,
        Produtos: { connect: products.map((product) => ({ id: product.id })) },
      },
    });

    return { message: 'Venda atualizada' };
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
