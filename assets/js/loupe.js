(function () {
  'use strict';

  if (typeof HTMLDialogElement !== 'function') { return; }

  var prose = document.querySelector('.prose');
  var images = prose ? prose.querySelectorAll('img') : [];
  if (images.length === 0) { return; }

  var dialogue = document.createElement('dialog');
  dialogue.className = 'loupe';

  var image = document.createElement('img');
  dialogue.appendChild(image);

  var bouton = document.createElement('button');
  bouton.type = 'button';
  bouton.className = 'loupe-fermer';
  bouton.setAttribute('aria-label', prose.getAttribute('data-loupe-fermer') || '');
  bouton.textContent = '×';
  dialogue.appendChild(bouton);

  document.body.appendChild(dialogue);

  function fermer() {
    dialogue.close();
  }

  bouton.addEventListener('click', fermer);
  dialogue.addEventListener('click', function (e) {
    if (e.target === dialogue) { fermer(); }
  });

  for (var i = 0; i < images.length; i++) {
    images[i].classList.add('zoomable');
    images[i].addEventListener('click', function () {
      image.src = this.src;
      image.alt = this.alt;
      dialogue.showModal();
    });
  }
})();
