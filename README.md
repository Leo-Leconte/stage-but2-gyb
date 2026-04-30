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
| Membre du groupe | Tâches réalisées                                                                                                                                                                                                                                                                                                                                                                                     | Tickets (Issues)      |
|:-----------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------|
| **Léo**          | Initialisation du projet avec git et trello, recherche de technologies, modélisation de la base de données (MCD/MLD), page de login responsive, refonte de la DB avec nestJS, amélioration du style de la page de redirection qui sera plus tard celle des stages , ajout de test pour le front , ajout d'un menu hamburger , ajout du logout avec sa pop up                                         | #1 #5 #2 #4 # 31 # 34 |               
| **Nessim**       | Initialisation du projet avec git et trello, recherche de technologies, création de l'API Rest, refonte de la DB avec nestJS, Ajout du JWT en nest pour que seule le collaborateur puisse se connecter , ajout du style css pour le login , ajout de test d'intégration bruno pour l'api rest, ajout de nouvelle fonctionnalite pour le back (comme la verification du token et le logout cote back) | #1 #5 #6 #12 # 3O     |     

### Jalon 2
| Membre du groupe | Tâches réalisées                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Tickets (Issues)                |
|:-----------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------------|
| **Léo**          | Mise en place du crud back pour stagiaire et statut pour que se soit automatique , mise en place du read tuteur pour que on est son id , mise en place du crud front delete et voir en detail , creation de la fiche detail (voir toutes les informations liee au stage donc stagiaire tuteur et la remuneration + voir ces documents) , ajout de test integration pour verifier que le crud est ok pour stagiaire et que le statut est automatique , reorganisation de la page home et ajoute d'un boutton pour la route create,pour les documents mise en place dans le back et front      | #51,#52,#53,#66,#80,#81,#83     |               
| **Nessim**       | Mise en place du crud back pour le stage et la remuneration , ajout de donnes dans la bd pour des testes, mise en place du crud create et update cote front avec toutes les conditions pour eviter les erreurs , creation du useguard cote back pour que seule un collaborateur puisse faire les actions du voir , supprimer , modifier et cree un stage  , ajout de test integration pour verifier que le crud marche bien cote stage et remuneration , fix de la responsive pour les telephone et tablette et correction pour que toute les lettres s'affiche comme le ç et fix des routes | #45,#46,#47,#60,#69,#73,#79,#85 |     
