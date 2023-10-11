javascript
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');

class ChatDaosMongoDB {
  constructor() {
    this.collectionName = 'mensajes';
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

  async crudChat(message) {
    try {
      const collection = this.db.collection(this.collectionName);

      if (message) {
        await collection.insertOne(message);
        console.log('Mensaje guardado en MongoDB');

        // Obtener todos los mensajes después de guardar el nuevo mensaje
        const data = await collection.find().toArray();
        return data;
      } else {
        const data = await collection.find().toArray();
        return data;
      }
    } catch (error) {
      console.log('Error en la operación CRUD:', error);
      throw error;
    }
  }
}

module.exports = ChatDaosMongoDB;