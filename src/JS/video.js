const innerModal = document.querySelector('.modal_inner');
const modalVideo = document.querySelector('.video_modal');

//video iframe
const showVideoHTML = videoKey => {
  const iframe = `<iframe class="video_iframe"
    width="600" height="337"
    src="https://www.youtube.com/embed/${videoKey}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen>
    </iframe>`;
  modalVideo.innerHTML = iframe;
};

//Szukanie klucza video
const findVideoKey = videos => {
  const video = videos.find(v => v.type === 'Trailer');
  const videoKey = video.key;
  showVideoHTML(videoKey);
};

//FETCH video zwiastunu po id filmu
const getMovieVideos = async movieId => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=28f50cf3f177782503c21b43af04c7bc`,
    );
    const data = await response.json();
    const movieVideos = await data.results;
    findVideoKey(movieVideos);
  } catch (error) {
    console.log(error);
  }
};
// || e.target.closest('.modal__svg *')
//Otwieranie video
const openMovieVideo = e => {
  if (e.target.closest('.trailer__picture')) {
    modalVideo.classList.remove('video_modal-hidden');
    const selectedMovieId = e.target.id;
    getMovieVideos(selectedMovieId);
  } else {
    return;
  }
};

//Zamykanie video
const closeMovieVideo = e => {
  if (e.target.classList.contains('video_iframe')) {
    return;
  } else {
    modalVideo.classList.add('video_modal-hidden');
    modalVideo.innerHTML = '';
  }
};

modalVideo.addEventListener('click', closeMovieVideo);
innerModal.addEventListener('click', openMovieVideo, { passive: true });
