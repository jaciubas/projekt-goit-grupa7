import Spinner from 'spinner';
//pokazuje spinera
function showLoader() {
    let target = document.getElementById('loader');
    let spinner = new Spinner().spin(target);
  }
  //ukrywa spineran
function hideLoader() {
    let target = document.getElementById('loader');
    target.removeChild(target.firstChild);
  }
  const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&page=1&query=`;
  axios.get(SEARCH_API)
  .then(function (response) {
    
  })
  .catch(function (error) {
     console.log("ERROR" + error)
  })
  .then(function () {
    
    
    hideLoader();
  });

showLoader();