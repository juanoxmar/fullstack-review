const axios = require('axios');
// const config = require('../config.js');

const getReposByUsername = (username) => {
  const options = {
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${process.env.KEY}`
    }
  };

  return axios.get(`https://api.github.com/users/${username}/repos`, options);
}

module.exports.getReposByUsername = getReposByUsername;
