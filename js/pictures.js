

'use strict';


var filtersTop = document.querySelector('.filters');
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');

console.log('start');
getPictures();
filtersTop.classList.remove('hidden');
console.log('end');



function getPictures() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/pictures.json');
  container.classList.add('pictures-loading');
  xhr.onload = function(evt) {
    container.classList.remove('pictures-loading');
    var rawData = evt.target.response;
    var loadedPictures = JSON.parse(rawData);
    renderPictures(loadedPictures);
  };

  xhr.onerror = function() {
    container.classList.remove('pictures-failure');
  };

  xhr.timeout = 3000;
  xhr.ontimeout = function() {
    container.classList.remove('pictures-failure');
  };

  function renderPictures(pictures) {
    pictures.forEach(function(pictureForm) {
      var element = getElementFromTemplate(pictureForm);
      container.appendChild(element);
    });
  }
  xhr.send();
}


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
