import axios from 'axios';

const API_KEY = '51422130-3e4e47cfb8dd90f1485b7732f';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page,
    per_page: 15,
  });

  const response = await axios.get(`${BASE_URL}?${params}`);
  return response.data;
}
