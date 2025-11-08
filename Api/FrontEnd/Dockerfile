# Frontend Dockerfile para Render
FROM node:20

# Directorio de la app
WORKDIR /app

# Copiamos package.json y package-lock.json
COPY package*.json ./

# Instalamos dependencias y live-server globalmente
RUN npm install
RUN npm install -g live-server

# Copiamos todo el proyecto
COPY . .

# Exponemos un puerto (opcional, solo indicativo)
EXPOSE 8080

# Comando de inicio usando la variable de entorno PORT de Render
CMD ["sh", "-c", "live-server --host=0.0.0.0 --port=$PORT --no-browser"]
