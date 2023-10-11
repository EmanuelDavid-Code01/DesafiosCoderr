const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  // Define la estructura del esquema de Producto
  // Puedes agregar los campos que necesites
  nombre: String,
  precio: Number,
  descripcion: String
});

const ProductoModel = mongoose.model('Producto', ProductoSchema);

class ProductosDaosMongoDB {
  constructor() {
    // Conecta con la base de datos MongoDB mediante Mongoose
    mongoose.connect('<URI_DE_TU_BASE_DE_DATOS>', { useNewUrlParser: true, useUnifiedTopology: true });

    // Configura un manejador de eventos para la conexión con MongoDB
    mongoose.connection.on('error', (error) => {
      console.log('Error al conectarse a MongoDB:', error);
    });

    mongoose.connection.once('open', () => {
      console.log('Conexión exitosa a MongoDB');
    });
  }

  async getAll() {
    try {
      const productos = await ProductoModel.find({});
      return productos;
    } catch (error) {
      console.log('Error al obtener productos de MongoDB:', error);
      throw error;
    }
  }

  async getById(id) {
    try {
      const producto = await ProductoModel.findById(id);
      return producto;
    } catch (error) {
      console.log('Error al obtener producto de MongoDB:', error);
      throw error;
    }
  }

  async create(data) {
    try {
      const producto = new ProductoModel(data);
      const nuevoProducto = await producto.save();
      return nuevoProducto._id;
    } catch (error) {
      console.log('Error al crear producto en MongoDB:', error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      await ProductoModel.findByIdAndUpdate(id, data);
    } catch (error) {
      console.log('Error al actualizar producto en MongoDB:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      await ProductoModel.findByIdAndDelete(id);
    } catch (error) {
      console.log('Error al eliminar producto de MongoDB:', error);
      throw error;
    }
  }
}

module.exports = ProductosDaosMongoDB;
