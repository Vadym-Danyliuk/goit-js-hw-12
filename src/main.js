import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let currentQuery = '';
let currentPage = 1;
let totalHits = 0;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements.searchQuery.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Будь ласка, введіть пошуковий запит!',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  hideLoadMoreButton();

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message:
          'Вибачте, але за вашим запитом зображень не знайдено. Спробуйте інший запит!',
        position: 'topRight',
      });
      return;
    }

    iziToast.success({
      message: `Ура! Ми знайшли ${totalHits} зображень.`,
      position: 'topRight',
    });

    createGallery(data.hits);

    if (totalHits > 15) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Щось пішло не так. Спробуйте ще раз пізніше.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);
    createGallery(data.hits);

    scrollGallery();

    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage >= totalPages) {
      hideLoadMoreButton();
      iziToast.info({
        message: 'Вибачте, але ви досягли кінця результатів пошуку.',
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Не вдалося завантажити більше зображень. Спробуйте ще раз.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function scrollGallery() {
  const galleryItem = document.querySelector('.gallery li');
  if (galleryItem) {
    const { height: cardHeight } = galleryItem.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
}

hideLoadMoreButton();
hideLoader();
