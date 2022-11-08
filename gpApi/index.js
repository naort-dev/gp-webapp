const apiBase = process.env.API_BASE || 'http://localhost:1337';
const base = `${apiBase}/api/v1/`;

export const gpApi = {
  homepage: {
    followers: {
      url: `${base}listening/followers-count`,
      method: 'GET',
    },
  },
};
