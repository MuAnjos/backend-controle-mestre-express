const ProdutctRepository = require('../repositories/ProductRepository');

class ProductController {
  async index(request, response) {
    const { categoryId } = request.query;

    const products = await ProdutctRepository.findAll(categoryId);

    response.json(products);
  }

  show() {}

  async store(request, response) {
    const { nome, marca, preco, cod, categoriaId } = request.body;

    if (!nome || !marca || !preco || !cod) {
      return response.status(400).json({
        error: 'Todos os dados são necessários. (Nome, Marca, Preço e Código)',
      });
    }

    const isProductNameAvailable = await ProdutctRepository.findByName(nome);
    const isProductMarcaAvailable = await ProdutctRepository.findByBrand(marca);

    if (isProductNameAvailable && isProductMarcaAvailable) {
      return response
        .status(422)
        .json({ message: 'Este produto já foi cadastrado' });
    }

    const isProductCodigoAvailable = await ProdutctRepository.findByCode(cod);

    if (isProductCodigoAvailable) {
      return response
        .status(422)
        .json({ message: 'Este código já foi cadastrado' });
    }

    const newProduct = await ProdutctRepository.create({
      nome,
      marca,
      preco,
      cod,
      categoriaId,
    });

    response.json(newProduct);
  }

  async update(request, response) {
    const { id, nome, marca, preco, codigo, categoriaId } = request.body;

    if (!nome || !marca || !preco || !codigo) {
      return response.status(400).json({
        message:
          'Todos os dados são necessários. (Nome, Marca, Preço e Código)',
      });
    }

    const isProductNameAvailable = await ProdutctRepository.findByName(nome);
    const isProductMarcaAvailable = await ProdutctRepository.findByBrand(marca);

    if (isProductNameAvailable && isProductMarcaAvailable) {
      return response
        .status(422)
        .json({ message: 'Este produto já foi cadastrado' });
    }

    const updatedProduct = await ProdutctRepository.update({
      id,
      nome,
      marca,
      preco,
      codigo,
      categoriaId,
    });

    response.json(updatedProduct);
  }

  async delete(request, response) {
    const { id } = request.params;

    if (!id) {
      return response
        .status(400)
        .json({ message: 'O id do produto a ser deletado é necessário' });
    }

    const productExists = await ProdutctRepository.findById(id);

    if (!productExists) {
      return response.status(404).json({ message: 'Este produto não existe' });
    }

    const deletedProduct = await ProdutctRepository.delete(id);

    response.json(deletedProduct);
  }
}

module.exports = new ProductController();
