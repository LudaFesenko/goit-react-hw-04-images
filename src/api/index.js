import axios from 'axios';

const API_KEY = '32854293-fb2a2a0a3c3e1264f7d7323de';
const URL = 'https://pixabay.com/api/';
export const PER_PAGE = 12;

export async function fetchImages(searchString, page = 1) {
  const response = await axios.get(URL, {
    params: {
      page,
      key: API_KEY,
      per_page: PER_PAGE,
      q: searchString,
      image_type: 'photo',
    },
  });

  return response.data;
}
