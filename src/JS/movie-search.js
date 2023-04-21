import { createMainMovieTemplate, createMainMovieTemplateHTML } from './movie-template';

const searchMoviesForm = document.querySelector('#form');
const searchMovieInput = document.querySelector('#topSearch');
const main = document.querySelector('main');

const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?&api_key=28f50cf3f177782503c21b43af04c7bc&query=';

// const getResults = async query => {
//   const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
//   try {
//     const request = await axios.get(
//       `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`,
//     );
//     return request.data;
//   } catch (error) {
//     console.log(error);
//   }
// };
// const showMovies = movie => {
//   movie.forEach(movie => {
//     const { image, id, title, genres, year } = movie;

//     const movieElement = document.createElement('div');

//     movieElement.innerHTML = `<li class="movie__template">
//     <img class="movie__image" id="${id}" src="${image}" alt='${title}' width="280px" height="398px"/>
//     <h5 class="movie__title">${title}</h5>
//     <div class="movie__informations"><span></span> | <span>${year}</span></div>
//   </li>`;
//   });
// };

const getResults = async url => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    searchedMovies = await data.results;
    main.innerHTML = '';
    // createMainMovieTemplateHTML(searchedMovies);
  } catch (error) {
    console.log(error);
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
