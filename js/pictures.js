

'use strict';


var filtersTop = document.querySelector('.filters');
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');
var filterMap;


getPictures();
filtersTop.classList.remove('hidden');

function getPictures() {
  var loadedPictures;
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'data/pictures.json');
  container.classList.add('pictures-loading');
  xhr.onload = function(evt) {
    container.classList.remove('pictures-loading');
    var rawData = evt.target.response;
    loadedPictures = JSON.parse(rawData);
    renderPictures(loadedPictures);
  };

  xhr.onerror = function() {
    container.classList.add('pictures-failure');
  };

  xhr.timeout = 3000;
  xhr.ontimeout = function() {
    container.classList.add('pictures-failure');
  };

  function renderPictures(pictures) {
    container.innerHTML = '';
    var fragment = document.createDocumentFragment();
    pictures.forEach(function(pictureForm) {
      var element = getElementFromTemplate(pictureForm);
      fragment.appendChild(element);
      container.appendChild(fragment);
    });
  }
  xhr.send();

  filtersTop.onchange = function() {

    if (!filterMap) {
      filterMap = {
        'popular': 'filter-popular',
        'new': 'filter-new',
        'discussed': 'filter-discussed'
      };
    }

    var selectedFilter = [].filter.call(filtersTop['filter'], function(item) {
      return item.checked;
    })[0].value;

    var picturesCopy = loadedPictures.slice(0);

    switch (selectedFilter) {
      case 'discussed':
        picturesCopy = picturesCopy.sort(function(a, b) {
          return b.comments - a.comments;
        });
        break;

      case 'popular':
        renderPictures(loadedPictures);
        break;

      case 'new':
        picturesCopy = picturesCopy.filter(function(a) {
          var date = Date.now();
          return date - Date.parse(a.date) < 7776000000;
        });
        picturesCopy = picturesCopy.sort(function(a, b) {
          return Date.parse(b.date) - Date.parse(a.date);
        });
        break;
    }
    renderPictures(picturesCopy);
  };


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
}
