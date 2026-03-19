#!/bin/bash
echo "🚧 Desplegando a STAGING..."

npm run build

# Subir al directorio de staging
# Usamos rsync para despliegues atómicos y eficientes
rsync -azP --delete ./dist/ vps:/opt/omnibus/portfolio/dist/

# Reload Nginx del contenedor de staging
ssh vps "docker exec omnibus-portfolio nginx -s reload"

echo "✅ Staging actualizado. Revisa el sitio antes de pasar a producción."
