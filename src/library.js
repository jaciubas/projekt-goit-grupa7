const watchedButton = document.querySelector('.btn-watched');
const queuedButton = document.querySelector('.btn-queue');

const main = document.querySelector('.library');

const watchedKey = 'watched';
const queueKey = 'queue';

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

const createLibraryMovieTemplateHTML = (image, id, title, genres, year, rating) => {
  return `<li class="movie__template">
    <img class="movie__image" id="${id}" src="${image}" alt='${title}' width="280px" height="398px"/>
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${genres}</span> | <span>${year}</span>
    <span class="movie__rating">${rating}</span></div>
  </li>`;
};

const searchPoster = movie => {
  let posterPath = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  if (posterPath === null) {
    return 'https://images.pexels.com/photos/5721902/pexels-photo-5721902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  } else {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }
};

const createLibraryMovieTemplate = async ids => {
  const moviesList = await Promise.all(
    ids.map(async id => {
      const movie = await getMovieForLibrary(id);
      const image = searchPoster(movie);
      const title = movie.title ? movie.title : movie.name;
      const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
      const year = new Date(movieDate).getFullYear();
      const rating = movie.vote_average.toFixed(1);
      const genres = movie.genres[0].name;
      console.log(genres);
      return createLibraryMovieTemplateHTML(image, id, title, genres, year, rating);
    }),
  );
  main.innerHTML = moviesList.join('');
};

const loadWatchedLibrary = key => {
  try {
    const state = localStorage.getItem(key);
    const array = JSON.parse(state);
    if (array === null) {
      return;
    } else {
      createLibraryMovieTemplate(array);
      console.log('array:', array);
    }
  } catch (error) {
    console.error(error.message);
  }
};

loadWatchedLibrary(watchedKey);

watchedButton.addEventListener('click', () => {
  loadWatchedLibrary(watchedKey);
});

queuedButton.addEventListener('click', () => {
  loadWatchedLibrary(queueKey);
});


//import './sass/main.scss';
import './JS/students-modal';
import './JS/pagination'
import './JS/modal';