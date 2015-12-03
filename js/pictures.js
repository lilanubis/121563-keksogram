
/*global pictures*/
'use strict';


var filtersTop = document.querySelector('.filters');
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');


pictures.forEach(function(pictureForm) {
  var element = getElementFromTemplate(pictureForm);
  container.appendChild(element);
});

filtersTop.classList.remove('hidden');

function getElementFromTemplate(data) {

  var element = template.content.children[0].cloneNode(true);
  element.querySelector('.picture-comments').textContent = data.comments;
  element.querySelector('.picture-likes').textContent = data.likes;

  var imgPic = element.querySelector('img');

  var backgroundImage = new Image();
  backgroundImage.onload = function() {
    element.style.backgroundImage = 'url(\'' + backgroundImage.src + '\')';
    element.replaceChild(backgroundImage, imgPic);
  };

  backgroundImage.onerror = function() {
    element.classList.add('picture-load-failure');
  };
  backgroundImage.src = data.url;
  return element;
}
