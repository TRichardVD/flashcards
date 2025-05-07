## Déploiement dans un environnement de test avec pm2

## Prérequis

- Accès SSH à un serveur de déploiement linux
- Git installé

### C'est quoi PM2 ?

PM2 est un gestionnaire de processus Node.js qui permet de lancer, surveiller, redémarrer automatiquement et gérer des applications en production de manière simple et efficace.

### Clone du repo

> Afin de déployer sur un serveur via pm2, il nécessite un accès via SSH.

```bash
git clone
```

### Installation de pm2

Depuis le dossier du clone de repo que nous venons de créer, exécutez la commande suivante afin d'installer via `npm` `pm2` (la dernière version (`@latest`)) :

```bash
npm install pm2@latest
```

### Configuration de l'application (.env)

> Pour les étapes suivantes il est nécessaire d'être en ligne de commande dans le dossier du clone du repository github.
> Il est nécessaire de configurer les variables d'environnement (comme fait pour railway) nous allons donc commencer par copier le fichier `.env.example` dans le fichier `.env` avec la commande suivante.

```bash
cp .env.example .env
```

Editez les variables d'environnement avec les bonnes valeurs.
Vous pouvez utiliser l'éditeur de texte `vim` :

```bash
vm .env
```

> Pour éditer le fichier appuyez sur la touche i dans l'éditeur vous passerez donc en mode insert et ensuite pour quitter et sauvegarder appuyez sur escape pour quitter le mode insert et Entrez `:wq` pour sauvegarder (**w**rite = écrire les modifications) et quitter (**q**uit)

Si vous n'avez pas encore de `APP_KEY`, exécutez la commande suivante qui créra automatiquement une clé :

```bash
node ace generate:key
```

### Création de l'application de production (build)

Vous pouvez maintenant exécuter les commandes suivantes pour générer la version de l'application de production :

```bash
npm i
```

> Permet d'installer les dépendances nécessaires à la création et l'exécution de l'application

```bash
node ace migration:run
```

> Exécute les migrations permettant de créer les tables de la base de données

```bash
cp ./.env ./build/.env
```

> Cette commande permet de copier le fichier `.env` dans l'application de build

```bash
node ace build
```

> Cette commande permet de créer l'application de build

### Déploiement de l'application

Une fois que les commandes précédentes on été exécuté, lancez la commande suivante permettant de lancer le serveur :

```bash
pm2 start ./build/bin/server.js
```

### (facultatif) Script `sh` utilitaire

```sh
# aller dans le repertoire clone de l'application
cd ./app/flashcards

# Met à jour le repo local à partir du repo dans le cloud
git fetch
git pull

# Installe les dépendances
npm i

# Installe pm2 (dernière version)
npm i pm2@latest

# Execute les migrations (création des tables de la db)
node ace migration:run

# Créer la version de l'application de deploiement
node ace build

# Copie le fichier .env vers la version de production précédement créé
cp ./.env ./build/.env

# Execute l'application (de production) via pm2
pm2 start ./build/bin/server.js

```
