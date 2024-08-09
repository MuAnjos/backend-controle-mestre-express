const CategoryRepository = require('../repositories/CategoryRepository');

class CategoryController {
  async index(request, response) {
    const categories = await CategoryRepository.findAll();

    response.json(categories);
  }

  show() {}

  async store(request, response) {
    const { nome } = request.body;

    if (!nome) {
      return response
        .status(400)
        .json({ error: 'O nome da categoria é necessário' });
    }

    const categoryExists = await CategoryRepository.findByName(nome);

    if (categoryExists) {
      return response
        .status(422)
        .json({ message: 'Este nome de categoria já esta em uso' });
    }

    const newCategory = await CategoryRepository.create({ nome });

    response.json(newCategory);
  }

  async update(request, response) {
    const { id, nome } = request.body;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'O id da categoria a ser atualizada é necessário' });
    }

    if (!nome) {
      return response
        .status(400)
        .json({ message: 'O nome da categoria a ser atualizado é necessária' });
    }

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response
        .status(404)
        .json({ message: 'Esta categoria não existe' });
    }

    const isCategoryNameAvailable = await CategoryRepository.findByName(nome);

    if (isCategoryNameAvailable) {
      return response
        .status(422)
        .json({ message: 'Este nome de categoria já esta em uso' });
    }

    const updatedCategory = await CategoryRepository.update(id, nome);

    response.json(updatedCategory);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'O id da categoria a ser deletada é necessária' });
    }

    const categoryExists = await CategoryRepository.findById(id);

    if (!categoryExists) {
      return response
        .status(404)
        .json({ message: 'Esta categoria não existe' });
    }

    const deletedCategory = await CategoryRepository.delete(id);

    response.json(deletedCategory);
  }
}

module.exports = new CategoryController();
