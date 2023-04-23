import { Spinner } from 'spin.js';
import { npopts } from './spinner';

const searchMoviesForm = document.querySelector('#form');
const searchMovieInput = document.querySelector('#topSearch');
const main = document.querySelector('main');
const searchErrorMsg = document.querySelector('.error-msg');

const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&page=1&query=`;

searchErrorMsg.classList.add('is-hidden');

const getResults = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    showResults(data.results);
    getGenresData(data.genres);
    if (data.results.length === 0) {
      searchErrorMsg.classList.remove('is-hidden');
      main.innerHTML = '';
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
const showResults = movies => {
  main.innerHTML = '';
  movies.forEach(async movie => {
    let { id, title, genres, year } = movie;
    const IMAGE_PATH = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
    const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
    year = new Date(movieDate).getFullYear();
    genres = await getGenresData(movie.genre_ids);
    id = movie.id;

    const movieElement = document.createElement('div');

    movieElement.innerHTML = `<li class="movie__template">
    <img class="movie__image" id="${id}" src="${IMAGE_PATH}" alt='${title}' width="280px" height="398px"/> 
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${genres}</span> | <span>${year}</span></div>
  </li>`;
    main.appendChild(movieElement);
  });
};

const searchIdForName = (data, arrayOfIds) => {
  const names = data
    .filter(d => arrayOfIds.includes(d.id))
    .map(d => {
      return d.name;
    });
  return names;
};

const getGenresData = async arrayOfIds => {
  try {
    loader.appendChild(spinner.el);
    const GENRES_PATH = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
    const response = await fetch(GENRES_PATH);
    const data = await response.json();
    const genresData = await data.genres;
    if (arrayOfIds) {
      const names = searchIdForName(genresData, arrayOfIds);
      return names;
    }
  } catch (error) {
    console.log(error);
  } finally {
    spinner.stop();
  }
};

searchMoviesForm.addEventListener('submit', e => {
  e.preventDefault();
  const query = searchMovieInput.value;
  if (query) {
    getResults(SEARCH_API + query);
    searchMovieInput.value = '';
  }
});

