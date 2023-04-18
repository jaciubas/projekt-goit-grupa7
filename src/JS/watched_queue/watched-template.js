const API_KEY = '28f50cf3f177782503c21b43af04c7bc';

const url = 'https://api.themoviedb.org/3/';

//TWORZENIE SZABLONU FILMU NA STRONĘ GŁÓWNĄ
const createMainMovieTemplateHTML = (image, title, genres, year) => {
  const twoGenres = genres.slice(0, 2).join(', ');
  return `<li class="movie__template">
    <img class="movie__image" src="${image}" alt='${title}' width="280px" height="398px"/> 
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${twoGenres}</span> | <span>${year}</span></div>
  </li>`;
};


// TO DO:
// - Make an array for filtered movies
// - adding movies by clicing on several buttons
// - Use some "id" and other atributes to seperate them from others