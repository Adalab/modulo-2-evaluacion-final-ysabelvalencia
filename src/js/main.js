'use strict';

console.log('>> Ready :)');

//query selectors, arrays vacios

const searchText = document.querySelector('.js-input-search');

const btnSearch = document.querySelector('.js-btn-search');

const showContainer = document.querySelector('.js-list-favorites');

let showList = [];

function renderShow(oneShow) {
  let html = '';
  html += ``;
}

//funciones manejadoras
function handleClickSearch(ev) {
  ev.preventDefault();
  getApi();
}

function getApi() {
  const inputValue = searchText.value;
  fetch(`//api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showList = data.show;
    });
}

//Eventos

btnSearch.addEventListener('click', handleClickSearch);
