'use strict';

var authorAvatar = {
  path: 'img/avatars/user0',
  extension: '.png'
};
var offer = ['palace', 'flat', 'house', 'bungalo'];
var locationX = 1;
var locationY = {
  start: 130,
  end: 630
};
var NUMBER_ADS = {
  start: 1,
  end: 8
};

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var similarAds = function (start, end) {
  var ads = [];
  for (var i = 0; i < end; i++) {
    ads[i] = {
      author: {
        avatar: authorAvatar.path + getRandomInt(start, end) + authorAvatar.extension
      },
      offer: {
        type: offer[getRandomInt(start, end)]
      },
      location: {
        x: locationX,
        y: getRandomInt(locationY.start, locationY.end)
      }
    }
  }
  return ads;
};

var map = document.querySelector('.map');
map.classList.remove('.map--faded');

var mapPins = document.querySelector('.map__pins');
var adTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderAds = function (ad) {
  var adElement = adTemplate.cloneNode(true);
  adElement.querySelector('.map__pin').style.left = ad.location.x + px;
  adElement.querySelector('.map__pin').style.top = ad.location.y + px;
  adElement.querySelector('img').src = ad.author.avatar;
  adElement.querySelector('img').alt = ad.offer.type;
  return adElement;
};

var insertAdsTemplate = function (ads) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ads.length; i++) {
    fragment.appendChild(renderAds(ads[i]));
  }
  mapPins.appendChild(fragment);
};
insertAdsTemplate(similarAds(NUMBER_ADS.start, NUMBER_ADS.end));
