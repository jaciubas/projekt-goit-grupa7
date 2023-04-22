import Notiflix from 'notiflix';

const watchedKey = 'watched';
const queueKey = 'queue';

const saveToLocalStorage = (key, value) => {
  try {
    const dataToJson = JSON.stringify(value);
    localStorage.setItem(key, dataToJson);
  } catch (error) {
    console.log(error);
  }
};

const loadFromLocalStorage = key => {
  try {
    const dataFromLocalStorage = localStorage.getItem(key);
    const JsonToData = JSON.parse(dataFromLocalStorage);
    return JsonToData;
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = () => saveToLocalStorage(watchedKey, loadWatched);
const addToQueue = () => saveToLocalStorage(queueKey, loadQueue);

const getWatched = loadFromLocalStorage(watchedKey);
const getQueue = loadFromLocalStorage(queueKey);

// const setWatched =
