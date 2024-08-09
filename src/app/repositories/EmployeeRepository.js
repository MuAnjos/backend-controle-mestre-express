const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EmployeeRepository {
  async findAll() {
    const employees = await prisma.funcionario.findMany({
      include: {
        Endereco: true,
      },
    });

    return employees;
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

  async create({ nome, cpf, apelido, endereco, email, telefone, cargo }) {
    let newEndereco;

    if (endereco) {
      newEndereco = await prisma.endereco.findFirst({
        where: {
          cidade: endereco.cidade,
          cep: endereco.cep,
          rua: endereco.rua,
          numero: parseInt(endereco.numero),
          bairro: endereco.bairro,
          complemento: endereco.complemento,
        },
      });

      if (!newEndereco) {
        await prisma.endereco.create({
          data: {
            cidade: endereco.cidade,
            cep: endereco.cep,
            numero: parseInt(endereco.numero),
            rua: endereco.rua,
            bairro: endereco.bairro,
            complemento: endereco.complemento,
          },
        });
      }

      newEndereco = await prisma.endereco.findFirst({
        where: {
          cidade: endereco.cidade,
          cep: endereco.cep,
          rua: endereco.rua,
          numero: parseInt(endereco.numero),
          bairro: endereco.bairro,
          complemento: endereco.complemento,
        },
      });
    }

    const newEmployee = await prisma.funcionario.create({
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

    return { message: 'Funcionario criado' };
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
    const produto = await prisma.funcionario.delete({
      where: {
        id: id,
      },
    });

    return { message: 'funcionario deletado' };
  }
}

module.exports = new EmployeeRepository();
