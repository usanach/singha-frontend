chcp 65001
CALL npm run build
xcopy /s/All C:\xampp\htdocs\singha-frontend\singha-frontend-source\dist C:\xampp\htdocs\singha-frontend
cd C:\xampp\htdocs\singha-frontend
CALL git add .
CALL git commit -m "deploy"
CALL git pull
CALL git push