(function () {
  'use strict';

  var bouton = document.querySelector('.retour-haut');
  var entete = document.querySelector('.fiche-entete');
  if (!bouton || !entete || typeof IntersectionObserver !== 'function') { return; }

  new IntersectionObserver(function (entrees) {
    bouton.classList.toggle('retour-haut-masque', entrees[0].isIntersecting);
  }).observe(entete);
})();
