import axios from 'axios';

const url =
  'https://api.themoviedb.org/3/trending/all/day?api_key=28f50cf3f177782503c21b43af04c7bc';

const searchMovieInput = document.querySelector('#topSearch');
const { search } = searchMovieInput;

const getResults = async (name, page = 1) => {
  const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
  try {
    const request = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${name}&page=${page}`,
    );
    return request.data;
  } catch (error) {
    console.log(error);
  }
};

searchMovieInput.addEventListener('submit', async e => {
  e.preventDefault();
  page = 1;
  input = search.value;
  const data = await getResults(input);
  main.innerHTML = '';
  if (data.results.length === 0) {
    console.log('No movies found');
    return;
  }
  data.results.forEach(movie => {
    main.insertAdjacentHTML('beforeend', createMainMovieTemplate(movie));
  });
});
