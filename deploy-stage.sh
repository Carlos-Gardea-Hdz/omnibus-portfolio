#!/bin/bash
# Cargar variables de entorno
if [ -f .env.deploy ]; then
    export $(cat .env.deploy | xargs)
else
    echo "❌ Error: .env.deploy no encontrado"
    exit 1
fi

echo "🚧 Desplegando a STAGING..."

npm run build

# Subir al directorio de staging usando variables de entorno
echo "📦 Sincronizando archivos con rsync..."
rsync -azP --delete ./dist/ ${VPS_HOST}:${VPS_STAGING_PATH}

# Reload Nginx del contenedor de staging
echo "🔄 Recargando Nginx en staging..."
ssh ${VPS_HOST} "docker exec ${STAGING_CONTAINER} nginx -s reload"

echo "✅ Staging actualizado. Revisa el sitio antes de pasar a producción."
