### Crudité Site de e-commerce

## description du projet 
Ce projet a été réalisé dans un contexte scolaire, avec pour objectif de découvrir et comparer les trois principaux frameworks front-end : React JS, Angular TS, et Vue JS.
Le projet consiste en un site de e-commerce simulant un supermarché en ligne, où les utilisateurs peuvent naviguer, consulter et ajouter des produits à leur panier.
Ce site inclut un espace administrateur et un espace client pour une gestion basique des produits et des utilisateurs.

## Technologie 
- **Client** : React JS, Angular TS, Vue JS
- **Serveur** : Node JS
- **ORM** : Sequelize
- **API** : Express JS
- **BDD** : MYSQL

## Prérequis
**Avant de commencer, assurez-vous d'avoir installé** :
- [Node.js](https://nodejs.org) (version 18 ou plus)
- [MySQL](https://dev.mysql.com/downloads/mysql/)
- Un client MySQL tel que MySQL Workbench ou phpMyAdmin
- Un compte Cloudinary pour gérer le stockage des images (optionnel, mais recommandé si vous voulez tester la gestion d'images)

## Installation
### **Client**
- ### React :
  - Installer les dépendances : ```npm install```
  - Lancer le client : ```npm start```
- ### Angular :
  - Installer Angular globalement : ```npm install -g @angular/cli```
  - Installer les dépendances : ```npm install```
  - Lancer le client : ```ng serve```
- ### Vue :
  - Installer les dépendances : ```npm install```
  - Lancer le client : ```npm run serve```
### **Serveur**
- Installer les dépendances : ```npm install```
- Lancer le serveur : ```npm start```
- Instancier un fichier ```.env``` à la racine contenant les attributs suivants : 
   - APP_PORT=
   - DB_HOST=
   - DB_USER=
   - DB_PASS=
   - DB_PORT=
   - DB_NAME=
   - JWT_SECRET=
### **Base de données**
- Créer une base de données MySQL puis importer le fichier ```db.sql``` pour obtenir uniquement la structure des tables ou ```web_s2_2.sql``` pour avoir des données d'exemple.

## Utilisation
Lancer le serveur ainsi que le client de votre choix. Les trois clients sont identiques à l'exception de leur thème de couleur.

Vous pouvez accéder aux clients via les adresses suivantes après avoir lancé le serveur et le client :

- ### React : http://localhost:3000
- ### Angular : http://localhost:4200
- ### Vue : http://localhost:8080

Le projet propose deux types d'utilisateurs : administrateurs et clients. 
