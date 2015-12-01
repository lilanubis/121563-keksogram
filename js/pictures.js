'use strict';

var filtersTop = document.querySelector('.filters');
var container = document.querySelector('.pictures');


pictures.forEach(function(pictureForm) {
  var element = getElementFromTemplate(pictureForm);
  container.appendChild(element);
});

function getElementFromTemplate(data) {
  var template = document.querySelector('#picture-template');
  //console.log(template);
  if ('content' in template) {
    var element = template.content.children[0].cloneNode(true);
  } else {
    var element = template.content.children[0].cloneNode(true);
  }

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
  filtersTop.classList.remove('hidden');
  backgroundImage.src = data.url;

  return element;
}
