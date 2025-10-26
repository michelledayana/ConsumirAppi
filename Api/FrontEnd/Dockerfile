# Imagen base: Nginx
FROM nginx:stable-alpine

# Copiar archivos del frontend a la carpeta pública de Nginx
COPY . /usr/share/nginx/html

# Exponer puerto 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
