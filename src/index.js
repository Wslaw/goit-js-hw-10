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
  divCatInfo: document.querySelector('.divCatInfo'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
}

// console.log(refs);

const { selector, divCatInfo, loader, error } = refs;

const arrayBreedsId = [];
fetchBreeds().then(data => {
  data.forEach(element => {
    arrayBreedsId.push({text:element.name, value:element.id})
    // console.log(element);
  });
});
// console.log(arrayBreedsId);

const slim = new SlimSelect({
  select: 'selector',
  placeholder: 'Select a breed',
  data: arrayBreedsId,
});

// slim.onChange = () => {
//   const selectedBreed = slim.data.getSelected();
//   console.log(`Selected breedId: ${selectedBreed}`);
// }
selector.addEventListener('change', onSelectBreed);
function onSelectBreed(e) {
  
  const breedId = e.currentTarget.value;
  fetchCatByBreed(breedId).then(data => {
    divCatInfo.innerHTML = `<div class="box-img">
        <img src=${URL} width='400'/></div>`
      })

}

