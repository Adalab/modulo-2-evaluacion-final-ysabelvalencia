'use strict';

console.log('>> Ready :)');

//query selectors, arrays vacios

const searchText = document.querySelector('.js-input-search');

const btnSearch = document.querySelector('.js-btn-search');

const showContainer = document.querySelector('.js-list-all');

const favContainer = document.querySelector('.js-list-favorites');

const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let showList = [];

let favShowList = [];

const favShowsLS = JSON.parse(localStorage.getItem('favShows'));
if (favShowsLS !== null) {
  favShowList = favShowsLS;
  renderFavShows(favShowList);
}

//funciones

function renderShow(item) {
  let html = '';
  let imageSrc = '';

  if (item.show.image && item.show.image.original) {
    imageSrc = item.show.image.original;
  } else {
    imageSrc = defaultImage;
  }

  html += `<li class="js-list-each" id="${item.show.id}">
  <img class="" src="${imageSrc}" alt="${item.show.name}" width=200 />
  <p class="">${item.show.name}</p>
  <div class="fa-solid fa-trash js-icon-trash hidden"></div>
  </li>`;
  console.log(item.show.id); //cuando busco serie y consoleo sale el id en pantalla.
  return html;
}

function renderShows(listShows) {
  showContainer.innerHTML = '';

  for (const item of listShows) {
    showContainer.innerHTML += renderShow(item);
  }
  addEventFav();
}

function renderFavShows(favoriteShow) {
  favContainer.innerHTML = '';

  for (const item of favoriteShow) {
    favContainer.innerHTML += renderShow(item);
  }
  addEventFav();
}

function handleClickFavorite(ev) {
  ev.preventDefault();

  const idShowClicked = parseInt(ev.currentTarget.id);
  console.log(idShowClicked);

  let foundShow = showList.find((item) => item.show.id === idShowClicked);

  const indexFavShow = favShowList.findIndex(
    (item) => item.show.id === idShowClicked
  );

  if (indexFavShow === -1) {
    favShowList.push(foundShow);
    ev.currentTarget.classList.add('chosen');
  } else {
    favShowList.splice(indexFavShow, 1);
    ev.currentTarget.classList.remove('chosen');
  }
  localStorage.setItem('favShows', JSON.stringify(favShowList));

  renderFavShows(favShowList);
}

function addEventFav() {
  const allShows = document.querySelectorAll('.js-list-each');
  console.log(allShows);
  for (const item of allShows) {
    item.addEventListener('click', handleClickFavorite);
  }
}

function handleClickSearch(ev) {
  const inputValue = searchText.value;
  ev.preventDefault();
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      showList = data;
      const filteredShows = showList.filter((item) =>
        item.show.name.toLowerCase().includes(inputValue.toLowerCase())
      );

      renderShows(filteredShows);
      console.log(showList);
    });
}

//Eventos

btnSearch.addEventListener('click', handleClickSearch);
