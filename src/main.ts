import { store } from './store/index'; 
import { Count } from './components/count';
import { List } from './components/list';
import { Status } from './components/status';

const formElement = document.querySelector('.js-form') as HTMLFormElement;
const inputElement = document.querySelector('#new-item-field') as HTMLInputElement;

formElement.addEventListener('submit', evt => {
    evt.preventDefault();
  
    console.log("submit")
    const value = inputElement.value.trim();
  
    if (value.length) {
        store.dispatch('addItem', value);
        inputElement.value = '';
        inputElement.focus();
    }
  });

  const countInstance = new Count();
  const listInstance = new List();
  const statusInstance = new Status();
  
  countInstance.render();
  listInstance.render();
  statusInstance.render();