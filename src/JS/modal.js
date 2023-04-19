

const url =
  'https://api.themoviedb.org/3/trending/all/week?api_key=28f50cf3f177782503c21b43af04c7bc';

const close = document.querySelector('.close_modal_window');
const modal = document.querySelector('.modal_window');
const main = document.querySelector('main');
const movieTemplate = document.querySelector('.movie__template');
const modalInner = document.querySelector('.modal_inner');


console.log(main);

close.addEventListener('click', () => {
  modal.style.display = 'none';
});

main.addEventListener('click', onShowModal);

async function onShowModal(e) {

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
    console.log(response);
    const movieInformation = await response.json();
    console.log(movieInformation);
    getMovieAndUpdateUI(movieInformation);
  } catch (error) {
    console.log(error);
  }
}

async function getMovieAndUpdateUI(movie) {
  try {
    const modalMarkup = `
      <div class="modalMarkup trailer__picture">
         <picture>
            <source srcset=${movie.desktop} media="(min-width: 1200px)">
            <source srcset=${movie.tablet} media="(min-width: 768px)">
            <source srcset=${movie.mobile} media="(min-width: 320px)">
            <img src=${movie.desktop} alt=${movie.title} class="modal__img">
            <div class="trailer__btn" data-id="${movie.id}">
            <p class="trailer__text">watch trailer</p>
            </div>
        </picture>
      </div>
      <div class="modal__content">
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
              <span class="film-values__vote film-values__vote--color">${movie.vote}</span>
              <span class="film-values__slash">/</span>
              <span class="film-values__vote film-values__votes--color">${movie.votes}</span>
            </p>
            <p class="film-values__text">
              <span class="film-value__vote">${movie.popularity.toFixed(1)}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${movie.originalTitle}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${movie.genres}</span>
            </p>
          </div>
        </div>
        <div class="modal__description">
          <p class="modal__about">About</p>
          <p class="modal__text">${movie.about}</p>
        </div>
        <div class="modal__btn-box" data-id="${movie.id}">
          <button class="modal__btn modal__btn--watched" type="button">Add to watched</button>
          <button class="modal__btn modal__btn--queue" type="button">Add to queue</button>
        </div>
      </div>`;

     modalInner.insertAdjacentHTML('beforeend', modalMarkup);
  } catch (e) {
    console.log(e);
  }
}


