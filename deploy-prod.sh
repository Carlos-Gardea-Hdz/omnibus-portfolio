#!/bin/bash
echo "🚀 Desplegando a PRODUCCIÓN..."

# No hace falta correr npm run build otra vez si acabas de hacerlo para staging,
# pero es más seguro hacerlo para garantizar limpieza.
npm run build

# Subir al directorio de producción
scp -r ./dist/* vps:/opt/omnibus/portfolio/dist-prod/

# Reload Nginx del contenedor de producción
ssh vps "docker exec omnibus-portfolio-prod nginx -s reload"

echo "🔥 ¡Producción actualizada!"
