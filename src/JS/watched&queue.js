import Notiflix from 'notiflix';

const modal = document.querySelector('.modal_content');

const watchedKey = 'watched';
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

const saveWatched = () => saveToLocalStorage(watchedKey, watched);
const saveQueued = () => saveToLocalStorage(queueKey, queued);

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

// const watchedKey = 'watched';
// const queueKey = 'queue';

// const saveToLocalStorage = (key, value) => {
//   try {
//     const dataToJson = JSON.stringify(value);
//     localStorage.setItem(key, dataToJson);
//   } catch (error) {
//     console.log(error);
//   }
// };

// const loadFromLocalStorage = key => {
//   try {
//     const dataFromLocalStorage = localStorage.getItem(key);
//     const jsonToData = JSON.parse(dataFromLocalStorage);
//     return jsonToData;
//   } catch (error) {
//     console.log(error);
//   }
// };

// const addToWatched = () => saveToLocalStorage(watchedKey, getWatched);
// const addToQueue = () => saveToLocalStorage(queueKey, getQueue);

// const getWatched = loadFromLocalStorage(watchedKey) || [];
// const getQueue = loadFromLocalStorage(queueKey) || [];

// const setWatched = id => {
//   if (getWatched.includes(id)) {
//     Notiflix.Notify.info('You allready added this movie to watched.');
//   }
//   getWatched.push(id);
//   console.log(getWatched);
//   try {
//     addToWatched();
//     Notiflix.Notify.success('Succesfully added to watched.');
//     console.log(addToWatched);
//   } catch (error) {
//     console.log(error);
//     Notiflix.Notify.failure('Something went wrong. Please, try again later.');
//   }
// };

// const setQueue = id => {
//   if (getQueue.includes(id)) {
//     Notiflix.Notify.info('You allready added this movie to queue.');
//   } else {
//     getQueue.push(id);
//     console.log(getQueue);
//     try {
//       addToQueue();
//       Notiflix.Notify.success('Succesfully added to queue.');
//     } catch (error) {
//       console.log(error);
//       Notiflix.Notify.failure('Something went wrong. Please, try again later.');
//     }
//   }
// };

// const data1 = {
//   watchedKey,
//   queueKey,
//   saveToLocalStorage,
//   loadFromLocalStorage,
//   addToWatched,
//   addToQueue,
//   getWatched,
//   getQueue,
//   setWatched,
//   setQueue,
// };

// export default data1;
