# Site du Ministere

Application web du Ministere, composee d'un frontend React et d'une API backend Node.js/Express connectee a MySQL.

## Architecture

- `frontend/` : interface React, navigation, authentification, pages publiques et espaces proteges par role.
- `backend/` : API Express, authentification, gestion des actualites, directions, services, utilisateurs, contacts et fichiers uploades.
- `BD/` : scripts SQL servant a creer ou restaurer les bases de donnees.
- `backend/uploads/` : fichiers envoyes par l'API, servis a l'adresse `/uploads/...`.

## Prerequis

- Node.js et npm
- MySQL Server
- Une base MySQL configuree localement

## Installation

Depuis la racine du projet :

```bash
cd backend
npm install

cd ../frontend
npm install
```

## Configuration de la base de donnees

1. Demarrer MySQL.
2. Creer la base utilisee par le backend.
3. Importer le dernier script SQL depuis `BD/last.sql`.
4. Verifier les identifiants dans `backend/server1.js`.

La base de donnees de reference est definie par le script `BD/last.sql`.

La configuration actuelle de `server1.js` utilise :

- hote : `localhost`
- utilisateur : `root`
- mot de passe : vide
- base : `mss`

Adaptez ces valeurs a votre environnement avant de demarrer l'API. Le fichier `backend/db.js` mentionne actuellement la base `mss`; gardez une seule configuration coherente avec la base effectivement importee.

## Demarrage

L'API backend ecoute sur le port `5001` :

```bash
cd backend
node server1.js
```

Le frontend demarre sur le port `3000` :

```bash
cd frontend
npm start
```

Ouvrir ensuite [http://localhost:3000](http://localhost:3000).

Par defaut, le frontend appelle l'API a l'adresse `http://localhost:5001`. Pour utiliser une autre adresse, creer `frontend/.env` :

```env
REACT_APP_API_URL=http://localhost:5001
```

Redemarrer le frontend apres toute modification du fichier `.env`.

## Acces a l'interface d'administration

Pour acceder a l'espace admin et ajouter ou gerer les donnees :

1. Ouvrir [http://localhost:3000/login](http://localhost:3000/login).
2. Saisir **Admin** dans le champ `Matricule`.
3. Saisir **Admin** dans le champ `Mot de passe`.
4. Valider la connexion pour ouvrir l'interface d'administration.

## Scripts disponibles

### Frontend

Depuis `frontend/` :

```bash
npm start       # serveur de developpement
npm test        # tests React
npm run build   # build de production
```

### Backend

Depuis `backend/` :

```bash
node server1.js # demarrage de l'API
```

Le backend ne possede pas encore de script npm de demarrage dedie.

## Fonctionnalites principales

- Consultation des actualites, archives, directions et services.
- Formulaire de contact.
- Inscription et connexion des utilisateurs.
- Espaces admin et metiers proteges par role.
- Gestion et affichage de documents et d'images.
- Compteur de visiteurs.
- Interface multilingue.

## Routes utiles

- Frontend : `/`, `/service`, `/archives`, `/contact`, `/login`, `/register`
- Backend : `/api/users1`, `/api/actu`, `/api/a_la_une`, `/api/direction`, `/api/service`, `/api/upload`

Les routes detaillees sont declarees dans `backend/routes/`.

## Depannage rapide

- **Erreur de connexion MySQL** : verifier que MySQL est demarre, que la base existe et que les identifiants de `backend/server1.js` sont corrects.
- **Le frontend ne joint pas l'API** : verifier que le backend tourne sur le port `5001` et que `REACT_APP_API_URL` est correctement defini.
- **Erreur d'upload** : verifier que le dossier `backend/uploads/` existe et que le processus Node peut y ecrire.
- **Port deja utilise** : arreter le processus occupant le port ou modifier le port dans le code et l'URL API du frontend.

## Licence

Aucune licence n'est actuellement definie dans les fichiers de configuration du projet.
