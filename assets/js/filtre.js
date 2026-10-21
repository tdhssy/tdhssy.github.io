(function () {
  'use strict';

  var liste = document.getElementById('liste-projets');
  var liens = document.querySelectorAll('[data-tag]');
  if (!liste || liens.length === 0) { return; }

  var cartes = liste.querySelectorAll('.carte');
  var actif = null;

  var barre = document.createElement('p');
  barre.className = 'filtre-etat';
  barre.setAttribute('role', 'status');
  barre.hidden = true;
  liste.parentNode.insertBefore(barre, liste);

  function reinitialiser() {
    actif = null;
    for (var i = 0; i < cartes.length; i++) {
      cartes[i].hidden = false;
    }
    for (var j = 0; j < liens.length; j++) {
      liens[j].removeAttribute('aria-current');
    }
    barre.hidden = true;
    barre.textContent = '';
  }

  function filtrer(tag, libelle) {
    actif = tag;
    var visibles = 0;
    for (var i = 0; i < cartes.length; i++) {
      var stack = cartes[i].getAttribute('data-stack') || '';
      var correspond = stack.indexOf('|' + tag + '|') !== -1;
      cartes[i].hidden = !correspond;
      if (correspond) { visibles++; }
    }
    for (var j = 0; j < liens.length; j++) {
      if (liens[j].getAttribute('data-tag') === tag) {
        liens[j].setAttribute('aria-current', 'true');
      } else {
        liens[j].removeAttribute('aria-current');
      }
    }

    var motResultat = visibles > 1
      ? barre.getAttribute('data-resultat-pluriel')
      : barre.getAttribute('data-resultat-singulier');

    barre.hidden = false;
    barre.textContent = visibles + (motResultat ? ' ' + motResultat + ' ' : ' ') + libelle + ' · ';

    var bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'filtre-reset';
    bouton.textContent = barre.getAttribute('data-libelle-tout') || '';
    bouton.addEventListener('click', reinitialiser);
    barre.appendChild(bouton);
  }

  barre.setAttribute('data-libelle-tout', liste.getAttribute('data-libelle-tout') || '');
  barre.setAttribute('data-resultat-pluriel', liste.getAttribute('data-resultat-pluriel') || '');
  barre.setAttribute('data-resultat-singulier', liste.getAttribute('data-resultat-singulier') || '');

  function mouvementReduit() {
    return typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  for (var k = 0; k < liens.length; k++) {
    liens[k].addEventListener('click', function (e) {
      var tag = this.getAttribute('data-tag');
      e.preventDefault();
      if (actif === tag) {
        reinitialiser();
      } else {
        filtrer(tag, this.textContent.trim());
      }
      liste.scrollIntoView({ behavior: mouvementReduit() ? 'auto' : 'smooth', block: 'start' });
    });
  }
})();
