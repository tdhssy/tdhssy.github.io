---
titre: Administration et supervision d'un homelab Linux
resume: Infrastructure Ubuntu Server conteneurisée, reverse proxy et certificats automatisés, supervision Grafana et alerting jusque sur le téléphone.
debut: "2024-05"
depots:
  - nom: Supervision des conteneurs
    url: https://github.com/tdhssy/docker-healthcheck
stack: [Ubuntu Server, Docker, Portainer, Nginx, Certbot, OpenVPN, SSH, Grafana, Prometheus, Loki, Promtail, Bash, rsync, Git]
---

## Contexte et objectif

J'ai commencé ce homelab en parallèle de mes études, pour mettre directement en application ce
que j'apprenais, et surtout pour apprendre des choses que le programme ne couvrait pas.

Il est vite devenu le seul endroit où je subis les conséquences de mes propres décisions
d'exploitation dans la durée : un service qui tombe, un certificat qui expire, une machine qui
redémarre sans que tout revienne. C'est ce qui en fait un terrain d'apprentissage différent
d'un travail pratique, où l'environnement est remis à zéro à la fin.

## Architecture

| Composant | Rôle |
|---|---|
| Ubuntu Server | Machine hôte du homelab |
| Docker et Portainer | Conteneurisation des services, inspection quotidienne |
| Nginx | Reverse proxy en frontal, terminaison TLS |
| Certbot | Renouvellement automatique des certificats |
| Prometheus | Métriques système et applicatives |
| Loki et Promtail | Collecte et indexation des journaux |
| Grafana | Tableaux de bord et alertes |
| OpenVPN | Accès distant au réseau du lab |
| SSH | Administration de la machine |
{: .tableau-machines }

## Choix techniques

**Tout migrer vers Docker, après avoir commencé à la main.** J'ai d'abord installé Nginx et
Certbot directement sur la machine, pour exposer mes applications vers l'extérieur avec Nginx
en reverse proxy. J'y ai ajouté un VPN OpenVPN afin de tester mes applications sur mon réseau
quand j'étais en déplacement, en me connectant en SSH.

C'est la maintenance qui m'a fait changer d'approche : à mesure que les services s'accumulaient,
tenir cette installation à jour devenait compliqué. J'ai donc tout migré vers Docker, en
commençant par Nginx et Certbot, puis j'ai ajouté Portainer pour gérer mes conteneurs, et enfin
d'autres services, notamment de supervision.

**Superviser pour comprendre, pas seulement pour surveiller.** L'idée de la supervision est
venue en regardant mes journaux Nginx et le volume de requêtes que je recevais. Je voulais les
analyser de façon plus visuelle, donc je les ai enrichis et remontés dans Grafana.

**Une alerte qui arrive vraiment jusqu'à moi.** J'ai ensuite testé le système d'alertes de
Grafana en me faisant avertir à chaque pic de cent requêtes par minute. La notification part sur
Discord, qui me prévient sur l'ordinateur comme sur le téléphone, avec l'adresse IP concernée,
sa localisation et son fournisseur. Une alerte que personne ne lit ne sert à rien : Discord est
le canal où je la vois réellement.

**Une sauvegarde quotidienne des configurations, versionnée.** Les fichiers de configuration de
mes services sont sauvegardés chaque nuit par une tâche planifiée : un script Bash les
synchronise en local avec `rsync`, puis les pousse dans un dépôt Git privé. Versionner plutôt
que copier change la nature de la sauvegarde : je ne récupère pas seulement le dernier état,
je vois ce qui a changé et quand.

## Difficulté rencontrée

**Un service éteint, sans la moindre erreur.** Un tableau de bord dédié à l'état de santé de mes
conteneurs m'a permis de résoudre une panne qui n'apparaissait nulle part dans les journaux : un
service était simplement arrêté, sans message d'erreur.

En croisant les informations, j'ai pu faire le lien avec un facteur extérieur qui avait provoqué
l'extinction de la machine. Les conteneurs ne s'étaient pas rallumés au redémarrage du homelab,
à cause d'un oubli dans leur configuration, que j'ai corrigé.

Ce que j'en retiens : l'absence d'erreur n'est pas une preuve de bon fonctionnement. Sans la vue
d'ensemble de l'état des conteneurs, je n'aurais eu aucun signal, seulement un service
silencieusement absent.

<img src="img/sante-des-conteneurs.jpg"
     alt="Tableau de bord Grafana de l'état des conteneurs du homelab. Une rangée d'indicateurs montre les douze services au statut Up, et un panneau de disponibilité dans le temps fait apparaître en rouge les périodes d'indisponibilité des conteneurs alloy, certbot et tempo."
     width="1600" height="614" loading="lazy">

**Ce que les journaux Nginx montrent vraiment.** En analysant les requêtes, le constat a été
immédiat : beaucoup de robots scannent le serveur, et sur des points d'entrée très variés. Le
tableau de bord fait ressortir des tentatives répétées sur des chemins caractéristiques comme
`/.git/config`, `/.env` et toutes ses variantes, ou `/owa/`, avec des agents utilisateurs
d'outils de scan automatisés.

Sur une journée type, cela représente environ 2 800 requêtes, avec un pic à plus de 550 requêtes
par minute, dont près de la moitié en 404 et un cinquième bloquées par la limitation de débit.
Le trafic se répartit sur une poignée de pays et de fournisseurs d'accès, ce que la carte et les
répartitions du tableau de bord rendent lisibles d'un coup d'œil.

<img src="img/tableau-de-bord-nginx.jpg"
     alt="Tableau de bord Grafana d'analyse des journaux Nginx sur vingt-quatre heures : volume total de requêtes, pic par minute, octets envoyés, classement des adresses IP, points d'entrée les plus sollicités, tentatives d'intrusion, blocages par limitation de débit, répartition des statuts HTTP et des agents utilisateurs, fournisseurs réseau, pays d'origine et carte de chaleur mondiale."
     width="1600" height="3357" loading="lazy">

## Bilan

- Infrastructure conteneurisée : retour arrière possible sur chaque service, dépendances isolées.
- Certificats TLS renouvelés automatiquement, plus aucune expiration subie.
- Journaux centralisés et interrogeables, enrichis pour être analysables et non seulement lisibles.
- Alerte fonctionnelle de bout en bout, jusqu'à la notification sur le téléphone.
- Une panne réelle diagnostiquée grâce à la supervision, et sa cause corrigée.
- Configurations sauvegardées et versionnées chaque nuit.

Cette pile de supervision ne sert plus seulement au homelab : je l'ai réutilisée telle quelle
sur mes autres projets, mon agent IA et mon lab Windows/Linux, qui remontent leurs métriques
vers ce même Grafana.

**La suite.** Reprendre le VPN au propre, cette fois avec WireGuard. Monter un serveur DNS pour
filtrer certains sites. Continuer à construire des tableaux de bord pour élargir ce que je peux
surveiller et analyser. Et, pour aller plus loin sur les scans que j'observe, monter un pot de
miel afin d'observer une tentative d'attaque réelle et comprendre comment s'en prémunir.
