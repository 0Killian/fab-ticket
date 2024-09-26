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

## Environnement de développement

Un fichier `docker-compose.yml` est fourni pour tester l'application dans un environnement local. Le serveur LDAP et la base de donnée
n'ont pas de données configurées par défaut. Il est donc nécessaire de créer une arborescence de base sur le serveur LDAP afin de l'utiliser
(voir les pre-requis ci-dessus et la partie "ldap" de la configuration).
Pour faciliter la création de l'arborescence, une interface PHPLdapAdmin est disponible sur le port 8081. Les identifiants sont les suivants :
DN : cn=admin,dc=mydil-nantes,dc=fr
Mot de passe : root
