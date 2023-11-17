console.log("Hello");

const URL = "https://api.thecatapi.com/v1";
// ===ключ в коді зберігати не можна======файл.env  якийcь треба
const API_KEY =
  'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';
function fetchBreeds() {
    return fetch(`${URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
            console.log(response);
      if (!response.ok) {
        throw new Error('404 not found');
      }
      return response.json();
        })
        .catch((err)=>console.log(err));
}
fetchBreeds();