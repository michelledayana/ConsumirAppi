# Frontend Dockerfile
FROM node:20

WORKDIR /app

COPY package*.json ./
RUN npm install -g live-server

COPY . .

EXPOSE 80

CMD ["live-server", "--host=0.0.0.0", "--port=80", "--no-browser"]
