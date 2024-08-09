const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class ProdutctRepository {
  async findAll(categoryId) {
    let products;

    if (categoryId) {
      products = await prisma.produto.findMany({
        where: {
          categoriaId: parseInt(categoryId),
        },
        include: {
          Categoria: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
    } else {
      products = await prisma.produto.findMany({
        include: {
          Categoria: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });
    }

    return products;
  }

  async findById(id) {
    const product = await prisma.produto.findMany({
      where: {
        id: id,
      },
    });

    return product.length > 0 ? product[0] : null;
  }

  async findByName(nome) {
    const product = await prisma.produto.findMany({
      where: {
        nome: nome,
      },
    });

    return product.length > 0 ? product[0] : null;
  }

  async findByBrand(marca) {
    const product = await prisma.produto.findMany({
      where: {
        marca: marca,
      },
    });

    return product.length > 0 ? product[0] : null;
  }

  async findByCode(codigo) {
    const product = await prisma.produto.findMany({
      where: {
        codigo: parseInt(codigo),
      },
    });

    return product.length > 0 ? product[0] : null;
  }

  async create({ nome, marca, preco, cod, categoriaId }) {
    const newProduct = await prisma.produto.create({
      data: {
        nome: nome,
        marca: marca,
        preco: parseFloat(preco),
        codigo: parseInt(cod),
        categoriaId: parseInt(categoriaId),
      },
    });

    return { message: 'Produto criado' };
  }

  async update({ id, nome, marca, preco, codigo, categoriaId }) {
    const updatedProduct = await prisma.produto.update({
      where: {
        id: id,
      },
      data: {
        nome: nome,
        marca: marca,
        preco: parseFloat(preco),
        codigo: parseInt(codigo),
        categoriaId: parseInt(categoriaId),
      },
    });

    return { message: 'Produto atualizado' };
  }

  async delete(id) {
    const produto = await prisma.produto.delete({
      where: {
        id: id,
      },
    });

    return { message: 'Produto deletado' };
  }
}

module.exports = new ProdutctRepository();
