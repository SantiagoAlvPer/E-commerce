FROM node:18-alpine AS builder

WORKDIR /app

# 1. Copia archivos de dependencias
COPY package*.json ./
RUN npm ci

# 2. Copia todo el código y compila
COPY . .
RUN npm run build

# Etapa de producción
FROM node:18-alpine

WORKDIR /app

# 3. Copia solo lo necesario
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# 4. Puerto expuesto
EXPOSE 3000

# 5. Comando de inicio
CMD ["npm", "run", "start:prod"]