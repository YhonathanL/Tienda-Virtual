const Product = require('../models/products');

exports.createProduct = async (req, res) => {
  const { nombre, tipo, marca, talla, color, precio, disponibilidad } = req.body;
  try {
    const newProduct = await Product.create({ nombre, tipo, marca, talla, color, precio, disponibilidad });
    res.status(201).json({message: 'Nuevo producto creado correctamente:', newProduct});
  } catch (error) {
    console.error('Error al crear un nuevo producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error('Error al obtener todos los productos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.getProductById = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.id;
  const { nombre, tipo, marca, talla, color, precio, disponibilidad } = req.body;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    product.nombre = nombre;
    product.tipo = tipo;
    product.marca = marca;
    product.talla = talla;
    product.color = color;
    product.precio = precio;
    product.disponibilidad = disponibilidad;
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    await product.destroy();
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

