const axios = require('axios');
// const config = require('../config.js');

const getReposByUsername = (username) => {
  const options = {
    headers: {
      'User-Agent': 'request',
      //'Authorization': `token ${config.TOKEN}`
      'Authorization': `token ${process.env.TOKEN}`
    }
  };

  return axios.get(`https://api.github.com/users/${username}/repos`, options);
}

module.exports.getReposByUsername = getReposByUsername;
