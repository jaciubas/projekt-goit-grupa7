const main = document.querySelector('main');

//TWORZENIE SZABLONU FILMU NA STRONĘ GŁÓWNĄ
const createMainMovieTemplateHTML = (image, title, genres, year) => {
  const twoGenres = genres.slice(0, 2).join(', ');
  return `<li class="movie__template">
    <img class="movie__image" src="${image}" alt='${title}' width="280px" height="398px"/> 
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${twoGenres}</span> | <span>${year}</span></div>
  </li>`;
};

const createMainMovieTemplate = async movies => {
  const moviesList = await Promise.all(
    movies.map(async movie => {
      const image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      const title = movie.title ? movie.title : movie.name;
      const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
      const year = new Date(movieDate).getFullYear();
      const arrayOfGenresIds = movie.genre_ids;
      const genres = await getGenresData(arrayOfGenresIds);
      return createMainMovieTemplateHTML(image, title, genres, year);
    }),
  );
  main.innerHTML = moviesList.join('');
};

//TWORZENIE SZABLONU FILMU DLA MY LIBRARY

// const createLibraryMovieTemplateHTML = (image, title, genres, year, rating) => {
//   const twoGenres = genres.slice(0, 2).join(', ');
//   return `<li class="movie__template">
//     <img class="movie__image" src="${image}" alt='${title}' width="280px" height="398px"/>
//     <h5 class="movie__title">${title}</h5>
//     <div class="movie__informations"><span>${twoGenres}</span> | <span>${year}</span>
//     <span class="movie__rating">${rating}</span></div>
//   </li>`;
// };

// const createLibraryMovieTemplate = async movies => {
//   const moviesList = await Promise.all(
//     movies.map(async movie => {
//       const image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
//       const title = movie.title ? movie.title : movie.name;
//       const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
//       const year = new Date(movieDate).getFullYear();
//       const rating = movie.vote_average.toFixed(1);
//       const arrayOfGenresIds = movie.genre_ids;
//       const genres = await getGenresData(arrayOfGenresIds);
//       return createLibraryMovieTemplateHTML(image, title, genres, year, rating);
//     }),
//   );
//   main.innerHTML = moviesList.join('');
// };

//SZUKANIE nazwy gatunku filmu po jego ID
const searchIdForName = (data, arrayOfIds) => {
  const names = data
    .filter(d => arrayOfIds.includes(d.id))
    .map(d => {
      return d.name;
    });
  return names;
};

//FETCH listy gatunków filmów (id, name)
const getGenresData = async arrayOfIds => {
  try {
    const response = await fetch(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=28f50cf3f177782503c21b43af04c7bc',
    );
    const data = await response.json();
    const genresData = await data.genres;
    if (arrayOfIds) {
      const names = searchIdForName(genresData, arrayOfIds);
      return names;
    }
  } catch (error) {
    console.log(error);
  }
};

//FETCH najpopularniejszych na dziś filmów
const url =
  'https://api.themoviedb.org/3/trending/all/day?api_key=28f50cf3f177782503c21b43af04c7bc';

const getPopularMoviesData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const popularMovies = await data.results;
    createMainMovieTemplate(popularMovies);
  } catch (error) {
    console.log(error);
  }
};

getPopularMoviesData();
