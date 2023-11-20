import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './js/cat-api.js';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';

axios.defaults.headers.common['x-api-key'] =
  'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';
const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
};

const { selector, divCatInfo, loader, error } = refs;

selector.addEventListener('change', onSelectBreed);

const arrayBreedsId = [];

fetchBreeds()
  .then(data => {
    data.forEach(element => {
      arrayBreedsId.push({ text: element.name, value: element.id });
    });
    new SlimSelect({
      select: selector,
      placeholder: 'Select a breed',
      data: arrayBreedsId,
    });
  })
  .catch(onError);


function onSelectBreed(e) {
  // loader.style.visibility = 'visible';
  loader.classList.remove('is-hidden');
  const breedId = e.currentTarget.value;

  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];

      // const imgElement = document.createElement('img');
      // // Устанавливаем атрибуты src и alt
      // imgElement.src = url;
      // imgElement.alt = breeds[0].name;
      // // Добавляем обработчик события onload
      // imgElement.onload = function () {
      //   // Скрываем лоадер после загрузки изображения
      //   //  loader.style.visibility = 'hidden';
      //   loader.classList.add('is-hidden');
      // };
    loader.classList.add('is-hidden');

      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="500"/>
      </div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p></br>
      <p><b>Temperament:</b>${breeds[0].description}</p></div>`;
    })
    .catch(onError);
  // .finally(()=>loader.style.display = "none")
}

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!', {
    position: 'left-top',
    width: '600px',
    timeout: 2000,
    backOverlay: 'blue',
    fontSize: '20px',
  });
}
