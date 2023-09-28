'use strict';

console.log('>> Ready :)');

//query selectors, arrays vacios

const searchText = document.querySelector('.js-input-search');

const btnSearch = document.querySelector('.js-btn-search');

const showContainer = document.querySelector('.js-list-all');

const defaultImage =
  'https://via.placeholder.com/210x295/ffffff/666666/?text=TV';

let showList = [];

//funciones

//Esta función es la creadora de un elemento particular, en este caso una unica serie. Primero se ha creado una variable para limpiar, después una variable para el src de la imagen ya que en el API hay dos imagenes disponibles y no para de darme error bien en original o en medium. Por eso se realiza este condicional

function renderShow(oneShow) {
  let html = '';
  let imageSrc = '';

  if (oneShow.show.image && oneShow.show.image.original) {
    imageSrc = oneShow.show.image.original;
  } else if (oneShow.show.image && oneShow.show.image.medium) {
    imageSrc = oneShow.show.image.medium;
  } else {
    imageSrc = defaultImage;
  }

  html += `<li class="js-each-show" id="${oneShow.show.id}">
    <img class="" src="${imageSrc}" alt="Portada de la serie" width=300px />
    <p class="">${oneShow.show.name}</p>
    </li>`;
  return html;
}

function renderShows() {
  showContainer.innerHTML = '';
  showList.forEach((oneShow) => {
    showContainer.innerHTML += renderShow(oneShow);
  });
}

function handleClickSearch(ev) {
  const inputValue = searchText.value;
  ev.preventDefault();
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      showList = data;
      renderShows();
    });
}

//Eventos

btnSearch.addEventListener('click', handleClickSearch);
