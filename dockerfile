# Utilisez une image légère basée sur un serveur web pour servirl'application front-end
FROM nginx:alpine

# Copiez les fichiers de l'application dans le répertoire de travail del'image nginx
COPY ./app /usr/share/nginx/html