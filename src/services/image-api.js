import axios from 'axios';

const KEY = '13787357-0d618ee77456142b0c554f1c2';
axios.defaults.baseURL = 'https://pixabay.com/api/';

async function fetchImages(name, page) {
  const { data } = await axios.get(
    `?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  return data.hits;
}

export default fetchImages;
