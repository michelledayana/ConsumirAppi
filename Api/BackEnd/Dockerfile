FROM node:18

# Crear el directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Exponer el puerto 3000
EXPOSE 3000

# Iniciar el servidor
CMD ["npm", "start"]
