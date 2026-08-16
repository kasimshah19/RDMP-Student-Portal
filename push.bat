@echo off
git add .
git commit --no-gpg-sign -m "Initial commit: RDMP Student Portal MERN"
git branch -M main
git remote add origin https://github.com/kasimshah19/RDMP-Student-Portal.git
git push -u origin main
echo Done!
