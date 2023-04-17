const API_KEY = '28f50cf3f177782503c21b43af04c7bc';

const url = 'https://api.themoviedb.org/3/';

const createMovieFeatureHTML = (image, title, genres, year, rating) => {
  const twoGenres = genres.slice(0, 2).join(', ');
  return `<li class="movie__template">
    <img class="movie__image" src="${image}" alt='${title}' width="280px" height="398px"/> 
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${twoGenres}</span> | <span>${year}</span>
    <span class="movie__rating">${rating}</span></div>
  </li>`;
};