#!/bin/bash
echo "🚀 Desplegando a PRODUCCIÓN..."

# No hace falta correr npm run build otra vez si acabas de hacerlo para staging,
# pero es más seguro hacerlo para garantizar limpieza.
npm run build

# Subir al directorio de producción
# Usamos rsync para despliegues atómicos y eficientes
rsync -azP --delete ./dist/ vps:/opt/omnibus/portfolio/dist-prod/

# Reload Nginx del contenedor de producción
ssh vps "docker exec omnibus-portfolio-prod nginx -s reload"

echo "🔥 ¡Producción actualizada!"
