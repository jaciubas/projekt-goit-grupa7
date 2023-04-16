const url =
  'https://api.themoviedb.org/3/trending/all/week?api_key=28f50cf3f177782503c21b43af04c7bc';

const main = document.querySelector('main');

const createMovieFeatureHTML = (image, title, genres, year, rating) => {
  const twoGenres = genres.slice(0, 2).join(', ');
  return `<li class="movie__template">
    <img class="movie__image" src="${image}" alt='${title}' width="280px" height="398px"/> 
    <h5 class="movie__title">${title}</h5>
    <div class="movie__informations"><span>${twoGenres}</span> | <span>${year}</span>
    <span class="movie__rating">${rating}</span></div>
  </li>`;
};

const createMovieFeature = async movies => {
  const moviesList = await Promise.all(
    movies.map(async movie => {
      const image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
      const title = movie.title ? movie.title : movie.name;
      const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
      const year = new Date(movieDate).getFullYear();
      const rating = movie.vote_average.toFixed(1);
      const arrayOfGenresIds = movie.genre_ids;
      const genres = await getGenresData(arrayOfGenresIds);
      return createMovieFeatureHTML(image, title, genres, year, rating);
    }),
  );
  main.innerHTML = moviesList.join('');
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

const getPopularMoviesData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    const popularMovies = await data.results;
    createMovieFeature(popularMovies);
  } catch (error) {
    console.log(error);
  }
};

getPopularMoviesData();

// const createMovieFeature = async movie => {
//   const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
//   const movieYear = new Date(movieDate).getFullYear();
//   const movieRating = movie.vote_average.toFixed(1);
//   const movieImage = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
//   const arrayOfGenresIds = movie.genre_ids;

//   const arrayOfGenreNames = await getGenreNameById(arrayOfGenresIds);
//   const genreNamesList = arrayOfGenreNames.join(', ');

//   const movieFeatureHTML = `<li class="movie__feature">
//     <img class="movie__image" src="${movieImage}" alt='${
//     movie.title ? movie.title : movie.name
//   }' width="280px" height="398px"/>
//       <h5 class="movie__title">${movie.title ? movie.title : movie.name}</h5>
//       <div class="movie__informations"><span>${genreNamesList}</span> | <span>${movieYear}</span></div>
//       <div>${movieRating}</div>
//     </li>`;
//   return movieFeatureHTML;
// };

// const createMovieFeature = async movies => {
//   const moviesList = await Promise.all(
//     movies.map(async movie => {
//       const image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
//       const title = movie.title ? movie.title : movie.name;
//       const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
//       const year = new Date(movieDate).getFullYear();
//       const rating = movie.vote_average.toFixed(1);
//       const arrayOfGenresIds = movie.genre_ids;
//       const genres = await getGenresData(arrayOfGenresIds);
//       return createMovieFeatureHTML(image, title, genres, year, rating);
//     }),
//   );
//   main.innerHTML = moviesList.join('');
// };

// const createMovieList = async movies => {
//   const moviesList = await Promise.all(
//     movies.map(async movie => {
//       return await createMovieFeature(movie);
//     }),
//   );
//   main.innerHTML = moviesList.join('');
// };

// const createMovieFeature = async movie => {
//   const image = `https://image.tmdb.org/t/p/original${movie.poster_path}`;
//   const title = movie.title ? movie.title : movie.name;
//   const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
//   const year = new Date(movieDate).getFullYear();
//   const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '';
//   const arrayOfGenresIds = movie.genre_ids;
//   const genres = await getGenresData(arrayOfGenresIds);
//   return createMovieFeatureHTML(image, title, genres, year, rating);
// };
