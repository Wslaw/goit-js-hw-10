import { Notify } from 'notiflix/build/notiflix-notify-aio';
import axios from "axios";





axios.defaults.headers.common['x-api-key'] =
  'live_wmYNT4c87b7lQ9XjUOOUpcXUeEHCw4gcRGHUbeZrxjFiNG5WNlXbDIQxPfZH9ACK';

const refs = {
  selector: document.querySelector('.breed-select'),
  divCatInfo: document.querySelector('.divCatInfo'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
}

console.log(refs);

const { selector, divCatInfo, loader, error } = refs;
