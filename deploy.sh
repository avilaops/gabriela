#!/bin/bash

# Script de build e deploy para GitHub Pages

echo "🚀 Iniciando build..."

# Verificar se há mudanças
if [ -z "$(git status --porcelain)" ]; then 
    echo "✅ Nenhuma mudança para commit"
else
    echo "📝 Commitando mudanças..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "⬆️  Fazendo push para GitHub..."
git push origin main

echo "✨ Deploy concluído!"
echo "🌐 Seu site estará disponível em: https://avilaops.github.io/gabriela/"
echo "⏰ Aguarde alguns minutos para o GitHub Pages processar"
