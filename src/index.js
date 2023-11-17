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

// console.log(refs);

const { selector, divCatInfo, loader, error } = refs;

const arrayBreedsId = [];
fetchBreeds().then(data => {
  data.forEach(element => {
    arrayBreedsId.push({text:element.name, value:element.id})
    // console.log(element);
  });
  new SlimSelect({
    select: selector,
    placeholder: 'Select a breed',
    data: arrayBreedsId,
  });
});
// console.log(arrayBreedsId);


// slim.onChange = () => {
//   const selectedBreed = slim.data.getSelected();
//   console.log(`Selected breedId: ${selectedBreed}`);
// }
selector.addEventListener('change', onSelectBreed);
function onSelectBreed(e) {
  
  const breedId = e.currentTarget.value;
  fetchCatByBreed(breedId)
    .then(data => {
      const { url, breeds } = data[0];
      divCatInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width='400'/></div><div class="box"><h1>${breeds[0].name}</h1></div>`;
    })
    .catch(err => console.log(err));


}

