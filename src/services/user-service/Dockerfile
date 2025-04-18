FROM node:20

WORKDIR /usr/src/app

# Copia solo lo necesario desde la raíz
COPY package*.json ./
COPY tsconfig*.json ./

# Instala dependencias del proyecto principal
RUN npm install --omit=dev

# Copia TODO el proyecto (ajustado según lo que necesitas)
COPY . .

# Compila
RUN npm run build

EXPOSE 3000

# Ejecuta el main del microservicio de usuarios
CMD ["node", "dist/main.js"]
