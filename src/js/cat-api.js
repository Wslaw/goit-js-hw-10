// console.log('Hello');

import axios from "axios";

const URL = 'https://api.thecatapi.com/v1';
// ===ключ в коді зберігати не можна======файл.env  якийcь треба
// const API_KEY =
//   'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';

  axios.defaults.headers.common['x-api-key'] =
    'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';



export function fetchBreeds() {
    // return fetch(`${URL}/breeds?api_key=${API_KEY}`)
    //     .then(response => {
    //         // console.log(response);
    //   if (!response.ok) {
    //     throw new Error('404 not found');
    //       }
    
    //   return response.json();
    //     })
  //     .catch((err)=>console.log(err));
  return axios.get(`${URL}/breeds`)
    .then(response => response.data)
    .catch(error => { throw error }
    );
}

export function fetchCatByBreed(breedId) {
  // return (
  //   fetch(`${URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
  //     .then(response => {
  //       // console.log(response);
  //       if (!response.ok) {
  //         throw new Error('404 not found');
  //       }
  //       return response.json();
  //     })
  //     // .then(resp => console.log(resp))
  //     .catch((err) => console.log(err))
  // );
  return axios
    .get(`${URL}/images/search?breed_ids=${breedId}`)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
