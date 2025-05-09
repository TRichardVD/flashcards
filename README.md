# WOF : World Of Flashcards

WOF est un projet développé avec **AdonisJS**, un framework backend en TypeScript pour Node.js. Cette application web de flashcards est destinée aux étudiants souhaitant apprendre de manière ludique des matières variées telles que le vocabulaire, les mathématiques ou l'histoire. Les flashcards sont une méthode pédagogique reconnue pour leur efficacité dans la mémorisation et l'apprentissage.

Le projet respecte les exigences définies dans le cahier des charges fourni, en mettant l'accent sur une application fonctionnelle et intuitive, tout en exploitant les principaux composants d'AdonisJS.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- [Documentation annexes](#documentation-annexes)

---

## Fonctionnalités

L'application inclut les fonctionnalités suivantes, conformément au cahier des charges :

- **Gestion des utilisateurs** : Authentification sécurisée permettant à chaque utilisateur de gérer ses propres decks.
- **Création de decks** : Les utilisateurs peuvent créer des paquets de flashcards organisés par thème (vocabulaire, mathématiques, histoire, etc.).
- **Ajout et modification de flashcards** : Chaque carte contient une question et une réponse, permettant un apprentissage interactif.
- **Mode révision** : Consultation des cartes avec possibilité de vérifier les réponses pour s'entraîner efficacement.

## Technologies utilisées

Le projet repose sur les technologies suivantes :

- **Framework principal** : [AdonisJS (TypeScript-first)](https://adonisjs.com/).
- **Base de données** : [MySQL](https://www.mysql.com).
- **Gestion des dépendances** : [npm](https://www.npmjs.com/).
- **Template Engine** : [Edge.js](https://edgejs.dev) pour le rendu des vues.
- **ORM (Object-Relational Mapping)** : [lucid](https://lucid.adonisjs.com/)
- **Contrôle de version** : [Git](https://git-scm.com/) et [GitHub](https://github.com/).

### Prérequis

Avant d'installer le projet, assurez-vous d'avoir les logiciels suivants installés :

- [Node.js](https://nodejs.org) (v20.0.0 ou supérieur, version testée : v20.11.0)
- [MySQL](https://www.mysql.com) (v8.0 ou supérieur, version testée : 8.0.30)
- [Git](https://git-scm.com/) (v2.0 ou supérieur)
- [npm](https://www.npmjs.com/) (v10.0.0 ou supérieur, version testée : 10.2.4)

### Installation

1. Clonez le dépôt :

```bash
git clone https://github.com/TRichardVD/flashcards.git
cd flashcards
```

2. Installez les dépendances :

```bash
npm install
```

3. Configurez la base de données :

- Copiez le fichier `.env.example` vers `.env`
- Modifiez les variables de connexion MySQL dans `.env` :

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=votre_user
DB_PASSWORD=votre_password
DB_DATABASE=flashcards
```

4. Générez une clé d'application :

```bash
node ace generate:key
```

- Copiez la clé générée dans `.env` pour `APP_KEY`

5. Créez la base de données :

```bash
node ace migration:run
```

6. Ajoutez des données de test (optionnel) :

```bash
node ace db:seed
```

7. Lancez l'application :

```bash
# Mode développement
npm run dev

# Mode production
npm run build
npm start
```

L'application sera accessible à l'adresse : http://localhost:3333

### Comptes de test

Si vous avez exécuté les seeds, vous pouvez utiliser ces comptes :

- Email : marie.dupont@example.com / Password : motDePasse1
- Email : jean.jacques@example.com / Password : motDePasse2

## Documentation annexes

- [Choix de l'hebergeur (docker)](./docs/comparaison-hebergeur.md)
- [Documentation sur le déploiement avec docker](./docs/docker-doc.md)
- [Documentation sur le deploiement sur Railway (environnement de production)](./docs/environnement-production.md)
- [Documentation sur le déploiement avec pm2 (environnement de test)](./docs/environnement-dev.md)

---

Avec **WOF : World Of Flashcards**, transformez l'apprentissage en une expérience interactive et engageante !

---
