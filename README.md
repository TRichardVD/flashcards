# WOP : World Of Flashcards

WOP est un projet développé avec **AdonisJS**, un framework backend en TypeScript pour Node.js. Cette application web de flashcards est destinée aux étudiants souhaitant apprendre de manière ludique des matières variées telles que le vocabulaire, les mathématiques ou l'histoire. Les flashcards sont une méthode pédagogique reconnue pour leur efficacité dans la mémorisation et l'apprentissage.

Le projet respecte les exigences définies dans le cahier des charges fourni, en mettant l'accent sur une application fonctionnelle et intuitive, tout en exploitant les principaux composants d'AdonisJS.

---

## Table des matières

- [Fonctionnalités](#fonctionnalités)
- [Technologies utilisées](#technologies-utilisées)
- La description du contexte technique de développement
- Les opérations de mise en place de cet environnement de developpement
- La description du contexte technique de validation (staging)
- Les opérations de mise en place de cet environnement
- Les opérations de mise à jour de cet environnement (lorsque le développement a produit un artefact)
- La description du contexte technique de production
- Les opérations de mise en place de cet environnement
- Les opérations de mise à jour de cet environnement (lorsqu’un artefact a été validé)

---

## Fonctionnalités

L'application inclut les fonctionnalités suivantes, conformément au cahier des charges :

- **Gestion des utilisateurs** : Authentification sécurisée permettant à chaque utilisateur de gérer ses propres decks.
- **Création de decks** : Les utilisateurs peuvent créer des paquets de flashcards organisés par thème (vocabulaire, mathématiques, histoire, etc.).
- **Ajout et modification de flashcards** : Chaque carte contient une question et une réponse, permettant un apprentissage interactif.
- **Mode révision** : Consultation des cartes avec possibilité de vérifier les réponses pour s'entraîner efficacement.

## Technologies utilisées

Le projet repose sur les technologies suivantes :

- **Framework principal** : AdonisJS (TypeScript-first).
- **Base de données** : MySQL.
- **Gestion des dépendances** : npm.
- **Template Engine** : Edge.js pour le rendu des vues.
- **Contrôle de version** : Git et GitHub.

### Prérequis

Avant d'installer le projet, assurez-vous d'avoir les logiciels suivants installés :

- Node.js (v20.0.0 ou supérieur, version testée : v20.11.0)
- MySQL (v8.0 ou supérieur, version testée : 8.0.30)
- Git (v2.0 ou supérieur)
- npm (v10.0.0 ou supérieur, version testée : 10.2.4)

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

<!-- ## Utilisation -->

---

Avec **WOP : World Of Flashcards**, transformez l'apprentissage en une expérience interactive et engageante !

---
