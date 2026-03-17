#!/bin/bash
echo "🚧 Desplegando a STAGING..."

npm run build

# Subir al directorio de staging
# Usamos el asterisco para subir el contenido
scp -r ./dist/* vps:/opt/omnibus/portfolio/

# Reload Nginx del contenedor de staging
ssh vps "docker exec omnibus-portfolio nginx -s reload"

echo "✅ Staging actualizado. Revisa el sitio antes de pasar a producción."
