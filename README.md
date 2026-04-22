# stage-but2-gyb

Bienvenue sur le projet **stage-but2-gyb** !

Nous réalisons une application web accessible a tous les collaborateurs, permettant de visualiser qui est en
stage (ou apprentissage), quand, dans quel service, et de centraliser les documents lies a chaque stage (ou contrat d'apprentissage).



1. [Initialisation du Projet](#-initialisation-du-projet)
2. [Suivi du travail](#-suivi-du-travail)
---
## Initialisation du Projet
- `cd front`
- `npm create vite@latest front -- --template react-ts`
- `npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom`
- `npm install -D @testing-library/user-event`
- `cd ../back-end`
- `npm init -y`
- `npm install`
- `npm install react-router@6 react-router-dom@6`
- `cd ..`
- `npm install --save-dev @testing-library/react @testing-library/dom @types/react @types/react-dom` (pour les tests react)
---
## Suivi du travail

### Jalon 1
| Membre du groupe | Tâches réalisées                                                                                                                                                                                                                                                                                                                                                                                     | Tickets (Issues) |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-----------------|
| **Léo**          | Initialisation du projet avec git et trello, recherche de technologies, modélisation de la base de données (MCD/MLD), page de login responsive, refonte de la DB avec nestJS, amélioration du style de la page de redirection qui sera plus tard celle des stages , ajout de test pour le front , ajout d'un menu burger , ajout du logout avec sa pop up                                            | #1 #5 #2 #4 # 31 # 34     |               
| **Nessim**       | Initialisation du projet avec git et trello, recherche de technologies, création de l'API Rest, refonte de la DB avec nestJS, Ajout du JWT en nest pour que seule le collaborateur puisse se connecter , ajout du style css pour le login , ajout de test d'intégration bruno pour l'api rest, ajout de nouvelle fonctionnalite pour le back (comme la verification du token et le logout cote back) | #1 #5 #6 #12 # 3O    |     
