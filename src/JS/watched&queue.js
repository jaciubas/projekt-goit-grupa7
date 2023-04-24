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
    const jsonToData = JSON.parse(dataFromLocalStorage);
    return jsonToData;
  } catch (error) {
    console.log(error);
  }
};

const addToWatched = () => saveToLocalStorage(watchedKey, getWatched);
const addToQueue = () => saveToLocalStorage(queueKey, getQueue);

const getWatched = loadFromLocalStorage(watchedKey) || [];
const getQueue = loadFromLocalStorage(queueKey) || [];

const setWatched = id => {
  if (getWatched.includes(id)) {
    Notiflix.Notify.info('You allready added this movie to watched.');
  }
  getWatched.push(id);
  console.log(getWatched);
  try {
    addToWatched();
    Notiflix.Notify.success('Succesfully added to watched.');
    console.log(addToWatched);
  } catch (error) {
    console.log(error);
    Notiflix.Notify.failure('Something went wrong. Please, try again later.');
  }
};

const setQueue = id => {
  if (getQueue.includes(id)) {
    Notiflix.Notify.info('You allready added this movie to queue.');
  } else {
    getQueue.push(id);
    console.log(getQueue);
    try {
      addToQueue();
      Notiflix.Notify.success('Succesfully added to queue.');
    } catch (error) {
      console.log(error);
      Notiflix.Notify.failure('Something went wrong. Please, try again later.');
    }
  }
};

const data1 = {
  watchedKey,
  queueKey,
  saveToLocalStorage,
  loadFromLocalStorage,
  addToWatched,
  addToQueue,
  getWatched,
  getQueue,
  setWatched,
  setQueue,
};

export default data1;
