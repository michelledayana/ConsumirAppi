# Imagen base
FROM node:18

# Directorio de trabajo
WORKDIR /app

# Copiar y preparar dependencias
COPY package*.json ./
RUN npm install

# Copiar código
COPY . .

# Exponer puerto
EXPOSE 3000

# Comando de inicio
CMD ["npm", "start"]
