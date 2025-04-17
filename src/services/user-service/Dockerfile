# Usa una imagen base oficial de Node.js
FROM node:20

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install --production

# Copia el resto de los archivos del proyecto
COPY . .

# Construye la aplicación (asumiendo que usas TypeScript)
RUN npm run build

# Expone el puerto (ajústalo si es diferente)
EXPOSE 3000

# Comando para correr la app en producción
CMD ["node", "dist/src/main.js"]
