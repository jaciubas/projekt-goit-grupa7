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

  axios.get('/api/data')
  .then(function (response) {
    // handle success
  })
  .catch(function (error) {
    // handle error
  })
  .then(function () {
    // always executed
    hideLoader();
  });

showLoader();