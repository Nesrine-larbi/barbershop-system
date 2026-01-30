# 🔄 Commandes Git pour Déploiement

## Push Initial vers GitHub

```bash
# Vérifier le statut
git status

# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "Configure project for Vercel deployment

- Update Firebase credentials (barbershop-954c6)
- Add vercel.json configuration
- Update .firebaserc project ID
- Add deployment documentation
- Configure .gitignore for production"

# Push vers GitHub
git push origin main
```

## Si c'est un Nouveau Repo

```bash
# Initialiser Git (si pas déjà fait)
git init

# Ajouter remote (remplacez YOUR_USERNAME et YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Premier commit
git add .
git commit -m "Initial commit - Ready for Vercel deployment"

# Push initial
git branch -M main
git push -u origin main
```

## Vérifications Avant Push

```bash
# Voir les fichiers modifiés
git status

# Voir les changements en détail
git diff

# Voir les fichiers qui seront committés
git diff --cached
```

## Après le Push

1. Allez sur GitHub et vérifiez que vos fichiers sont bien là
2. Allez sur [vercel.com](https://vercel.com)
3. Cliquez "New Project"
4. Sélectionnez votre repo
5. Cliquez "Deploy"

## Déploiements Futurs

Après la configuration initiale, chaque push sur `main` déclenchera automatiquement un nouveau déploiement Vercel:

```bash
# Faire vos modifications
git add .
git commit -m "Description des changements"
git push origin main

# Vercel redéploie automatiquement! 🚀
```

## Branches de Développement

Pour tester avant de déployer en production:

```bash
# Créer une branche
git checkout -b develop

# Faire vos modifications
git add .
git commit -m "Test new feature"
git push origin develop

# Vercel créera une preview automatique!
# URL: https://barbershop-system-git-develop-[user].vercel.app
```

## Commandes Utiles

```bash
# Voir l'historique
git log --oneline

# Annuler le dernier commit (garde les changements)
git reset --soft HEAD~1

# Voir les branches
git branch -a

# Voir le remote
git remote -v
```

---

**Tout est prêt! Suivez les commandes ci-dessus pour déployer. 🚀**
