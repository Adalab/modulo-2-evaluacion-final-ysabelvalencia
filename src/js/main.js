'use strict';

console.log('>> Ready :)');

//query selectors, arrays vacios

const searchText = document.querySelector('.js-input-search');

const btnSearch = document.querySelector('.js-btn-search');

const showContainer = document.querySelector('.js-list-favorites');

let showList = [];

//funciones

function renderShow(oneShow) {
  let html = '';
  html += `<li class="js-each-show" id="${oneShow.show.id}">
    <img class="" src="${oneShow.show.image.original}" alt="" />
    <p class="">${oneShow.show.name}</p>
    </li>`;
  return html;
}

function getApi() {
  const inputValue = searchText.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      showList = data;
      console.log(showList);
      //   Con esto veo en consola que cuando busco game aparecen 10 objetos relacionados
      //falta mostar listado de series?
    });
}

function handleClickSearch(ev) {
  ev.preventDefault();
  getApi(showList);
  const filteredShow = showList.filter((item) =>
    item.name.toLowerCase().includes(inputValue.toLowerCase())
  );
  //aqui se crea constante que guarde lista filtrada que incluya las concidencias con el valor del input
  //falta render show list all?
}

//Eventos

btnSearch.addEventListener('click', handleClickSearch);
