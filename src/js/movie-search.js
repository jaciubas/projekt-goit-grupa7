import { Spinner } from 'spin.js';
import { opts } from './spinner';
import Pagination from 'tui-pagination';
import axios from 'axios';

const searchMoviesForm = document.querySelector('form');
const main = document.querySelector('main');
const searchErrorMsg = document.querySelector('.error-msg');
const paginationTemplate = document.querySelector('#pagination');

let query;
const API_KEY = '28f50cf3f177782503c21b43af04c7bc';
const VISIBLE_PAGES = 5;

const spinner = new Spinner(opts).spin();
const loader = document.getElementById('loader');

searchErrorMsg.classList.add('is-hidden');

const searchPoster = movie => {
  let posterPath = movie.poster_path ? movie.poster_path : movie.backdrop_path;
  if (posterPath === null) {
    return 'https://images.pexels.com/photos/5721902/pexels-photo-5721902.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  } else {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
  }
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
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`,
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

const getResults = async (query, page) => {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`;
  return await axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => console.log(error));
};

function createPagination(totalItems, visiblePages) {
  const options = {
    itemsPerPage: 20,
    totalItems: totalItems,
    visiblePages: VISIBLE_PAGES,
    template: {
      page: '<a href="#" class="tui-page-btn">{{page}}</a>',
      currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
      moveButton:
        '<a href="#" class="tui-page-btn tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</a>',
      disabledMoveButton:
        '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
        '<span class="tui-ico-{{type}}">{{type}}</span>' +
        '</span>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' + '<span>⋅⋅⋅</span>' + '</a>',
    },
  };
  const pagination = new Pagination(paginationTemplate, options);

  if (visiblePages > 1) {
    paginationTemplate.classList.remove('is-hidden');
  } else {
    paginationTemplate.classList.add('is-hidden');
  }

  return pagination;
}

const showResults = movies => {
  return movies
    .map(movie => {
      let { id, genres, title, year } = movie;
      genres = getGenresData(movie.genre_ids);
      const movieDate = movie.release_date ? movie.release_date : movie.first_air_date;
      year = new Date(movieDate).getFullYear();
      poster = searchPoster(movie);
      id = movie.id;

      return `<li class="movie__template">
          <img class="movie__image" id="${id}" src="${poster}" alt='${title}' loading="lazy" width="280px" height="398px"/>
          <h5 class="movie__title">${title}</h5>
          <div class="movie__informations"><span>${genres}</span> | <span>${year}</span></div>
        </li>`;
    })
    .join('');
};

const onSearch = e => {
  e.preventDefault();
  query = e.target.search.value.trim();
  let page = 1;
  searchErrorMsg.textContent = '';
  if (!query) {
    setTimeout(() => {
      searchErrorMsg.classList.add('is-hidden');
    }, 5000);
    searchErrorMsg.classList.remove('is-hidden');
    searchErrorMsg.textContent = 'Search query is empty. Enter the correct movie name.';
    return;
  }

  getResults(query, page)
    .then(data => {
      if (!data.total_results) {
        setTimeout(() => {
          searchErrorMsg.classList.add('is-hidden');
        }, 5000);
        searchErrorMsg.classList.remove('is-hidden');
        searchErrorMsg.textContent =
          'Search result not successful. Enter the correct movie name and try again';
        return;
      }
      main.innerHTML = showResults(data.results);

      const pagination = createPagination(data.total_results, data.total_pages);

      pagination.on('beforeMove', ({ page }) => {
        main.innerHTML = '';
        getResults(query, page).then(data => {
          // showHideLoader(refs.loader);
          main.innerHTML = showResults(data.results);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    })
    .catch(error => console.log(error));
};
searchMoviesForm.addEventListener('submit', onSearch);
