const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class EmployeeRepository {
  async findAll() {
    const employees = await prisma.funcionario.findMany();

    return employees;
  }

  async findById(id) {
    const employee = await prisma.funcionario.findMany({
      where: {
        id: id,
      },
    });

    return employee;
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

    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);
    console.log(id);

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
