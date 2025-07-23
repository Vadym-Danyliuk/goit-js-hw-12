import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(image => {
      return `
      <li>
        <a class="gallery-item" href="${image.largeImageURL}">
          <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
          <div class="info">
            <div><span>❤️</span> ${image.likes}</div>
            <div><span>👁️</span> ${image.views}</div>
            <div><span>💬</span> ${image.comments}</div>
            <div><span>💾</span> ${image.downloads}</div>
          </div>
        </a>
      </li>
    `;
    })
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
  loader.classList.add('visible');
}

export function hideLoader() {
  loader.classList.add('hidden');
  loader.classList.remove('visible');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
