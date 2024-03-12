import axios from 'axios';

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

const member = async () => {
  const response = await request('/api/v3/member');

  return response;
}

const search = {
  stories: async (query) => {
    const response = await request('/api/v3/search/stories', { page_size: 25, query });

    return response;
  }
}

export default {
  member,
  search
}
