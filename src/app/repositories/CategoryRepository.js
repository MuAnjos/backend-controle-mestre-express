const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class CategoryRepository {
  async findAll() {
    const categories = await prisma.categoria.findMany();

    return categories;
  }

  async findById(id) {
    const categoryId = parseInt(id);

    const category = await prisma.categoria.findMany({
      where: {
        id: categoryId,
      },
    });

    return category.length > 0 ? category[0] : null;
  }

  async findByName(nome) {
    const category = await prisma.categoria.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });

    return category.length > 0 ? category[0] : null;
  }

  async create({ nome }) {
    const newCategory = await prisma.categoria.create({
      data: {
        nome: nome,
      },
    });

    return { message: 'Categoria criada' };
  }

  async update(id, nome) {
    const categoryId = parseInt(id);

    const updatedCategory = await prisma.categoria.update({
      where: {
        id: categoryId,
      },
      data: { nome: nome },
    });

    return updatedCategory;
  }

  async delete(id) {
    const categoryId = parseInt(id);

    const deletedCategory = await prisma.categoria.delete({
      where: {
        id: categoryId,
      },
    });

    return { message: 'Categoria deletada' };
  }
}

module.exports = new CategoryRepository();
