@echo off
REM Script de build e deploy para GitHub Pages (Windows)

echo Iniciando build...

REM Verificar mudancas
git status

echo.
echo Commitando mudancas...
git add .
git commit -m "Update: %date% %time%"

echo.
echo Fazendo push para GitHub...
git push origin main

echo.
echo Deploy concluido!
echo Seu site estara disponivel em: https://avilaops.github.io/gabriela/
echo Aguarde alguns minutos para o GitHub Pages processar

pause
