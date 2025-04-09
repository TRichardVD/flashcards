# Explication du `dockerfile` détaillée

## C'est quoi docker ?

<!-- TODO : A complété -->

## C'est quoi une image docker ?

Une image Docker est la base d'un conteneur Docker. Lors de la création d'un conteneur, on lui spécifie toujours une image de référence. Celle-ci peut contenir un simple système d'exploitation ou inclure un environnement complet prêt à l'emploi (par exemple : Node.js préinstallé).

Les images proviennent d'un registre (registry). Par défaut, on utilise Docker Hub, le registre officiel de Docker, permettant de télécharger des images publiques prêtes à l'emploi.

## C'est quoi un `Dockerfile` ?

Un Dockerfile est un fichier texte qui contient les instructions permettant de construire une image Docker. Il agit comme un script listant les étapes que Docker doit suivre pour créer une image personnalisée. On y spécifie les actions à effectuer : installation de dépendances, copie de fichiers, configuration d'environnement, définition de la commande de démarrage, etc. L'image ainsi créée pourra ensuite être utilisée pour lancer un ou plusieurs conteneurs identiques.

## Explication du dockerfile créé

> Le dockerfile peut être trouvé [ici](../Dockerfile).

### Image de base

On commence toujours par définir une image de base. Ici, nous utilisons node:20.12.2-alpine3.18. Cela signifie que l'image utilise Node.js en version 20.12.2 sur une distribution Alpine Linux 3.18, légère et sécurisée, idéale pour des environnements de production.

On lui donne l'alias `base`, ce qui permet de réutiliser cette image dans les autres étapes sans avoir à la re-spécifier.

### Multi-stage build

Le multi-stage build est une technique permettant de séparer les étapes de construction pour produire une image finale plus légère. Elle évite d'inclure des outils inutiles (compilateurs, dépendances de dev...) dans l'image finale.

Exemple : on compile une application dans une première image, puis on copie uniquement les fichiers compilés dans l'image finale.

Dans notre cas :

- On installe les dépendances
- On sépare les dépendances de production
- On build l'application
- On crée l'image finale avec uniquement ce qui est nécessaire

Ce processus améliore l'efficacité, la sécurité et permet de tirer parti du cache Docker pour éviter de refaire des étapes inutiles.

### Les commandes utilisés

- `FROM` : Précise à docker l'image de base à utilisé. L'ajout de `AS` permet de faire référence à l'image créer dans le reste du dockerfile.
- `WORKDIR` : permet de spéifié le repertoire de travail dans le container donc c'est là ou les commandes seront éxecuté

- `ADD` permer de copier un ou plusieurs fichiers/dossiers dans le container docker.
- `RUN` permet d'éxecuter des commandes dans le container.
- `COPY` c'est comme ADD sauf qu'il permet d'ajouter plus de paramètre ici nous l'utilisons car il permet de lui spécié avec l'option --from que l'on souhaite copier depuis le container avec l'alias `build` par exemple.
- `ENV` permet de spécifié des variables d'environnement qui seront donc ajouter dans un fichier `.env` dans le container docker
- `EXPOSE` permet de préciser un port à "exposer" qui sera donc utilisable à l'éxtérieur du container quand on le configurera lors de lacréation d'un container avec l'option --port (ou -p)
- `CMD` est tout à la fin il défini la commande qui est éxecuté par défaut lors du lancement du container donc ici au lancement du contianer nous souhaiterons lancer notre application web et donc de lancer la commande `node ./bin/server.js`.

### Explication ligne par ligne de notre dockerfile

```Dockerfile
# On utilise une image de base déjà prête : Node.js version 20.12.2 sur Alpine Linux (très léger).
# On lui donne un nom (alias) : "base"
FROM node:20.12.2-alpine3.18 AS base

# On crée une étape pour installer toutes les dépendances (dev + prod)
FROM base AS deps
# On se place dans le dossier /app du container
WORKDIR /app
# On ajoute les fichiers package.json et package-lock.json dans ce dossier
ADD package.json package-lock.json ./
# On installe toutes les dépendances exactement comme dans le lockfile
RUN ["npm","ci"]

# On crée une autre étape, cette fois pour n’installer que les dépendances de production
FROM base AS production-deps
WORKDIR /app
ADD package.json package-lock.json ./
RUN ["npm","ci","--omit=dev"]

# On crée une étape pour "construire" (compiler/transpiler) l’application
FROM base AS build
WORKDIR /app
# On récupère les node_modules de l’étape deps
COPY --from=deps /app/node_modules /app/node_modules
# On ajoute tous les fichiers du projet (code, configs…)
ADD . .
# On lance le script de build de l'application (souvent pour transformer le code source)
RUN ["node","ace","build"]


# Étape finale : l'image qui servira à exécuter notre app en production
FROM base
# On définit quelques variables d’environnement pour l’appli
ENV LOG_LEVEL=info
ENV SESSION_DRIVER=cookie
WORKDIR /app
# On copie seulement les node_modules de production (plus léger)
COPY --from=production-deps /app/node_modules /app/node_modules
# On copie le code déjà compilé
COPY --from=build /app/build /app
# On indique que le container utilisera le port 3333
EXPOSE 3333
# On précise la commande à lancer automatiquement : démarrer le serveur Node.js
CMD ["node", "./bin/server.js"]

```
