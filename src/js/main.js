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

function renderShow(item, isFavContainer) {
  let html = '';
  let imageSrc = '';

  if (item.show.image && item.show.image.original) {
    imageSrc = item.show.image.original;
  } else if (item.show.image && item.show.image.medium) {
    imageSrc = item.show.image.medium;
  } else {
    imageSrc = defaultImage;
  }

  const hiddenClass = isFavContainer ? '' : 'hidden';
  const titleClass = isFavContainer ? 'p-fav' : 'p-all';

  html += `<li class="li-fav js-list-each" id="${item.show.id}">
  <img class="img-fav" src="${imageSrc}" alt="${item.show.name}" width=200 />
  <div class="div-fav"><p class="${titleClass}">${item.show.name}</p>
  <i class="fa-solid fa-trash js-icon-trash ${hiddenClass}"></i></div>
  </li>`;
  console.log(item.show.id); //cuando busco serie y consoleo sale el id en pantalla.
  return html;
}

function renderShows(listShows) {
  showContainer.innerHTML = '';

  for (const item of listShows) {
    const showHtml = renderShow(item, false);
    showContainer.innerHTML += showHtml;
  }
  addEventFav();
}

function renderFavShows(favoriteShow) {
  favContainer.innerHTML = '';

  for (const item of favoriteShow) {
    const favHtml = renderShow(item, true);
    favContainer.innerHTML += favHtml;
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
