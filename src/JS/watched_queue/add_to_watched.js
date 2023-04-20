// TO DO:
// - add "addEvenetListener" for buttons
// - make function for adding movie to an Array
// - push array to localStorage and to watched / queue library
// - separate movies by "id" ????
// - get only matched elements and add them to same array and make specific new object of movies 
// - I think i need to use ".map", "querrySelector", "addEventListener", "async/await" etc....

const API_KEY = '28f50cf3f177782503c21b43af04c7bc';

const url1 = 'https://api.themoviedb.org/3/';

const dataArray = [];

//FETCH najpopularniejszych na dziś filmów
const url =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=28f50cf3f177782503c21b43af04c7bc';

const getPopularMoviesData = async () => {
  try {
    const response = await fetch(url);
      const data = await response.json();
      const popularMovies = await data.results;
      dataArray.push(popularMovies);
      return dataArray;
  } catch (error) {
    console.log(error);
  }
};







const watchedArray = [];

const addToWatchedBtn = document.querySelector(/*Dodać klasę/id buttona z modala */);

addToWatchedBtn.addEventListener("click", addToWatchedArray);

// FUNKCJA NA DODAWANIE 'MOVIE' DO ODPOWIEDNIEGO 'ARRAY'

const addToWatchedArray = () => {
    const elementId = 1 /* WZIĄĆ 'ID' FILMU KTÓRY JEST WYŚWIETLANY W MODALU */; 
    const objectMovie = dataArray.find(elementId);
    watchedArray.push(objectMovie)
    localStorage.setItem(/* nazwa obiektu */ JSON.stringify(/* nazwa obiektu */))
}

