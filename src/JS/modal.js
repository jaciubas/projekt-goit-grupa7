const url =
  'https://api.themoviedb.org/3/trending/all/week?api_key=28f50cf3f177782503c21b43af04c7bc';

const close = document.querySelector('.close_modal_window');
const modal = document.querySelector('.modal_window');

console.log(modal);

const main = document.querySelector('main');
const movieTemplate = document.querySelector('.movie__template');
const innerModal = document.querySelector('.modal_inner');

console.log(main);

async function onCloseModal() {
  modal.classList.add('is-hidden');
  innerModal.innerHTML = '';
}

main.addEventListener('click', onShowModal);
close.addEventListener('click', onCloseModal);

async function onShowModal(e) {
  e.preventDefault();
  if (!e.target.classList.contains('movie__image')) {
    return;
  } else {
    modal.classList.remove('is-hidden');
    const selectedMovieId = e.target.id;
    getMovie(selectedMovieId);
  }
}

async function getMovie(movieId) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=28f50cf3f177782503c21b43af04c7bc`,
    );
    const movieInformation = await response.json();
    console.log(movieInformation);
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
            <img src= https://image.tmdb.org/t/p/original${movie.poster_path} alt=${
      movie.title
    } id =${movie.id} class="modal__img">
        </picture>
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
        <div class="modal__btn-box" data-id="${movie.id}">
          <button class="modal__btn modal__btn--watched" type="button">Add to watched</button>
          <button class="modal__btn modal__btn--queue" type="button">Add to queue</button>
        </div>
      </div>`;

    innerModal.insertAdjacentHTML('beforeend', modalMarkup);
  } catch (e) {
    console.log(e);
  }
}

// KOD DOTYCZĄCY PODPIĘCIA WATCHED I QUEUE
import { setWatched } from './watched_queue/watched&queue';
import { setQueue } from './watched_queue/watched&queue';

const watchedBtn = document.querySelector('.modal__btn--watched');
const queueBtn = document.querySelector('.modal__btn--queue');

// watchedBtn.addEventListener('click', setWatched);
// queueBtn.addEventListener('click', setQueue);
