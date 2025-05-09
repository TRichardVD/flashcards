## Déploiement dans un environnement de test avec pm2

## Prérequis

- Accès SSH à un serveur de déploiement Linux
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

Il est également possible d'installer cette dépendance globalement donc indépendamment d'un projet en particulier mais sur la machine hôte cela peut être utile afin de simplifier les mises à jour par la suite

```bash
npm install pm2@latest --global

```

### Configuration de l'application (.env)

> Pour les étapes suivantes il est nécessaire d'être en ligne de commande dans le dossier du clone du repository GitHub.
> Il est nécessaire de configurer les variables d'environnement, nous allons donc commencer par copier le fichier `.env.example` dans le fichier `.env` avec la commande suivante.

```bash
cp .env.example .env
```

Éditez les variables d'environnement avec les bonnes valeurs.
Vous pouvez utiliser l'éditeur de texte `vim` sur Linux :

```bash
vim .env
```

> Pour éditer le fichier appuyez sur la touche i dans l'éditeur vous passerez donc en mode insert et ensuite pour quitter et sauvegarder appuyez sur échap pour quitter le mode insert et Entrez `:wq` pour sauvegarder (**w**rite = écrire les modifications) et quitter (**q**uit)

Si vous n'avez pas encore de `APP_KEY`, exécutez la commande suivante qui créera automatiquement une clé :

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

Une fois que les commandes précédentes ont été exécutées, lancez la commande suivante permettant de lancer le serveur :

```bash
pm2 start ./build/bin/server.js
```

### Mise à jour de l'application

Lorsqu'une nouvelle version est déployée, procédez comme suit pour mettre à jour et relancer l'application :

1. **Mettre à jour le dépôt local**
   Depuis le dossier du dépôt, exécutez :

   ```bash
   git fetch
   git pull
   ```

2. **Réinstaller et mettre à jour les dépendances**

   ```bash
   npm install
   ```

   Pour mettre à jour pm2 (PAS NECESSAIRE SI VOUS AVEZ INSTALLÉ PM2 DE MANIÈRE "GLOBAL"):

   ```bash
   npm install pm2@latest
   ```

3. **Recompiler l'application**

   ```bash
   # Exécuter les migrations (création des tables de la base de données)
   node ace migration:run

   # Créer la version de production
   node ace build

   # Copier le fichier des variables d'environnement
   cp .env build/.env
   ```

4. **Relancer l'application via pm2**

   ```bash
   pm2 start build/bin/server.js
   ```

> Toutes les commandes sont réécrites ci-dessous afin de pouvoir être copiées/collées dans un script qui automatise cette opération. Grâce à cela, il suffira uniquement de lancer le script pour effectuer la mise à jour.

### _(facultatif)_ Script `sh` utilitaire

```sh
# aller dans le répertoire clone de l'application
cd ./app/flashcards

# Met à jour le repo local à partir du repo dans le cloud
git fetch
git pull

# Installe les dépendances
npm i

# Installe pm2 (dernière version)
npm i pm2@latest # PAS NECESSAIRE SI VOUS AVEZ INSTALLÉ PM2 DE MANIÈRE "GLOBAL"

# Exécute les migrations (création des tables de la db)
node ace migration:run

# Créer la version de l'application de déploiement
node ace build

# Copie le fichier .env vers la version de production précédemment créée
cp ./.env ./build/.env

# Exécute l'application (de production) via pm2
pm2 start ./build/bin/server.js

```
