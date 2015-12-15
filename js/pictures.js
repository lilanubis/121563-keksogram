'use strict';

var filtersTop = document.querySelector('.filters');
var container = document.querySelector('.pictures');
var template = document.querySelector('#picture-template');

var currentPage = 0;
var PAGE_SIZE = 12;

var scrollTimeout;

var filters = document.querySelector('.filters');

var picturesToRender;


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
    picturesToRender = loadedPictures;
    renderPictures(loadedPictures, 0);
  };

  xhr.onerror = function() {
    container.classList.add('pictures-failure');
  };


  xhr.timeout = 3000;
  xhr.ontimeout = function() {
    container.classList.add('pictures-failure');
  };

  filters.addEventListener('click', function(evt) {
    var clickedElement = evt.target;
    if (clickedElement.classList.contains('filters-radio')) {


      switch (clickedElement.id) {
        case 'filter-discussed':

          picturesToRender = loadedPictures.slice(0).sort(function(a, b) {
            return b.comments - a.comments;
          });

          break;

        case 'filter-popular':

          picturesToRender = loadedPictures;
          break;

        case 'filter-new':

          picturesToRender = loadedPictures.filter(function(a) {
            var date = Date.now();
            return date - Date.parse(a.date) < 7776000000;
          });
          picturesToRender = picturesToRender.sort(function(a, b) {
            return Date.parse(b.date) - Date.parse(a.date);
          });
          break;

      }
      container.innerHTML = '';
      console.log(picturesToRender);
      console.log('filters', currentPage);
      currentPage = 0;
      renderPictures(picturesToRender, 0);
    }
  });

  function renderPictures(pictures, pageNumber) {

    var fragment = document.createDocumentFragment();
    var from = pageNumber * PAGE_SIZE;
    var to = from + PAGE_SIZE;
    var pagePictures = pictures.slice(from, to);

    pagePictures.forEach(function(pictureForm) {
      var element = getElementFromTemplate(pictureForm);
      fragment.appendChild(element);
      container.appendChild(fragment);
    });
  }
  xhr.send();

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

  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
      var from = currentPage * PAGE_SIZE;

      if (from <= loadedPictures.length) {

        renderPictures(picturesToRender, ++currentPage);
      }

    }, 100);
  });
}
