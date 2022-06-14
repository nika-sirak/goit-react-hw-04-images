const KEY = '13787357-0d618ee77456142b0c554f1c2';

function fetchImages(name, page) {
  return fetch(
    `https://pixabay.com/api/?q=${name}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then(response => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error('Not found images'));
  });
}

const api = {
  fetchImages,
};

export default api;
