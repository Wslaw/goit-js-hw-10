import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";
import {fetchBreeds} from "./js/cat-api.js"
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import {fetchCatByBreed} from "./js/cat-api.js"

axios.defaults.headers.common['x-api-key'] =
  'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.cat-info'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
}


const { selector, divCatInfo, loader, error } = refs;

const arrayBreedsId = [];
fetchBreeds().then(data => {
  data.forEach(element => {
    arrayBreedsId.push({ text: element.name, value: element.id })
  });
  new SlimSelect({
    select: selector,
    placeholder: 'Select a breed',
    data: arrayBreedsId,
  });
}).catch(onError());



selector.addEventListener('change', onSelectBreed);
function onSelectBreed(e) {
  
  const breedId = e.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="450"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b>${breeds[0].temperament}</p></div>`
    })
    .catch(onError());


}

function onError() {
  Notify.failure('Oops! Something went wrong! Try reloading the page!');
}