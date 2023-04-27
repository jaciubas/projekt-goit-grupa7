import Notiflix from 'notiflix';
import { watched, queued, saveWatched, saveQueued } from './watched-queue';

const close = document.querySelector('.close_modal_window');
const modal = document.querySelector('.modal_window');
const main = document.querySelector('main');
const innerModal = document.querySelector('.modal_inner');

const modalLibrary = document.querySelector('.modal_content');

function onCloseModal() {
  modal.classList.add('is-hidden');
  innerModal.innerHTML = '';
  document.body.classList.remove('stop-scrolling');
}
function onCloseModalEscKey(e) {
  if (e.code === 'Escape') {
    onCloseModal();
    modal.removeEventListener('click', onCloseModal);
    document.body.classList.remove('stop-scrolling');
  }
}

main.addEventListener('click', onShowModal);
close.addEventListener('click', onCloseModal);
document.body.addEventListener('keydown', onCloseModalEscKey);
document.body.addEventListener('click', onCloseModalClick);

async function onShowModal(e) {
  e.preventDefault();
  if (!e.target.classList.contains('movie__image')) {
    return;
  } else {
    modal.classList.remove('is-hidden');
    const selectedMovieId = e.target.id;
    getMovie(selectedMovieId);
    document.body.classList.add('stop-scrolling');
  }
}

function onCloseModalClick(e) {
  if (e.target === modal) {
    onCloseModal();
    document.body.classList.remove('stop-scrolling');
    modal.removeEventListener('click', onCloseModal);
  }
}

async function getMovie(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=28f50cf3f177782503c21b43af04c7bc`,
    );
    const movieInformation = await response.json();
    getMovieAndUpdateUI(movieInformation);
  } catch (error) {
    console.log(error);
  }
}

async function getMovieAndUpdateUI(movie) {
  try {
    const { desktop, tablet, mobile } = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    const modalMarkup = `
      <div class="modalMarkup trailer__picture">
         <picture>
            <source src= ${desktop} media="(min-width: 1200px)">
            <source src= ${tablet} media="(min-width: 768px)">
            <source src= ${mobile} media="(min-width: 320px)">
            <img src= https://image.tmdb.org/t/p/original${movie.poster_path} 
            alt=${movie.title} 
            id =${movie.id} class="modal__img">
        </picture>
        <svg xmlns="http://www.w3.org/2000/svg" 
        width="70px" height="70px" 
        class="modal__svg" 
        id=${movie.id}
        viewBox="0 0 16 16">
         <path 
         id=${movie.id} d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
         <path
         id=${
           movie.id
         } d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
        </svg>
      </div>
      <div class="modal__content-movie ">


        <p class="modal__title">${movie.title}</p>
        <div class="modal__box">
          <div class="film-features">
            <p class="film-features__text">Vote / Votes</p>
            <p class="film-features__text">Popularity</p>
            <p class="film-features__text">Original Title</p>
            <p class="film-features__text">Genre</p>
          </div>
          <div class="film-values">
            <p class="film-values__text">
              <span class="film-values__vote film-values__vote--color">${movie.vote_average}</span>
              <span class="film-values__slash">/</span>
              <span class="film-values__vote film-values__votes--color">${movie.vote_count}</span>
            </p>
            <p class="film-values__text">
              <span class="film-value__vote">${movie.popularity.toFixed(1)}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${movie.original_title}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${movie.genres[0].name}</span>
            </p>
          </div>
        </div>
        <div class="modal__description">
          <p class="modal__about">About</p>
          <p class="modal__text">${movie.overview}</p>
        </div>
        <div class="modal__btn-box">
          <button 
          class="modal__btn modal__btn--removeWatched" 
          id="${movie.id}" type="button" >Remove from watched</button>
          <button 
          class="modal__btn modal__btn--removeQueued"
          id="${movie.id}" type="button" >Remove from queue</button>

        </div>
      </div>`;

    innerModal.insertAdjacentHTML('beforeend', modalMarkup);
  } catch (e) {
    console.log(e);
  }
}

const removeFromWatched = id => {
  if (!watched.includes(id)) {
    Notiflix.Notify.info('You allready removed this movie from watched.');
  } else {
    const index = watched.indexOf(id);
    watched.splice(index, 1);
    try {
      saveWatched();
      Notiflix.Notify.success('Succesfully removed from watched.');
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('Something went wrong. Please, try again later.');
    }
  }
};

const removeFromQueue = id => {
  if (!queued.includes(id)) {
    Notiflix.Notify.info('You allready removed this movie from queued.');
  } else {
    const index = queued.indexOf(id);
    queued.splice(index, 1);
    try {
      saveQueued();
      Notiflix.Notify.success('Succesfully removed from watched.');
    } catch (error) {
      console.error(error.message);
      Notiflix.Notify.failure('Something went wrong. Please, try again later.');
    }
  }
};

const removeFromLocalStorage = e => {
  const movieId = e.target.id;
  if (e.target.classList.contains('modal__btn--removeWatched')) {
    removeFromWatched(movieId);
  } else if (e.target.classList.contains('modal__btn--removeQueued')) {
    removeFromQueue(movieId);
  } else {
    return;
  }
};

modalLibrary.addEventListener('click', removeFromLocalStorage);
