#!/bin/bash
# Cargar variables de entorno
if [ -f .env.deploy ]; then
    export $(cat .env.deploy | xargs)
else
    echo "❌ Error: .env.deploy no encontrado"
    exit 1
fi

echo "🚀 Desplegando a PRODUCCIÓN..."

npm run build

# Subir al directorio de producción usando variables de entorno
echo "📦 Sincronizando archivos con rsync..."
rsync -azP --delete ./dist/ ${VPS_HOST}:${VPS_PROD_PATH}

# Reload Nginx del contenedor de producción
echo "🔄 Recargando Nginx en producción..."
ssh ${VPS_HOST} "docker exec ${PROD_CONTAINER} nginx -s reload"

echo "🔥 ¡Producción actualizada!"
