---
layout: base
titre_seo: Confidentialité · Théo Dhaussy
description: Données traitées lors d'une visite de ce site, journaux de l'hébergeur et mesure d'audience sans cookie.
permalink: /confidentialite/
sitemap: false
---
{%- comment -%}
  Page d'information exigée par l'article 13 du RGPD. Elle décrit deux
  traitements : les journaux de GitHub Pages, sur lesquels le site n'a aucune
  prise, et la mesure d'audience Umami.

  La section Umami suit la même condition que le script dans base.html : si
  l'identifiant d'audience est vidé, le script disparaît et cette section
  aussi, pour que la page ne décrive jamais un traitement qui n'a pas lieu.

  La liste des clics suivis reprend les attributs data-umami-event posés dans
  _includes/. Ajouter un événement suivi impose de le mentionner ici.
{%- endcomment -%}
<section class="section">
<div class="contenu prose" markdown="1">

# Confidentialité

Ce site ne dépose aucun cookie et ne contient aucun formulaire. Une visite donne tout de même
lieu aux traitements décrits ci-dessous.

Responsable du traitement : {{ site.auteur.nom }}, joignable à
[{{ site.auteur.email }}](mailto:{{ site.auteur.email }}).

## Hébergement

Le site est hébergé par GitHub Pages (GitHub, Inc., 88 Colin P. Kelly Jr. Street,
San Francisco, CA 94107, États-Unis). Comme sur tout site GitHub Pages, GitHub enregistre
l'adresse IP de chaque visiteur à des fins de sécurité. Ce traitement relève de GitHub et de sa
[déclaration de confidentialité](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement) ;
l'éditeur du site n'a pas accès à ces journaux.
{% if site.audience.id and site.audience.id != "" %}
## Mesure d'audience

Le site utilise [Umami Cloud](https://umami.is/docs) (Umami Software, Inc., États-Unis), avec un
stockage des données dans la région Europe, pour mesurer quelles pages sont consultées et d'où
viennent les visites.

Sont enregistrés : la page consultée, le site de provenance, le type de navigateur, de système
et d'appareil, la langue, une localisation approximative (pays, région, ville), et certains
clics : téléchargement du CV, ouverture d'une fiche projet, filtre par technologie, liens vers
GitHub, LinkedIn, un dépôt de code ou la messagerie.

L'adresse IP sert à déduire la localisation et un identifiant de visite anonyme ; elle n'est pas
conservée. Aucun cookie ni stockage local n'est utilisé, et ces données ne permettent pas de
suivre un visiteur d'un site à l'autre.

Base légale : intérêt légitime (article 6.1.f du RGPD), mesurer la fréquentation de ce
portfolio. Durée de conservation : six mois.

Pour ne pas être compté, un bloqueur de publicités ou de traqueurs suffit : la plupart bloquent
Umami par défaut.
{% endif %}
## Vos droits

Vous disposez d'un droit d'accès, de rectification, d'effacement et d'opposition. Les
statistiques étant anonymes, les données d'une visite précise ne peuvent en général pas être
retrouvées. Toute demande peut être adressée à [{{ site.auteur.email }}](mailto:{{ site.auteur.email }}).
Vous pouvez aussi adresser une réclamation à la [CNIL](https://www.cnil.fr/fr/plaintes).

</div>
</section>
