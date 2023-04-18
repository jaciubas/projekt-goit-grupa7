const url =
  'https://api.themoviedb.org/3/trending/all/week?api_key=28f50cf3f177782503c21b43af04c7bc';

const close = document.querySelector('.close_modal_window');
const modal = document.querySelector('.modal_window');

const main = document.querySelector('main');
const movieTemplate = document.querySelector('.movie__template');

console.log(main);

const innerModal = document.querySelector('.modal_inner');
const movieTemplates = document.querySelector('.movie__templates');

close.addEventListener('click', () => {
  modal.style.display = 'none';
});

main.addEventListener('click', onShowModal);

async function onShowModal(e) {
  modal.classList.remove('is-hidden');
  const selectedMovie = e.target;
  console.log(selectedMovie);
  getMovieAndUpdateUI(selectedMovie);
}

async function getMovieAndUpdateUI(selectedMovie) {
  const movie = await createMovieFeature(selectedMovie);

  modal.classList.remove('is-hidden');
  //   const selectedMovie = e.target;
  //   console.log(selectedMovie);
}

async function getMovieAndUpdateUI() {
  try {
    const movie = await createMovieFeature();

    const { id, title, originalTitle, about, image, genres, popularity, vote, votes } =
      movie.forMarkup;
    const { desktop, tablet, mobile } = image;
    const modalMarkup = `
      <div class="modalMarkup trailer__picture">
         <picture>
            <source srcset=${desktop} media="(min-width: 1200px)">
            <source srcset=${tablet} media="(min-width: 768px)">
            <source srcset=${mobile} media="(min-width: 320px)">
            <img src=${desktop} alt=${title} class="modal__img">
            <div class="trailer__btn" data-id="${id}">
            <p class="trailer__text">watch trailer</p>
            </div>
        </picture>
      </div>
      <div class="modal__content">
        <p class="modal__title">${title}</p>
        <div class="modal__box">
          <div class="film-features">
            <p class="film-features__text">Vote / Votes</p>
            <p class="film-features__text">Popularity</p>
            <p class="film-features__text">Original Title</p>
            <p class="film-features__text">Genre</p>
          </div>
          <div class="film-values">
            <p class="film-values__text">
              <span class="film-values__vote film-values__vote--color">${vote}</span>
              <span class="film-values__slash">/</span>
              <span class="film-values__vote film-values__votes--color">${votes}</span>
            </p>
            <p class="film-values__text">
              <span class="film-value__vote">${popularity.toFixed(1)}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${originalTitle}</span>
            </p>
            <p class="film-values__text">
              <span class="film-values__vote">${genres}</span>
            </p>
          </div>
        </div>
        <div class="modal__description">
          <p class="modal__about">About</p>
          <p class="modal__text">${about}</p>
        </div>
        <div class="modal__btn-box" data-id="${id}">
          <button class="modal__btn modal__btn--watched" type="button">Add to watched</button>
          <button class="modal__btn modal__btn--queue" type="button">Add to queue</button>
        </div>
      </div>`;

    modal.insertAdjacentHTML('beforeend', modalMarkup);
  } catch (e) {
    console.log(e);
  }
}
