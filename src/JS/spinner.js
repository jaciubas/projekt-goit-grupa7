//opcje spinnera

var opts = {
  lines: 13, // The number of lines to draw
  length: 38, // The length of each line
  width: 17, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 0.5, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#ff6b01', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '50%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};

export { opts };

//pokazuje spinera

// function showLoader() {
//   let target = document.getElementById('loader');
//   let spinner = new Spinner().spin(target);
// }
// //ukrywa spineran
// function hideLoader() {
//   let target = document.getElementById('loader');
//   target.removeChild(target.firstChild);
// }
// const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
// const SEARCH_API = `https://api.themoviedb.org/3/search/movie?&api_key=${API_KEY}&page=1&query=`;
// axios
//   .get(SEARCH_API)
//   .then(function (response) {})
//   .catch(function (error) {
//     console.log('ERROR' + error);
//   })
//   .then(function () {
//     hideLoader();
//   });

// showLoader();
