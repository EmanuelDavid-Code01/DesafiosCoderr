const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

class ContenedorMongoDB {
  constructor(collectionName) {
    this.collectionName = collectionName;
    this.uri = '<uri_de_tu_base_de_datos_mongodb>'; // Reemplaza con la URI de tu base de datos MongoDB
    this.client = new MongoClient(this.uri);
    this.db = null;
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db();
      console.log('Conexión exitosa a MongoDB');
    } catch (error) {
      console.log('Error al conectarse a MongoDB:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.close();
      console.log('Desconexión exitosa de MongoDB');
    } catch (error) {
      console.log('Error al desconectarse de MongoDB:', error);
    }
  }

  async get(id) {
    try {
      const collection = this.db.collection(this.collectionName);

      if (id) {
        const element = await collection.findOne({ _id: ObjectId(id) });
        return element;
      } else {
        const elements = await collection.find().toArray();
        return elements;
      }
    } catch (error) {
      console.log('Error al obtener elementos de MongoDB:', error);
      throw error;
    }
  }

  async add(element) {
    try {
      const collection = this.db.collection(this.collectionName);
      const result = await collection.insertOne(element);
      return result.insertedId.toString();
    } catch (error) {
      console.log('Error al agregar elemento a MongoDB:', error);
      throw error;
    }
  }

  async update(id, element) {
    try {
      const collection = this.db.collection(this.collectionName);
      await collection.updateOne({ _id: ObjectId(id) }, { $set: element });
    } catch (error) {
      console.log('Error al actualizar elemento en MongoDB:', error);
      throw error;
    }
  }

  async delete(id) {
    try {
      const collection = this.db.collection(this.collectionName);
      await collection.deleteOne({ _id: ObjectId(id) });
    } catch (error) {
      console.log('Error al eliminar elemento de MongoDB:', error);
      throw error;
    }
  }
}

module.exports = ContenedorMongoDB;
