import axios from 'axios';

const CATCH_ERROR_TEXT = 'API not available';

export async function getHtmlByUrl(url: string) {
  const response = await axios
    .get(url)
    .then((res) => res.data)
    .catch(() => CATCH_ERROR_TEXT);

  return response;
}
