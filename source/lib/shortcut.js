const { SHORTCUT_TOKEN } = process.env;
const SHORTCUT_API_BASE_URL = 'https://api.app.shortcut.com';

const request = async (path, data) => {
  const headers = {
    'Content-Type': 'application/json',
    'Shortcut-Token': SHORTCUT_TOKEN
  }

  const response = await axios.get(`${SHORTCUT_API_BASE_URL}${path}`,
  {
    headers,
    data
  });

  return response;
}

const search = {
  stories: (query) => {
    const response = request('/api/v3/search/stories', { query });
    console.log(response);
    return response.data;
  }
}

export default {
  search
}
