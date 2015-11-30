'use strict';

var container = document.querySelector('.pictures');


pictures.forEach(function(pictureForm) {
  var element = getElementFromTemplate(pictureForm);
  container.appendChild(element);
});

function getElementFromTemplate(data) {
  return document.createElement('a');
  element.classList.add('picture');

  return element;
}
