import Notiflix from 'notiflix';

const modal = document.querySelector('.modal_content');

export const watchedKey = 'watched';
const queueKey = 'queue';

//LOCAL STORAGE
const saveToLocalStorage = (key, value) => {
  try {
    const valueToJson = JSON.stringify(value);
    localStorage.setItem(key, valueToJson);
  } catch (error) {
    console.error(error.message);
    Notiflix.Notify.failure('Something went wrong. Please, try again later.');
  }
};

const loadFromLocalStorage = key => {
  try {
    const serializedState = localStorage.getItem(key);
    return serializedState === null ? undefined : JSON.parse(serializedState);
  } catch (error) {
    console.error(error.message);
  }
};

export const watched = loadFromLocalStorage(watchedKey) || [];
export const queued = loadFromLocalStorage(queueKey) || [];

export const saveWatched = () => saveToLocalStorage(watchedKey, watched);
export const saveQueued = () => saveToLocalStorage(queueKey, queued);

//KLIKANIE W BUTTONY
const setWatched = id => {
  if (watched.includes(id)) {
    Notiflix.Notify.info('You allready added this movie to watched.');
    return;
  } else {
    watched.push(id);
    try {
      saveWatched();
      Notiflix.Notify.success('Succesfully added to watched.');
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('Something went wrong. Please, try again later.');
    }
  }
};

const setQueued = id => {
  if (queued.includes(id)) {
    Notiflix.Notify.info('You allready added this movie to queue.');
  } else {
    queued.push(id);
    try {
      saveQueued();
      Notiflix.Notify.success('Succesfully added to queue.');
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('Something went wrong. Please, try again later.');
    }
  }
};

const sendToLocalStorage = e => {
  const movieId = e.target.id;
  if (e.target.classList.contains('modal__btn--watched')) {
    setWatched(movieId);
  } else if (e.target.classList.contains('modal__btn--queue')) {
    setQueued(movieId);
  } else {
    return;
  }
};

const getMovieForLibrary = async id => {
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=28f50cf3f177782503c21b43af04c7bc`;
  try {
    const resp = await fetch(url);
    const data = await resp.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

modal.addEventListener('click', sendToLocalStorage);
