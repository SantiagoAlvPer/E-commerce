import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/cartManagement'; // Usa la variable de entorno o un valor predeterminado
    await mongoose.connect(mongoUri); // Las opciones ya no son necesarias en versiones recientes
    console.log('Conexión a MongoDB exitosa');

    // Habilitar logs de Mongoose para depuración (opcional)
    if (process.env.MONGOOSE_DEBUG === 'true') {
      mongoose.set('debug', true);
    }
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    process.exit(1); // Salir del proceso si no se puede conectar
  }
};

export default connectDB;