# fab-ticket
Solution de ticketing et d'inventaire pour FabLab.

## Installation / Déploiement

### Pré-requis

- NodeJS
- Serveur LDAP (ex: Active Directory, OpenLDAP)
    - Support des groupes d'utilisateurs (de type `memberOf`)
    - Compte d'API (permissions: récupération des utilisateurs et groupes)
- Serveur SQL (ex: MariaDB)

### Installation

1. Modifier la configuration par défaut de l'application

Copier le fichier `config.exemple.js` et le renommer en `config.js`.
Chaque option est documentée par le commentaire situé au dessus de la valeur.

2. Lancer l'application

Exemple de script de lancement (vous pouvez utiliser l'outil déploiement de votre choix, comme `nodemon` ou `pm2`)
```bash
npm start
```
