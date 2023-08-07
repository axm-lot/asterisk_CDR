# Projet Asterisk CDR avec PostgreSQL Backend, Node.js Express API et Frontend React

Ce projet est une application complète qui permet de gérer et d'enregistrer les Call Detail Records (CDR) provenant du système Asterisk. L'application comprend une base de données PostgreSQL pour stocker les CDR, une API Node.js avec Express pour gérer les requêtes, et une interface utilisateur React pour visualiser et interagir avec les enregistrements CDR.

## Fonctionnalités

- Capture et stockage des enregistrements de détails d'appels (CDR) à partir d'Asterisk dans une base de données PostgreSQL.
- Exposition d'une API RESTful utilisant Node.js Express pour accéder et gérer les enregistrements CDR.
- Interface frontend interactive développée en React pour afficher et filtrer les données CDR.

## Prérequis

- [Asterisk](https://www.asterisk.org/) installé et configuré pour enregistrer les CDR.
- [PostgreSQL](https://www.postgresql.org/) installé pour stocker les enregistrements CDR.
- [Node.js](https://nodejs.org/) installé pour exécuter l'API backend.
- [React](https://reactjs.org/) installé pour exécuter le frontend.

## Installation

1. Cloner ce référentiel sur votre machine locale :

   ```bash
   git clone https://github.com/axm-lot/asterisk_CDR.git
   cd asterisk_CDR
   ```

2. Installer les modules nécessaires

```
npm install
```

3. Configurer suivant votre adresse IP correspondant

## Configuration

-Backend [PostgreSQL&&CDR](https://docs.asterisk.org/Configuration/Reporting/Call-Detail-Records-CDR/CDR-Storage-Backends/PostgreSQL-CDR-Backend/)

```;/etc/asterisk/cdr_pgsql.conf
[global]
hostname=localhost
port=5432
dbname=asterisk
password=password
user=postgres
table=cdr

```

La table cdr

```CREATE TABLE cdr (
 calldate timestamp NOT NULL ,
 clid varchar (80) NOT NULL ,
 src varchar (80) NOT NULL ,
 dst varchar (80) NOT NULL ,
 dcontext varchar (80) NOT NULL ,
 channel varchar (80) NOT NULL ,
 dstchannel varchar (80) NOT NULL ,
 lastapp varchar (80) NOT NULL ,
 lastdata varchar (80) NOT NULL ,
 duration int NOT NULL ,
 billsec int NOT NULL ,
 disposition varchar (45) NOT NULL ,
 amaflags int NOT NULL ,
 accountcode varchar (20) NOT NULL ,
 uniqueid varchar (150) NOT NULL ,
 userfield varchar (255) NOT NULL
);
```

-Asterisk
Fichier d'endpoint

```;/etc/asterisk/pjsip.conf
[general]
language=fr
allow=alaw
allow=ulow

context=context_name

[phone_name]
type=friend
secret=passwd
host=dynamic
callerid "name" <3001>

[phone_name2]
type=friend
secret=passwd
host=dynamic
callerid "other_name" <3002>
```

Fichier des plans de numérotation (dialplan)

```;/etc/asterisk/extensions.conf
[general]

[context_name]
exten => 30001,1,Answer
exten => 30001,2,Dial(PJSIP/phone_name)
exten => 30001,3,Hangup

exten => 3002,1,Answer
exten => 3002,2,Dial(PJSIP/phone_name2)
exten => 3002,3,Hangup
```

**Note:** Ce `README.md` est un exemple et doit être adapté pour correspondre à la structure et aux spécificités de votre projet.
